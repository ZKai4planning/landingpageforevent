export const teamShowcaseMembers = [
  {
    quote:
      "From heritage strip-out to the final dressed interior, each stage is handled with a strong eye for restoration detail, bespoke joinery, and high-end residential finish.",
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
      "Supports project planning, client coordination, and delivery oversight so each residential renovation moves smoothly from early decisions to final completion.",
    name: "Mike",
    designation: "Development Support",
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
