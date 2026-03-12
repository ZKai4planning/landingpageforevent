"use client"

import { useEffect, useRef, useState } from "react"
import ServiceExpandPanel from "@/components/service-expand-panel"
import type { Service } from "@/lib/service-types"

const services: Service[] = [
  {
    id: "Service-01",
    title: "Residential: Homeowners &landlords",
    shortTitle: "Residential: Homeowners & landlords",
    subtitle: "Residential: Homeowners & landlords",
    image: "/Service-01.png",
    description:
      "Concierge-driven planning advice focused on balancing personal priorities with project outcomes; personalised guidance through household planning applications.",
    features: [
      {
        title: "Householder Planning Consent",
        header: "Householder Planning Consent",
        description:
          "As a homeowner, I want to build a modest extension (e.g., a rear kitchen/dining room) so that my family has more living space.",
      },
      {
        title: "New Build Construction",
        header: "New Build Construction",
        description:
          "As a client, I want to construct a new residential or mixed-use building so that the project is delivered safely, on time, and in compliance with approved plans and building regulations.",
      },
      {
        title: "Non Material Amendment ",
        header: "Non Material Amendment ",
        description:
          "As a homeowner with an approved plan, I want to make a small change (for example moving a window or adjusting a roof pitch) so that the design better suits my needs without re applying from scratch.",
      },
      {
        title: " Advertisement Consent ",
        header: " Advertisement Consent ",
        description:
          "As a homeowner running a home based business, I want to erect a small sign outside my property so that customers can find me. ",
      },
      {
        title: "Works to Trees (TPO & Conservation)",
        header: "Works to Trees (TPO & Conservation)",
        description:
          "As a homeowner with a protected tree in my garden, I want to prune or remove dangerous branches so that my family and property are safe.",
      },
      {
        title: "Lawful Development Certificate (LDC)",
        header: "Lawful Development Certificate (LDC)",
        description:
          "As a homeowner, I want legal confirmation that my existing extension or outbuilding is lawful so that I am protected from enforcement action.",
      },
      {
        title: "Certificate of Lawfulness (Proposed Works to a Listed Building)",
        header: "Certificate of Lawfulness (Proposed Works to a Listed Building)",
        description:
          "As the owner of a listed property, I want to ensure that my proposed repairs (e.g., replacing rotten timber) do not require listed building consent so that I can proceed with confidence. ",
      },
      {
        title: "Permission in Principle (PiP)",
        header: "Permission in Principle (PiP)",
        description:
          "As a homeowner with a large garden plot, I want initial approval to build a small number of homes so that I can decide whether to proceed before investing in detailed designs. ",
      },
      {
        title: "Prior Approval",
        header: "Prior Approval",
        description:
          "As a homeowner planning a larger extension under permitted development, I want to submit a prior approval request so that the council can check impacts (such as neighbour amenity) before I start.",
      },
      {
        title: "Approval / Discharge of Conditions",
        header: "Approval / Discharge of Conditions",
        description:
          "As a homeowner who has obtained planning permission, I want to discharge my conditions (such as materials or landscaping) so that I can begin building. ",
      },
      {
        title: "Full Planning Consent",
        header: "Full Planning Consent",
        description:
          "As a homeowner wanting to build a new dwelling or substantially remodel my property (e.g., converting it into flats), I want to apply for full planning permission so that I can carry out my development legally.",
      },
      {
        title: "Outline Planning Consent",
        header: "Outline Planning Consent",
        description:
          "As a homeowner with land to develop, I want to test whether building multiple houses might be acceptable before producing detailed plans",
      },
      {
        title: "Reserved Matters Application  ",
        header: "Reserved Matters Application  ",
        description:
          "As a homeowner who has outline approval, I want to submit detailed designs for appearance, layout and landscaping so that construction can proceed.",
      },
    ],
    cta: "Select & Apply",
    label: "Homeowners, landlords, self-builders",
  },
  {
    id: "Service-02",
    title: "Commercial: Property Development & Planning",
    shortTitle: "Commercial: Property Development & Planning",
    subtitle: "Commercial: Property Development & Planning",
    image: "/Service-02.jpg",
    description:
      "Strategic guidance for medium- and large-scale commercial schemes; planning and phasing support.",
    features: [
      { title: "Commercial planning strategy" },
      { title: "Medium & large-scale scheme support" },
      { title: "Development phasing advice" },
      { title: "Planning risk & feasibility assessment" },
      { title: "End-to-end commercial planning guidance" },
    ],
    cta: "Select & Apply",
    label: "Commercial Property Developers",
  },
  {
    id: "Service-03",
    title: "Small Business Strategy & Operations Improvement",
    shortTitle: "Small Business Strategy & Operations Improvement",
    subtitle: "Small Business Strategy & Operations Improvement",
    image: "/Service-03.jpg",
    description:
      "Business planning and operations improvement; technology and workflow optimization; strategic road mapping.",
    features: [
      { title: "Business planning & strategy" },
      { title: "Operational improvement analysis" },
      { title: "Technology & workflow optimisation" },
      { title: "Strategic roadmapping" },
      { title: "Ongoing SME advisory support" },
    ],
    cta: "Select & Apply",
    label: "SMEs (non-development)",
  },
  {
    id: "Service-04",
    title: "Consultant Production & Compliance Support",
    shortTitle: "Consultant Production & Compliance Support",
    subtitle: "Consultant Production & Compliance Support",
    image: "/Service-04.png",
    description:
      "Scalable drawing production, regulatory compliance checks, and QA reviews.",
    features: [
      { title: "Scalable drawing production" },
      { title: "Regulatory compliance checks" },
      { title: "Quality assurance (QA) reviews" },
      { title: "Architectural & technical support" },
      { title: "Flexible production capacity" },
    ],
    cta: "Select & Apply",
    label: "Planning consultants & architects",
  },
  {
    id: "Service-05",
    title: "In-House Construction Delivery",
    shortTitle: "In-House Construction Delivery",
    subtitle: "In-House Construction Delivery",
    image: "/Construction-5.jpg",
    description:
      "Design-and-build services post-consent; integrated planning and construction management.",
    features: [
      { title: "Post-consent design & build" },
      { title: "Integrated planning & construction" },
      { title: "Construction management support" },
      { title: "Programme & delivery coordination" },
      { title: "Single-point delivery responsibility" },
    ],
    cta: "Select & Apply",
    label: "Clients with consented projects ",
  },
  {
    id: "Service-06",
    title: "Tailored Project Management & Consultancy Marketplace ",
    shortTitle: "Tailored Project Management ",
    subtitle: "Tailored Project Management & Consultancy Marketplace ",
    image: "/Service-06.png",
    description:
      "Curated marketplace of vetted consultants offering project and planning-related services.",
    features: [
      { title: "Curated consultant marketplace" },
      { title: "Task-based consultancy services" },
      { title: "Flexible project management support" },
      { title: "Vetted professional network" },
      { title: "Cross-discipline expertise access" },
    ],
    cta: "Select & Apply",
    label: "All client types",
  },
]

export default function ServicesSection() {
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null)
  const expandedContainerRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isWideDesktop, setIsWideDesktop] = useState(false)
  const expandedSectionHeight = "clamp(40rem, 84vh, 58rem)"

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        expandedContainerRef.current &&
        !expandedContainerRef.current.contains(event.target as Node)
      ) {
        setExpandedServiceId(null)
      }
    }

    if (expandedServiceId) {
      document.addEventListener("mousedown", handleClickOutside)
      return () =>
        document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [expandedServiceId])

  useEffect(() => {
    if (typeof window === "undefined") return

    const mobileMediaQuery = window.matchMedia("(max-width: 767px)")
    const wideDesktopMediaQuery = window.matchMedia("(min-width: 1280px)")
    const handleChange = () => {
      const mobile = mobileMediaQuery.matches
      setIsMobile(mobile)
      setIsWideDesktop(wideDesktopMediaQuery.matches)
      if (mobile) {
        setExpandedServiceId(null)
      }
    }

    handleChange()
    if (mobileMediaQuery.addEventListener && wideDesktopMediaQuery.addEventListener) {
      mobileMediaQuery.addEventListener("change", handleChange)
      wideDesktopMediaQuery.addEventListener("change", handleChange)
      return () => {
        mobileMediaQuery.removeEventListener("change", handleChange)
        wideDesktopMediaQuery.removeEventListener("change", handleChange)
      }
    }

    mobileMediaQuery.addListener(handleChange)
    wideDesktopMediaQuery.addListener(handleChange)
    return () => {
      mobileMediaQuery.removeListener(handleChange)
      wideDesktopMediaQuery.removeListener(handleChange)
    }
  }, [])

  useEffect(() => {
    if (!expandedServiceId || typeof window === "undefined") return

    const mediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1279px)")
    if (!mediaQuery.matches) return

    requestAnimationFrame(() => {
      servicesSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })
  }, [expandedServiceId])

  return (
    <section
      id="services"
      ref={servicesSectionRef}
      className="relative bg-[#050B18] pt-24 pb-16 text-white sm:pt-28 md:pt-36 xl:pb-0 min-h-screen"
      style={{
        minHeight:
          expandedServiceId && isWideDesktop
            ? `calc(${expandedSectionHeight} + 10rem)`
            : undefined,
      }}
    >
      {!expandedServiceId && (
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl xl:text-9xl font-bold mb-4">
            Our Services
          </h2>
        </div>
      )}

      <div className="max-w-[1960px] mx-auto px-5 sm:px-6 md:px-10 ">
        {isMobile ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl transition-all flex flex-col"
              >
                <div>
                  <p className="text-xs font-bold text-blue-400 mb-2">
                    {service.label}
                  </p>

                  <h3 className="text-lg font-bold mb-3 leading-snug">
                    {service.subtitle}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed italic">
                    &quot;{service.description.substring(0, 80)}...&quot;
                  </p>
                </div>

                <span className="mt-auto pt-6 text-blue-400 font-semibold inline-flex items-center gap-1 relative self-start">
                  Get Started
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    -&gt;
                  </span>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </span>
              </div>
            ))}
          </div>
        ) : expandedServiceId ? (
          <div
            ref={expandedContainerRef}
            className="flex flex-col gap-2 xl:flex-row"
            style={{
              minHeight: isWideDesktop ? expandedSectionHeight : undefined,
              height: isWideDesktop ? expandedSectionHeight : undefined,
            }}
          >
            {services.map((service, index) => (
              <ServiceExpandPanel
                key={service.id}
                index={index}
                service={service}
                isExpanded={expandedServiceId === service.id}
                onExpand={() => setExpandedServiceId(service.id)}
                onClose={() => setExpandedServiceId(null)}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => setExpandedServiceId(service.id)}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl cursor-pointer transition-all hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/20 flex flex-col"
              >
                <div>
                  <p className="text-xs font-bold text-blue-400 mb-2">
                    {service.label}
                  </p>

                  <h3 className="text-lg font-bold mb-3 leading-snug">
                    {service.subtitle}
                  </h3>

                  <p className="text-sm text-white/60 leading-relaxed italic">
                    &quot;{service.description.substring(0, 80)}...&quot;
                  </p>
                </div>

                <span className="mt-auto pt-6 text-blue-400 font-semibold inline-flex items-center gap-1 relative self-start">
                  Get Started
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    -&gt;
                  </span>
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
