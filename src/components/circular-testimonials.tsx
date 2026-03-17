"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image"; // Fix #3: Import Next.js Image

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

interface CircularTestimonialsProps {
  testimonials: readonly Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  onActiveIndexChange?: (index: number) => void;
  onTestimonialClick?: (index: number) => void;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  onActiveIndexChange,
  onTestimonialClick,
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#1f2937";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#374151";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [isExpanded, setIsExpanded] = useState(false);

  // Refs
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );
  const showNavigation = testimonialsLength > 1;

  // Helper to clear autoplay
  const clearAutoplayTimer = useCallback(() => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
  }, []);

  // Navigation handlers
  // Fix #1 & #2: Moved these definitions ABOVE the useEffect that uses them
  const handleNext = useCallback(() => {
    clearAutoplayTimer();
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
  }, [testimonialsLength, clearAutoplayTimer]);

  const handlePrev = useCallback(() => {
    clearAutoplayTimer();
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
  }, [testimonialsLength, clearAutoplayTimer]);

  // Reset expanded state when testimonial changes
  useEffect(() => {
    setIsExpanded(false);
  }, [activeIndex]);

  // --- Click Outside Logic ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isExpanded) return;
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (testimonialsLength === 0) {
      setActiveIndex(0);
      return;
    }
    if (activeIndex >= testimonialsLength) {
      setActiveIndex(0);
    }
  }, [activeIndex, testimonialsLength]);

  useEffect(() => {
    if (!activeTestimonial) return;
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, activeTestimonial, onActiveIndexChange]);

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay Logic
  useEffect(() => {
    if (autoplay && testimonialsLength > 1 && !isExpanded) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    
    return () => {
      clearAutoplayTimer();
    };
  }, [autoplay, testimonialsLength, isExpanded, clearAutoplayTimer]);

  // Keyboard navigation
  useEffect(() => {
    if (testimonialsLength <= 1) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleNext, handlePrev]); // Fix: Dependencies now refer to the stable callbacks defined above

  // Compute transforms for each image
  function getImageStyle(index: number): React.CSSProperties {
    if (testimonialsLength === 0) {
      return { opacity: 0, pointerEvents: "none" };
    }

    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  // Toggle Read More
  const handleToggleExpand = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    
    if (newState) {
      clearAutoplayTimer();
    }
  };

  const isLongQuote = activeTestimonial?.quote && activeTestimonial.quote.length > 300;

  if (!activeTestimonial) {
    return null;
  }

  return (
    <div className="w-full max-w-280 p-5 sm:p-6 md:p-8">
      <div className="grid gap-10 sm:gap-14 md:grid-cols-[24rem_minmax(0,1fr)] md:gap-20">
        
        {/* Images Section */}
        <div
          className="relative h-64 w-full perspective-[1000px] sm:h-80 md:h-96"
          ref={imageContainerRef}
        >
          {testimonials.map((testimonial, index) => (
            // Fix #3: Use Next.js Image component
            <Image
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              fill // Replaces absolute positioning logic for size
              sizes="(max-width: 768px) 100vw, 33vw" // Helps Next.js optimize bandwidth
              className={`absolute h-full w-full rounded-3xl object-cover shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition duration-300 ${
                index === activeIndex
                  ? "cursor-pointer ring-2 ring-blue-400/60"
                  : "cursor-pointer hover:ring-2 hover:ring-white/30"
              }`}
              style={getImageStyle(index)}
              onClick={() => {
                setActiveIndex(index);
                onTestimonialClick?.(index);
              }}
              priority={index === activeIndex} // Prioritize loading current image
            />
          ))}
        </div>

        {/* Content Section */}
        <div className="flex h-full flex-col" ref={contentRef}>
          <div className="grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h3
                  className="mb-1 font-bold tracking-tight"
                  style={{ color: colorName, fontSize: fontSizeName }}
                >
                  {activeTestimonial.name}
                </h3>
                <p
                  className="mb-6 font-medium"
                  style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                >
                  {activeTestimonial.designation}
                </p>

                {/* Quote Container */}
                <div className="relative">
                  <motion.p
                    className="leading-relaxed"
                    style={{
                      color: colorTestimony,
                      fontSize: fontSizeQuote,
                      display: isExpanded ? "block" : "-webkit-box",
                      WebkitLineClamp: isExpanded ? "unset" : 8,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {activeTestimonial.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.2,
                          ease: "easeInOut",
                          delay: 0.012 * i,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                </div>

                {/* Read More / Read Less Button */}
                {isLongQuote && (
                  <button
                    onClick={handleToggleExpand}
                    className="mt-3 text-sm font-semibold transition-all hover:opacity-80"
                    style={{ color: colorArrowHoverBg }}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          {showNavigation ? (
            <div className="flex gap-3 pt-8 sm:gap-6">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border-0 transition-colors sm:h-12 sm:w-12"
                onClick={handlePrev}
                style={{
                  backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                }}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                aria-label="Previous testimonial"
              >
                <FaArrowLeft size={18} color={colorArrowFg} />
              </button>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full border-0 transition-colors sm:h-12 sm:w-12"
                onClick={handleNext}
                style={{
                  backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                }}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                aria-label="Next testimonial"
              >
                <FaArrowRight size={18} color={colorArrowFg} />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;