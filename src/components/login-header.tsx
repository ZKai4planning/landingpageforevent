"use client"

import Link from "next/link"
import { Logo } from "@/components/landing-log"

type LoginHeaderProps = {
  ctaLabel?: string
  ctaHref?: string
}

export function LoginHeader({
  ctaLabel = "Sign Up",
  ctaHref = "/signup",
}: LoginHeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 bg-[#050b18] px-4 backdrop-blur-md sm:px-6 lg:px-10 dark:bg-slate-900/80">
      <div className="min-w-0 text-primary">
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Logo />
          <h2 className="truncate text-lg font-bold tracking-tight text-white sm:text-2xl dark:text-white">
            Ai4Planning
          </h2>
        </Link>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <Link
          href={ctaHref}
          className="rounded-full border border-blue-300/30 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-blue-500/20 sm:px-5 sm:text-sm"
        >
          {ctaLabel}
        </Link>
      </div>
    </header>
  )
}
