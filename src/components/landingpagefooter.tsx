"use client"

import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

const WHATSAPP_URL =
  "https://wa.me/447777788885?text=Hello%21%20I%20have%20a%20query."

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-16 py-12 sm:py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          
          {/* Brand */}
          <div className="space-y-4 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Image
                src="/logo.png"
                alt="AI4Planning Logo"
                width={90}
                height={36}
                className="rounded-sm"
                priority
              />
              <h3 className="text-xl font-semibold tracking-tight">
                AI4Planning
              </h3>
            </div>

            <p className="text-sm text-white/60 leading-relaxed">
              Planning-first consultancy combining AI, human expertise, and
              execution across property, construction, business, and personal
              projects.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4">Quick Links</h4>
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
                <Link href={WHATSAPP_URL} target="_blank" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Mail className="h-4 w-4 text-indigo-400" />
                <span>info@ai4planning.com</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3">
                <Phone className="h-4 w-4 text-indigo-400" />
                <Link href={WHATSAPP_URL} target="_blank" className="hover:text-white">
                  +44 7777788885
                </Link>
              </li>
              <li className="flex items-start justify-center md:justify-start gap-3">
                <MapPin className="h-4 w-4 text-indigo-400 mt-0.5" />
                <span>
                  UK 
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-sm text-white/60 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} AI4Planning. All rights reserved.
          </p>

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
