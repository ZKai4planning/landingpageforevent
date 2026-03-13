import { LoginHeader } from "@/components/login-header"
import HomeHero from "@/components/home-hero"
import ServicesSection from "@/components/services-section"
import PricingCardsLanding from "@/components/pricingcards-landing"
import { OurTeams } from "@/components/ourteams"
import { LeadCaptureForm } from "@/components/lead-capture-form"
import { PremiumTestimonials } from "@/components/premium-testimonials"
import WhatsAppButton from "@/components/whatsppp-button"
import { CookieConsent } from "@/components/cookie-consent"
import Footer from "@/components/landingpagefooter"



export default function Home() {
  return (
    <>
      <LoginHeader />
      <HomeHero />
      <ServicesSection />
      <PricingCardsLanding />
      <OurTeams />
      <PremiumTestimonials />
      <WhatsAppButton />
      <CookieConsent />
      <LeadCaptureForm />
      <Footer />
    </>
  )
}
