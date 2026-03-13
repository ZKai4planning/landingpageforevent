"use client";

import React, { useState } from "react";
import Link from "next/link";

type FormState = {
  name: string;
  email: string;
  mobile: string;
  consent: boolean;
};

const initialFormState: FormState = {
  name: "",
  email: "",
  mobile: "",
  consent: false,
};

const isValidUkMobile = (mobile: string) => {
  const normalizedMobile = mobile.replace(/[\s()-]/g, "");
  return /^(?:\+44|44|0)7\d{9}$/.test(normalizedMobile);
};

export const LeadCaptureForm = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.mobile.trim()
    ) {
      setErrorMessage("Please fill in your name, email, and mobile number.");
      return;
    }

    if (!isValidUkMobile(formData.mobile)) {
      setErrorMessage(
        "Please enter a valid UK mobile number starting with 07 or +44 7."
      );
      return;
    }

    if (!formData.consent) {
      setErrorMessage("Please accept consent before submitting the form.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit the form.");
      }

      setSuccessMessage(
        "Thank you. Your details have been captured and we will contact you shortly."
      );
      setFormData(initialFormState);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting the form."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="lead-form"
      className="relative overflow-hidden bg-[#05070d] px-4 py-14 sm:px-6 sm:py-18"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(80,162,255,0.18),transparent_24%),radial-gradient(circle_at_85%_20%,rgba(245,158,11,0.12),transparent_20%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,15,30,0.94),rgba(5,8,18,0.98))] p-5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <div className="space-y-4">
          
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Request a call back
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-white/68 sm:text-base">
              Leave your details and our team will get back to you to discuss
              planning, renovation, or construction support.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-white/85">Name</span>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-[1rem] border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/40"
                  placeholder="Your full name"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/85">Email</span>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-[1rem] border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/40"
                  placeholder="you@example.com"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium text-white/85">
                  Mobile Number
                </span>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(event) =>
                    setFormData((current) => ({
                      ...current,
                      mobile: event.target.value,
                    }))
                  }
                  className="w-full rounded-[1rem] border border-white/12 bg-black/20 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-blue-300/40"
                  placeholder="+44 7777 888 999"
                />
               
              </label>
            </div>

            <label className="flex items-start gap-3 rounded-[1rem] border border-white/10 bg-white/[0.04] px-4 py-3">
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    consent: event.target.checked,
                  }))
                }
                className="mt-1 h-4 w-4 rounded border-white/20 bg-black/20 accent-blue-400"
              />
              <span className="text-sm leading-relaxed text-white/72">
                I agree to {" "}
                <Link
                  href="/terms"
                  target="_blank"
                  className="text-blue-300 underline underline-offset-4 hover:text-blue-200"
                >
                  terms and conditions
                </Link>
              </span>
            </label>

            {errorMessage ? (
              <p className="rounded-[1rem] border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {errorMessage}
              </p>
            ) : null}

            {successMessage ? (
              <p className="rounded-[1rem] border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
                {successMessage}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-1 relative inline-flex min-w-[12rem] items-center justify-center overflow-hidden rounded-[0.9rem] px-6 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10">
                {isSubmitting ? "Submitting..." : "submit"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
