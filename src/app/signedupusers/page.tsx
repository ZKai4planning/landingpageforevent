"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Footer from "@/components/landingpagefooter";
import { LoginHeader } from "@/components/login-header";

type SignupLead = {
  id: number | string | null;
  name: string;
  companyName: string;
  email: string;
  mobile: string;
  service: string;
  consent: boolean;
  submittedAt: string;
};

type ViewLeadsResponse = {
  message?: string;
  leads?: SignupLead[];
  totalCount?: number;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
};

const PAGE_SIZE = 10;

function formatSubmittedAt(value: string) {
  if (!value) return "Unknown";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export default function SignupsPage() {
  const [password, setPassword] = useState("");
  const [verifiedPassword, setVerifiedPassword] = useState<string | null>(null);
  const [leads, setLeads] = useState<SignupLead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadLeads = async (currentPassword: string, page = 1) => {
    const response = await fetch("/api/leads/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: currentPassword,
        page,
        pageSize: PAGE_SIZE,
      }),
    });

    const result = (await response.json()) as ViewLeadsResponse;

    if (!response.ok) {
      throw new Error(result.message || "Unable to open the signup users page.");
    }

    return {
      leads: result.leads ?? [],
      totalCount: result.totalCount ?? 0,
      totalPages: result.totalPages ?? 1,
      currentPage: result.currentPage ?? 1,
    };
  };

  const handleUnlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!password.trim()) {
      setErrorMessage("Please enter the password to view signup users.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await loadLeads(password.trim(), 1);
      setVerifiedPassword(password.trim());
      setLeads(result.leads);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      setPassword("");
      toast.success("Access granted. Signup users loaded.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to open the signup users page."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    if (!verifiedPassword) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await loadLeads(verifiedPassword, currentPage);
      setLeads(result.leads);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
      toast.success("Signup users refreshed.");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to refresh signup users."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLock = () => {
    setVerifiedPassword(null);
    setLeads([]);
    setCurrentPage(1);
    setTotalCount(0);
    setTotalPages(1);
    setErrorMessage("");
    setPassword("");
  };

  const handlePageChange = async (page: number) => {
    if (!verifiedPassword || page === currentPage || page < 1 || page > totalPages) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await loadLeads(verifiedPassword, page);
      setLeads(result.leads);
      setCurrentPage(result.currentPage);
      setTotalCount(result.totalCount);
      setTotalPages(result.totalPages);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to change the signup users page."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <LoginHeader ctaLabel="Back Home" ctaHref="/" />
      <main className="min-h-screen bg-[#05070d] px-4 py-14 sm:px-6 sm:py-18">
        <div className="mx-auto max-w-6xl">
          {!verifiedPassword ? (
            <section className="mx-auto max-w-xl rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,30,0.96),rgba(5,8,18,0.98))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
              <div className="mb-8 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/80">
                  Protected Page
                </p>
                <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                  View Signup Users
                </h1>
                <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                  Enter the password to access the signup users page and load the
                  submitted lead data.
                </p>
              </div>

              <form onSubmit={handleUnlock} className="space-y-4">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-white/85">
                    Password
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setErrorMessage("");
                      setPassword(event.target.value);
                    }}
                    className="w-full rounded-[1rem] border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/40"
                    placeholder="Enter access password"
                  />
                </label>

                {errorMessage ? (
                  <p className="rounded-[1rem] border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-1 relative inline-flex min-w-[12rem] items-center justify-center overflow-hidden rounded-[0.9rem] px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="relative z-10">
                    {isLoading ? "Checking..." : "Unlock Page"}
                  </span>
                </button>
              </form>
            </section>
          ) : (
            <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,30,0.96),rgba(5,8,18,0.98))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8">
              <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-200/80">
                    Protected Data
                  </p>
                  <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                    Signup Users
                  </h1>
                  <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
                    Showing {totalCount} submitted signup
                    {totalCount === 1 ? "" : "s"} from the lead capture forms.
                  </p>
                  {totalCount > 0 ? (
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/45">
                      Page {currentPage} of {totalPages}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="rounded-full border border-blue-300/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? "Refreshing..." : "Refresh"}
                  </button>
                  <button
                    type="button"
                    onClick={handleLock}
                    className="rounded-full border border-white/12 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Lock Page
                  </button>
                </div>
              </div>

              {errorMessage ? (
                <p className="mt-6 rounded-[1rem] border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                  {errorMessage}
                </p>
              ) : null}

              {totalCount === 0 ? (
                <div className="mt-8 rounded-[1.5rem] border border-dashed border-white/12 bg-black/10 px-6 py-12 text-center text-white/60">
                  No signup users found yet.
                </div>
              ) : (
                <>
                  <div className="mt-8 overflow-x-auto rounded-[1.5rem] border border-white/10 bg-black/20">
                    <table className="min-w-full border-collapse text-left text-sm text-white">
                      <thead className="bg-white/5 text-[11px] uppercase tracking-[0.22em] text-white/55">
                        <tr>
                          <th className="px-4 py-4 font-semibold">Name</th>
                          <th className="px-4 py-4 font-semibold">Company</th>
                          <th className="px-4 py-4 font-semibold">Email</th>
                          <th className="px-4 py-4 font-semibold">Mobile</th>
                          <th className="px-4 py-4 font-semibold">Service</th>
                          <th className="px-4 py-4 font-semibold">Consent</th>
                          <th className="px-4 py-4 font-semibold">Submitted</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr
                            key={`${lead.id ?? lead.email}-${lead.submittedAt}`}
                            className="border-t border-white/10 align-top text-white/85"
                          >
                            <td className="px-4 py-4 font-medium text-white">
                              {lead.name}
                            </td>
                            <td className="px-4 py-4 min-w-[12rem]">
                              {lead.companyName || "-"}
                            </td>
                            <td className="px-4 py-4 break-all">{lead.email}</td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              {lead.mobile}
                            </td>
                            <td className="px-4 py-4 min-w-[14rem]">
                              {lead.service}
                            </td>
                            <td className="px-4 py-4">
                              <span className="rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100">
                                {lead.consent ? "Consented" : "Pending"}
                              </span>
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap">
                              {formatSubmittedAt(lead.submittedAt)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-white/55">
                      Showing {Math.min((currentPage - 1) * PAGE_SIZE + 1, totalCount)}-
                      {Math.min(currentPage * PAGE_SIZE, totalCount)} of {totalCount}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || isLoading}
                        className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                      ).map((pageNumber) => (
                        <button
                          key={pageNumber}
                          type="button"
                          onClick={() => handlePageChange(pageNumber)}
                          disabled={isLoading}
                          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                            pageNumber === currentPage
                              ? "bg-blue-500 text-white"
                              : "border border-white/12 bg-white/5 text-white hover:bg-white/10"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || isLoading}
                        className="rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
