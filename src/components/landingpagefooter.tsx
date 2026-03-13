"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

const WHATSAPP_URL =
  "https://wa.me/447777788885?text=Hello%21%20I%20have%20a%20query."

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-8xl px-6 py-12 sm:px-8 sm:py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-3">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Image
                src="/logo.png"
                alt="AI4Planning Logo"
                width={90}
                height={36}
                className="rounded-sm"
                priority
              />
              <h3 className="text-xl font-semibold tracking-tight">AI4Planning</h3>
            </div>

            <p className="text-sm leading-relaxed text-white/60">
              Planning-first consultancy combining AI, human expertise, and
              execution across property, construction, business, and personal
              projects.
            </p>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 font-medium">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link href="#services" className="hover:text-white">
                  Service
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-white">
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  className="hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="mb-4 font-medium">Contact</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>info@ai4planning.com</span>
              </li>
              <li className="flex items-center justify-center gap-3 md:justify-start">
                <Phone className="h-4 w-4 text-indigo-400" />
                <Link
                  href={WHATSAPP_URL}
                  target="_blank"
                  className="hover:text-white"
                >
                  +44 7777788885
                </Link>
              </li>
              <li className="flex items-start justify-center gap-3 md:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 text-indigo-400" />
                <span>34 Milligan Street, London E14 8AU</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 border-t border-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-white/60 md:flex-row md:gap-6 md:text-left">
          <p>Copyright {new Date().getFullYear()} AI4Planning. All rights reserved.</p>

          {/* <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
            <Link href="/cookie" className="hover:text-white">
              Cookies Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms
            </Link>
            <Link href={WHATSAPP_URL} target="_blank" className="hover:text-white">
              Support
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
