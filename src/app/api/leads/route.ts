import { NextResponse } from "next/server";
import {
  type LeadPayload,
  type StoredLead,
  findDuplicateLead,
  isValidEmail,
  isValidUkMobile,
  saveLeadToSupabase,
} from "@/lib/leads";

function toTitleCase(value: string) {
  return value
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase()
    .replace(/(^|[\s-/])([a-z])/g, (_, prefix: string, char: string) => {
      return `${prefix}${char.toUpperCase()}`;
    });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;

    const name = payload.name ? toTitleCase(payload.name) : "";
    const companyName = payload.companyName
      ? toTitleCase(payload.companyName)
      : "Individual";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const mobile = payload.mobile?.trim() ?? "";
    const service = payload.service ? toTitleCase(payload.service) : "";
    const consent = payload.consent === true;

    if (!name || !email || !mobile || !service) {
      return NextResponse.json(
        {
          message:
            "Name, email, mobile number, and required service are required.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!isValidUkMobile(mobile)) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid UK mobile number starting with 07 or +44 7.",
        },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { message: "Consent is required before submission." },
        { status: 400 }
      );
    }

    const duplicateLeadField = await findDuplicateLead(email, mobile);

    if (duplicateLeadField === "email") {
      return NextResponse.json(
        {
          message:
            "A user already exists with this email. Please sign up with another email.",
        },
        { status: 409 }
      );
    }

    if (duplicateLeadField === "mobile") {
      return NextResponse.json(
        {
          message:
            "A user already exists with this mobile number. Please sign up with another mobile number.",
        },
        { status: 409 }
      );
    }

    const nextLead: StoredLead = {
      name,
      companyName,
      email,
      mobile,
      service,
      consent,
      submittedAt: new Date().toISOString(),
    };

    await saveLeadToSupabase(nextLead);

    return NextResponse.json(
      { message: "Lead captured successfully in Supabase." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to capture the lead at the moment.",
      },
      { status: 500 }
    );
  }
}
