import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { NextResponse } from "next/server";

type LeadPayload = {
  name?: string;
  email?: string;
  mobile?: string;
  service?: string;
  consent?: boolean;
};

type StoredLead = {
  name: string;
  email: string;
  mobile: string;
  service: string;
  consent: boolean;
  submittedAt: string;
};

type ExistingLeadRecord = {
  email?: string | null;
  mobile?: string | null;
};

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseLeadsTable = process.env.SUPABASE_LEADS_TABLE ?? "leads";
const leadEncryptionKey = process.env.LEAD_AES_KEY;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeMobile(mobile: string) {
  return mobile.replace(/[\s()-]/g, "");
}

function isValidUkMobile(mobile: string) {
  const normalizedMobile = normalizeMobile(mobile);
  return /^(?:\+44|44|0)7\d{9}$/.test(normalizedMobile);
}

function getEncryptionKey() {
  if (!leadEncryptionKey) {
    throw new Error(
      "AES encryption is not configured. Add LEAD_AES_KEY to .env.local."
    );
  }

  const normalizedKey = leadEncryptionKey.trim();
  const isHexKey = /^[0-9a-fA-F]{64}$/.test(normalizedKey);
  const keyBuffer = isHexKey
    ? Buffer.from(normalizedKey, "hex")
    : Buffer.from(normalizedKey, "base64");

  if (keyBuffer.length !== 32) {
    throw new Error(
      "LEAD_AES_KEY must be a 32-byte key in hex or base64 format."
    );
  }

  return keyBuffer;
}

function encryptValue(value: string) {
  const key = getEncryptionKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

function decryptValue(value: string) {
  const key = getEncryptionKey();
  const payload = Buffer.from(value, "base64");
  const iv = payload.subarray(0, 12);
  const authTag = payload.subarray(12, 28);
  const encrypted = payload.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);

  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString("utf8");
}

async function findDuplicateLead(email: string, mobile: string) {
  if (!supabaseUrl) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_URL to .env.local."
    );
  }

  if (!supabaseServiceRoleKey) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local."
    );
  }

  const response = await fetch(
    `${supabaseUrl}/rest/v1/${supabaseLeadsTable}?select=email,mobile`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseServiceRoleKey,
        Authorization: `Bearer ${supabaseServiceRoleKey}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || "Unable to verify existing lead submissions."
    );
  }

  const existingLeads = (await response.json()) as ExistingLeadRecord[];
  const normalizedEmail = email.toLowerCase();
  const normalizedMobile = normalizeMobile(mobile);

  for (const lead of existingLeads) {
    try {
      const decryptedEmail = lead.email ? decryptValue(lead.email) : "";
      const decryptedMobile = lead.mobile ? decryptValue(lead.mobile) : "";

      if (decryptedEmail.toLowerCase() === normalizedEmail) {
        return "email";
      }

      if (normalizeMobile(decryptedMobile) === normalizedMobile) {
        return "mobile";
      }
    } catch {
      continue;
    }
  }

  return null;
}

async function saveLeadToSupabase(lead: StoredLead) {
  if (!supabaseUrl) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_URL to .env.local."
    );
  }

  if (!supabaseServiceRoleKey) {
    throw new Error(
      "Supabase is not configured. Add SUPABASE_SERVICE_ROLE_KEY to .env.local."
    );
  }

  if (
    supabaseServiceRoleKey.startsWith("sb_publishable_") ||
    supabaseServiceRoleKey.startsWith("sb_anon_")
  ) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is using a public key. Use the Supabase service_role key instead."
    );
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/${supabaseLeadsTable}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseServiceRoleKey,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: encryptValue(lead.name),
      email: encryptValue(lead.email),
      mobile: encryptValue(lead.mobile),
      service: encryptValue(lead.service),
      consent: lead.consent,
      submitted_at: lead.submittedAt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || "Supabase rejected the lead submission request."
    );
  }

  return true;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload;

    const name = payload.name?.trim() ?? "";
    const email = payload.email?.trim().toLowerCase() ?? "";
    const mobile = payload.mobile?.trim() ?? "";
    const service = payload.service?.trim() ?? "";
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
