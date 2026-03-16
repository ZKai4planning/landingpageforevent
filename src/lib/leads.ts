import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

export type LeadPayload = {
  name?: string;
  email?: string;
  mobile?: string;
  service?: string;
  consent?: boolean;
};

export type StoredLead = {
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

type SupabaseLeadRecord = {
  id?: number | string | null;
  name?: string | null;
  email?: string | null;
  mobile?: string | null;
  service?: string | null;
  consent?: boolean | null;
  submitted_at?: string | null;
};

export type DecryptedLeadRecord = {
  id: number | string | null;
  name: string;
  email: string;
  mobile: string;
  service: string;
  consent: boolean;
  submittedAt: string;
};

export type PaginatedLeadsResult = {
  leads: DecryptedLeadRecord[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

const supabaseUrl =
  process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseLeadsTable = process.env.SUPABASE_LEADS_TABLE ?? "leads";
const leadEncryptionKey = process.env.LEAD_AES_KEY;
const leadsViewPassword = process.env.LEADS_VIEW_PASSWORD;

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function normalizeMobile(mobile: string) {
  return mobile.replace(/[\s()-]/g, "");
}

export function isValidUkMobile(mobile: string) {
  const normalizedMobile = normalizeMobile(mobile);
  return /^(?:\+44|44|0)7\d{9}$/.test(normalizedMobile);
}

function assertSupabaseConfig() {
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

export function encryptValue(value: string) {
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

export function decryptValue(value: string) {
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

async function fetchFromSupabase<T>(path: string, init?: RequestInit) {
  assertSupabaseConfig();

  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      apikey: supabaseServiceRoleKey as string,
      Authorization: `Bearer ${supabaseServiceRoleKey}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Supabase request failed.");
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}

export async function findDuplicateLead(email: string, mobile: string) {
  const existingLeads = await fetchFromSupabase<ExistingLeadRecord[]>(
    `${supabaseLeadsTable}?select=email,mobile`
  );
  const normalizedEmail = email.toLowerCase();
  const normalizedMobile = normalizeMobile(mobile);

  for (const lead of existingLeads ?? []) {
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

export async function saveLeadToSupabase(lead: StoredLead) {
  await fetchFromSupabase<null>(supabaseLeadsTable, {
    method: "POST",
    headers: {
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

  return true;
}

export async function fetchDecryptedLeads() {
  const paginatedResult = await fetchDecryptedLeadsPage({
    page: 1,
    pageSize: 1000,
  });

  return paginatedResult.leads;
}

export async function fetchDecryptedLeadsPage({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}): Promise<PaginatedLeadsResult> {
  assertSupabaseConfig();

  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0
      ? Math.min(Math.floor(pageSize), 100)
      : 10;
  const fetchPage = async (pageNumber: number) => {
    const rangeStart = (pageNumber - 1) * safePageSize;
    const rangeEnd = rangeStart + safePageSize - 1;
    const response = await fetch(
      `${supabaseUrl}/rest/v1/${supabaseLeadsTable}?select=id,name,email,mobile,service,consent,submitted_at&order=submitted_at.desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseServiceRoleKey as string,
          Authorization: `Bearer ${supabaseServiceRoleKey}`,
          Prefer: "count=exact",
          Range: `${rangeStart}-${rangeEnd}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Supabase request failed.");
    }

    const contentRange = response.headers.get("content-range");
    const totalCount = contentRange
      ? Number(contentRange.split("/")[1] ?? 0) || 0
      : 0;

    return {
      totalCount,
      rows: (await response.json()) as SupabaseLeadRecord[],
    };
  };

  let result = await fetchPage(safePage);
  const totalPages = Math.max(1, Math.ceil(result.totalCount / safePageSize));
  const currentPage =
    result.totalCount > 0 ? Math.min(safePage, totalPages) : 1;

  if (currentPage !== safePage) {
    result = await fetchPage(currentPage);
  }

  const leads = result.rows.flatMap((lead) => {
    try {
      return [
        {
          id: lead.id ?? null,
          name: lead.name ? decryptValue(lead.name) : "",
          email: lead.email ? decryptValue(lead.email) : "",
          mobile: lead.mobile ? decryptValue(lead.mobile) : "",
          service: lead.service ? decryptValue(lead.service) : "",
          consent: lead.consent === true,
          submittedAt: lead.submitted_at ?? "",
        } satisfies DecryptedLeadRecord,
      ];
    } catch {
      return [];
    }
  });

  return {
    leads,
    totalCount: result.totalCount,
    totalPages,
    currentPage,
    pageSize: safePageSize,
  };
}

export function validateLeadsViewerPassword(password: string) {
  if (!leadsViewPassword) {
    throw new Error(
      "Leads viewer password is not configured. Add LEADS_VIEW_PASSWORD to .env.local."
    );
  }

  return password === leadsViewPassword;
}
