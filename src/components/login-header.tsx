"use client"

import { useState } from "react"
import {Logo} from "@/components/landing-log"
import { ClientLogin } from "@/components//clientloginform" 
import { motion } from "framer-motion"

export function LoginHeader() {
  const [showLogin, setShowLogin] = useState(false)

  const handleSignUpClick = () => {
    document.getElementById("lead-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/10 px-4 sm:px-6 lg:px-10 bg-[#050b18] dark:bg-slate-900/80 backdrop-blur-md"
      >
        <div className="flex items-center gap-3 text-primary min-w-0">
          <button
            onClick={() => window.location.href = "/"}
            className="flex items-center gap-2 sm:gap-3"
          >
            <Logo />
            <h2 className="text-white dark:text-white text-lg sm:text-2xl font-bold tracking-tight truncate">
              Ai4Planning
            </h2>
          </button>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={handleSignUpClick}
            className="rounded-full border border-blue-300/30 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-white transition hover:bg-blue-500/20 sm:px-5 sm:text-sm"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* ================= LOGIN MODAL ================= */}
      {showLogin && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowLogin(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* CLIENT LOGIN */}
            <ClientLogin />
          </motion.div>
        </div>
      )}
    </>
  )
}
