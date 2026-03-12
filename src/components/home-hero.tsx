"use client"

import { motion } from "framer-motion"

const heroText =
  "Your partner in planning, whether you’re an individual, homeowner, small business, or a planning consultant. We streamline the path from concept to completion."

export default function HomeHero() {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          suppressHydrationWarning
        >
          <source src="/blueprinttobuilding.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 md:px-8 md:py-28 lg:px-10 xl:py-32">
        <div className="w-full max-w-6xl">
          <motion.h1
            initial={{ scale: 0.25, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 1.6,
              ease: "easeOut",
              delay: 5.6,
            }}
            className="mb-5 text-[clamp(2.5rem,11vw,10rem)] font-bold leading-[0.9] tracking-[-0.04em] text-white sm:mb-6 md:text-[clamp(3.5rem,10vw,12rem)]"
          >
            Ai4Planning
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.06,
                  delayChildren: 7.3,
                },
              },
            }}
            className="mx-auto flex max-w-[min(92vw,60rem)] flex-wrap justify-center gap-x-1.5  text-balance text-[clamp(1rem,2.7vw,1.9rem)] leading-relaxed text-white/90"
          >
            {heroText.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 8.6,
            }}
            className="mt-8 flex flex-col justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-1 relative w-full overflow-hidden rounded-sm px-6 py-3.5 text-sm font-semibold sm:w-auto sm:min-w-[13rem] sm:px-8 sm:text-base"
            >
              <span className="relative z-10">Explore Our Services</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.open(
                  "https://calendly.com/ai4planning-info/30min",
                  "_blank"
                )
              }}
              className="w-full rounded-sm border-2 border-white bg-white/10 px-6 py-3.5 text-sm text-white transition hover:bg-white/20 sm:w-auto sm:min-w-[13rem] sm:px-8 sm:text-base lg:px-10"
            >
              Let&apos;s Talk
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
