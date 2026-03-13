"use client";

import React from "react";
import { CircularTestimonials } from "@/components/circular-testimonials";
import { teamShowcaseMembers } from "@/data/team-showcase";

export const OurTeams = () => {
  return (
    <section className="bg-[#060507] px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            MEET <span className="text-neutral-400 italic">OUR</span> TEAM
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
            Meet the people behind Ai4Planning and the team leading the vision,
            delivery, and client experience.
          </p>
        </div>

        <div className="relative flex w-full items-center justify-center">
          <CircularTestimonials
            testimonials={teamShowcaseMembers}
            autoplay={true}
            colors={{
              name: "#51a2ff",
              designation: "#e1e1e1",
              testimony: "#f1f1f7",
              arrowBackground: "#0582CA",
              arrowForeground: "#141414",
              arrowHoverBackground: "#f7f7ff",
            }}
            fontSizes={{
              name: "clamp(1.25rem, 4vw, 1.75rem)",
              designation: "clamp(0.95rem, 2.8vw, 1.25rem)",
              quote: "clamp(0.95rem, 2.8vw, 1.25rem)",
            }}
          />
        </div>
      </div>
    </section>
  );
};
