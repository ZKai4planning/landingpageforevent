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
  const [isWideDesktop, setIsWideDesktop] = useState(false)
  const [deviceCategory, setDeviceCategory] = useState<
    "mobile" | "tablet" | "smallLaptop" | "laptop" | "desktop" | "wideDesktop"
  >("desktop")
  const isMobile = deviceCategory === "mobile"
  const isCompactLaptop = deviceCategory === "laptop"
  const expandedSectionHeight = isCompactLaptop
    ? "clamp(25rem, 52vh, 34rem)"
    : "clamp(40rem, 84vh, 58rem)"
  const servicesHeadingClass = isCompactLaptop
    ? "mb-4 text-3xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl"
    : "mb-4 text-3xl font-bold sm:text-5xl lg:text-7xl xl:text-9xl"
  const desktopCardGridClass =
    deviceCategory === "tablet"
      ? "grid grid-cols-2 gap-6"
      : deviceCategory === "smallLaptop" || deviceCategory === "laptop"
        ? "grid grid-cols-3 gap-6"
        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6"

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

  const selectedService = services.find((service) => service.id === expandedServiceId)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Separate media queries for each device category
    const mobileMediaQuery = window.matchMedia("(max-width: 767px)")
    const tabletMediaQuery = window.matchMedia("(min-width: 768px) and (max-width: 1023px)")
    const smallLaptopMediaQuery = window.matchMedia("(min-width: 1024px) and (max-width: 1239px)")
    const laptopMediaQuery = window.matchMedia("(min-width: 1240px) and (max-width: 1490px)")
    const desktopMediaQuery = window.matchMedia("(min-width: 1491px) and (max-width: 1919px)")
    const largeDesktopMediaQuery = window.matchMedia("(min-width: 1920px)")
    const wideLayoutMediaQuery = window.matchMedia("(min-width: 1280px)")

    const handleChange = () => {
      const mobile = mobileMediaQuery.matches
      if (mobile) {
        setDeviceCategory("mobile")
      } else if (tabletMediaQuery.matches) {
        setDeviceCategory("tablet")
      } else if (smallLaptopMediaQuery.matches) {
        setDeviceCategory("smallLaptop")
      } else if (laptopMediaQuery.matches) {
        setDeviceCategory("laptop")
      } else if (desktopMediaQuery.matches) {
        setDeviceCategory("desktop")
      } else if (largeDesktopMediaQuery.matches) {
        setDeviceCategory("wideDesktop")
      }

      setIsWideDesktop(wideLayoutMediaQuery.matches)
      if (mobile) {
        setExpandedServiceId(null)
      }
    }

    handleChange()
    if (
      mobileMediaQuery.addEventListener &&
      tabletMediaQuery.addEventListener &&
      smallLaptopMediaQuery.addEventListener &&
      laptopMediaQuery.addEventListener &&
      desktopMediaQuery.addEventListener &&
      largeDesktopMediaQuery.addEventListener &&
      wideLayoutMediaQuery.addEventListener
    ) {
      mobileMediaQuery.addEventListener("change", handleChange)
      tabletMediaQuery.addEventListener("change", handleChange)
      smallLaptopMediaQuery.addEventListener("change", handleChange)
      laptopMediaQuery.addEventListener("change", handleChange)
      desktopMediaQuery.addEventListener("change", handleChange)
      largeDesktopMediaQuery.addEventListener("change", handleChange)
      wideLayoutMediaQuery.addEventListener("change", handleChange)
      return () => {
        mobileMediaQuery.removeEventListener("change", handleChange)
        tabletMediaQuery.removeEventListener("change", handleChange)
        smallLaptopMediaQuery.removeEventListener("change", handleChange)
        laptopMediaQuery.removeEventListener("change", handleChange)
        desktopMediaQuery.removeEventListener("change", handleChange)
        largeDesktopMediaQuery.removeEventListener("change", handleChange)
        wideLayoutMediaQuery.removeEventListener("change", handleChange)
      }
    }

    mobileMediaQuery.addListener(handleChange)
    tabletMediaQuery.addListener(handleChange)
    smallLaptopMediaQuery.addListener(handleChange)
    laptopMediaQuery.addListener(handleChange)
    desktopMediaQuery.addListener(handleChange)
    largeDesktopMediaQuery.addListener(handleChange)
    wideLayoutMediaQuery.addListener(handleChange)
    return () => {
      mobileMediaQuery.removeListener(handleChange)
      tabletMediaQuery.removeListener(handleChange)
      smallLaptopMediaQuery.removeListener(handleChange)
      laptopMediaQuery.removeListener(handleChange)
      desktopMediaQuery.removeListener(handleChange)
      largeDesktopMediaQuery.removeListener(handleChange)
      wideLayoutMediaQuery.removeListener(handleChange)
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
          <h2 className={servicesHeadingClass}>
            Our Services
          </h2>
        </div>
      )}

      <div className="max-w-[1960px] mx-auto px-5 sm:px-6 md:px-10 ">
        {isMobile ? (
          selectedService ? (
            <div ref={expandedContainerRef} className="mx-auto max-w-4xl">
              <ServiceExpandPanel
                index={services.findIndex((service) => service.id === selectedService.id)}
                service={selectedService}
                isExpanded
                mobile
                onExpand={() => setExpandedServiceId(selectedService.id)}
                onClose={() => setExpandedServiceId(null)}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setExpandedServiceId(service.id)}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur-xl transition-all hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  <p className="mb-2 text-xs font-bold text-blue-400">
                    {service.label}
                  </p>

                  <h3 className="mb-3 text-lg font-bold leading-snug">
                    {service.subtitle}
                  </h3>

                  <p className="text-sm italic leading-relaxed text-white/60">
                    &quot;{service.description.substring(0, 90)}...&quot;
                  </p>

                  <span className="relative mt-6 inline-flex items-center gap-1 self-start pt-6 font-semibold text-blue-400">
                    Get Started
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      -&gt;
                    </span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
                  </span>
                </button>
              ))}
            </div>
          )
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
                compactLaptop={isCompactLaptop}
                onExpand={() => setExpandedServiceId(service.id)}
                onClose={() => setExpandedServiceId(null)}
              />
            ))}
          </div>
        ) : (
          <div className={desktopCardGridClass}>
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
