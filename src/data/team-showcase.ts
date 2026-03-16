export const teamShowcaseMembers = [
  {
    quote:
      "Zafer Khan brings a unique blend of property expertise, regulatory insight and technology experience to Ai4Planning. With a strong background in compliance and technology within the financial services industry, he honed his ability to navigate complex regulations and implement efficient digital solutions. Combined with his hands‑on experience in property projects and a keen understanding of planning challenges, this skillset enables him to bridge the gap between planning, compliance and technology. His focus is on leveraging AI to simplify and modernise the planning process while upholding high standards for homeowners and professionals alike.",
    name: "Zafer Khan",
    designation: "Founder, Ai4Planning",
    src: "/Team1.png",
    roleSummary:
      "Delivers period-property renovations with a focus on restoring original character while introducing modern kitchens, bathrooms, and carefully resolved interior finishes.",
    focusAreas: [
      "Heritage Renovation",
      "Bespoke Kitchen Fit-Out",
      "Decorative Restoration",
      "Luxury Interior Finishes",
    ],
    workStats: [
      { label: "Experience", value: "20+ Years" },
      { label: "Core Focus", value: "Period Home Transformation" },
      { label: "Project Scope", value: "Strip-Out to Final Styling" },
    ],
    works: [
      {
        title: "Bespoke Kitchen Installation",
        category: "Kitchen Transformation",
        image: "/team-work/member-1/work-1.jpg",
        summary:
          "Custom cabinetry, stone surfaces, and integrated appliances brought the kitchen into its final construction phase.",
      },
      {
        title: "Fireplace and Cornice Restoration",
        category: "Decorative Restoration",
        image: "/team-work/member-1/work-2.png",
        summary:
          "Original architectural detailing was repaired and restored to protect the character of the period room.",
      },
      {
        title: "Kitchen Island and Joinery Completion",
        category: "Interior Fit-Out",
        image: "/team-work/member-1/work-3.png",
        summary:
          "Final fit-out focused on precision joinery, island installation, and a clean handover-ready finish.",
      },
      {
        title: "Reception Room Strip-Out Phase",
        category: "Renovation Works",
        image: "/team-work/member-1/work-4.png",
        summary:
          "The room was taken back for major renovation works, preparing the shell for structural, electrical, and finish upgrades.",
      },
      {
        title: "Formal Living Room Completion",
        category: "Interior Styling",
        image: "/team-work/member-1/work-5.png",
        summary:
          "Completed living space with restored features, refined finishes, and full interior dressing for occupation.",
      },
      {
        title: "Statement Bathroom Finish",
        category: "Bathroom Design",
        image: "/team-work/member-1/work-6.png",
        summary:
          "A completed bathroom with strong visual character, premium materials, and a luxury residential finish.",
      },
    ],
  },
  {
    quote:
      "Mike is a serial entrepreneur and qualified mechanical engineer whose career spans sales, marketing and project management.  Based in Norfolk, he has spent more than 20 years in property development—leading new builds, renovations and design projects while navigating planning, building control and compliance.  He champions sustainability, integrating heat pumps, solar power and other technologies to ensure every project meets modern standards of efficiency and quality.",
    name: "Mike",
    designation: " Partner & Construction & Regulations Director",
    src: "/Team2.png",
    roleSummary:
      "Works alongside the founder to coordinate timelines, site progress, and practical decision-making across high-detail residential renovation projects.",
    focusAreas: [
      "Project Coordination",
      "Client Communication",
      "Delivery Oversight",
      "Renovation Support",
    ],
    workStats: [
      { label: "Discipline", value: "Project Delivery" },
      { label: "Strength", value: "Coordination & Support" },
      { label: "Project Role", value: "Planning to Completion" },
    ],
    works: [
      {
        title: "Kitchen Transformation Oversight",
        category: "Delivery Coordination",
        image: "/team-work/member-1/work-1.jpg",
        summary:
          "Supported the final coordination of kitchen installation, sequencing, and finish quality across the fit-out stage.",
      },
      {
        title: "Restoration Detailing Review",
        category: "Heritage Coordination",
        image: "/team-work/member-1/work-2.png",
        summary:
          "Managed practical review points around restoration detailing and finish consistency during the works.",
      },
      {
        title: "Joinery and Interior Completion",
        category: "Fit-Out Support",
        image: "/team-work/member-1/work-3.png",
        summary:
          "Coordinated delivery details and completion sequencing for the final joinery and interior fit-out stage.",
      },
      {
        title: "Renovation Phase Planning",
        category: "Site Coordination",
        image: "/team-work/member-1/work-4.png",
        summary:
          "Helped structure the transition from strip-out works into build, services, and finishing packages.",
      },
      {
        title: "Completed Interior Handover",
        category: "Project Delivery",
        image: "/team-work/member-1/work-5.png",
        summary:
          "Supported completion review and handover preparation for the finished living space.",
      },
      {
        title: "Bathroom Finish Coordination",
        category: "Final Stage Review",
        image: "/team-work/member-1/work-6.png",
        summary:
          "Assisted with final checks, sequencing, and finish sign-off for the bathroom completion stage.",
      },
    ],
  },
] as const;

export type TeamShowcaseMember = (typeof teamShowcaseMembers)[number];
