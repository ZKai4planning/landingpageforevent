import Footer from "@/components/landingpagefooter"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { LoginHeader } from "@/components/login-header"

export default function SignupPage() {
  return (
    <>
      <LoginHeader ctaLabel="Back Home" ctaHref="/" />
      <main className="min-h-screen bg-[#05070d]">
        <LeadCaptureForm
          sectionId="signup-form"
          eyebrow="Sign Up"
          title="Tell us which service you need"
          description="Choose your required service, share your contact details, and our team will get back to you shortly."
          showIntro={false}
          singleColumn
        />
      </main>
      <Footer />
    </>
  )
}
