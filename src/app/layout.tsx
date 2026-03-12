import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
})


export const metadata: Metadata = {
  title: "Ai4Planning",
  description:
    "Initialize authentication sequence to modify living blueprints and AI-optimized structural modules.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className={`${poppins.className} antialiased`}>

        {children}

      </body>
    </html>
  )
}
