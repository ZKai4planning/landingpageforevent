import { NextResponse } from "next/server";
import {
  fetchDecryptedLeadsPage,
  validateLeadsViewerPassword,
} from "@/lib/leads";

type ViewLeadsPayload = {
  password?: string;
  page?: number;
  pageSize?: number;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as ViewLeadsPayload;
    const password = payload.password?.trim() ?? "";
    const page = typeof payload.page === "number" ? payload.page : 1;
    const pageSize = typeof payload.pageSize === "number" ? payload.pageSize : 10;

    if (!password) {
      return NextResponse.json(
        { message: "Password is required to view signup users." },
        { status: 400 }
      );
    }

    if (!validateLeadsViewerPassword(password)) {
      return NextResponse.json(
        { message: "Incorrect password. Please try again." },
        { status: 401 }
      );
    }

    const result = await fetchDecryptedLeadsPage({ page, pageSize });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unable to fetch signup users right now.",
      },
      { status: 500 }
    );
  }
}
