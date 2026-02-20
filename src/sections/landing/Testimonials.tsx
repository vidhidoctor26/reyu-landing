import { useRef, useState, useMemo } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import PlayIcon from "@/assets/images/play.png";
import DiamondIcon from "@/assets/images/diamond.png";

const SPEED = 0.5;

const testimonials = [
  {
    name: "Sophia Martinez",
    location: "Frankfurt, Germany",
    time: "1 month ago",
    content:
      "Reyu Jewels stands for reliability. From selection to delivery, everything was smooth and professional. I will definitely return for future purchases.",
  },
  {
    name: "Emma Fischer",
    location: "Berlin, Germany",
    time: "2 months ago",
    content:
      "Absolutely stunning craftsmanship. The diamond quality exceeded expectations and the customer support was exceptional.",
  },
  {
    name: "Olivia Schmidt",
    location: "Munich, Germany",
    time: "3 weeks ago",
    content:
      "Elegant packaging and premium quality. Reyu Jewels truly understands luxury and trust.",
  },
];

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);

  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);

  const x1 = useMotionValue(0);
  const x2 = useMotionValue(0);

  const tripled = useMemo(
    () => [...testimonials, ...testimonials, ...testimonials],
    [],
  );

  // ── Identical loop logic for both rows, only sign differs ─────────────────
// ── Optimized loop logic ─────────────────
  useAnimationFrame(() => {
    if (isPaused) return;

    // Row 1: LEFT (Standard: 0 → -unit → snap to 0)
    const el1 = containerRef1.current;
    if (el1) {
      const unit1 = el1.scrollWidth / 3;
      let v1 = x1.get() - SPEED;
      if (v1 <= -unit1) v1 += unit1;
      x1.set(v1);
    }

    // Row 2: RIGHT (Fixed: -unit → 0 → snap to -unit)
    const el2 = containerRef2.current;
    if (el2) {
      const unit2 = el2.scrollWidth / 3;
      
      // Initial state fix: if at 0, start at -unit2 to ensure content is on the left
      if (x2.get() === 0) {
        x2.set(-unit2);
      }

      let v2 = x2.get() + SPEED;
      // When the left edge of the middle copy hits 0, snap it back left
      if (v2 >= 0) v2 -= unit2; 
      x2.set(v2);
    }
  });

  return (
    <section className="w-full bg-[#2A2A2A] overflow-hidden mt-[-140px]">
      <div className="w-full max-w-[1920px] mx-auto py-16 md:py-20 lg:py-[120px]">

        {/* Heading */}
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-[120px] text-center mb-12 md:mb-16 lg:mb-[100px]">
          <p className="font-offside text-[#CEA574] leading-none text-base sm:text-lg md:text-xl lg:text-2xl mb-4">
            Trust & Satisfaction
          </p>
          <h2 className="font-playfair font-normal text-white leading-[100%] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] mb-6">
            What Our Clients Say
          </h2>
          <p className="font-old-standard text-white leading-relaxed text-base sm:text-lg md:text-xl lg:text-2xl max-w-[1063px] mx-auto">
            Discover why discerning customers choose Reyu Jewels for their most precious moments.
          </p>
        </div>

        {/* ── Row 1: Video cards scrolling LEFT ─────────────────────────────── */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing mb-[64px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            ref={containerRef1}
            style={{ x: x1 }}
            drag="x"
            dragConstraints={{ left: -99999, right: 99999 }}
            dragElastic={0}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={() => setIsPaused(false)}
            className="flex flex-nowrap gap-[33px] py-4 w-max"
          >
            {tripled.map((t, i) => (
              <div
                key={i}
                className="shrink-0 bg-[#FFFFFF08] rounded-[16px] w-[500px] flex flex-col transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="w-full aspect-[500/240] bg-white rounded-[16px] flex items-center justify-center border-[3px] border-[#CEA574]/40 group-hover:border-[#CEA574] group-hover:shadow-[0_8px_40px_rgba(206,165,116,0.25)] transition-all duration-300">
                  <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                    <img src={PlayIcon} alt="Play" className="w-8 h-auto" />
                  </div>
                </div>
                <div className="mt-[16px] px-[24px] mb-[16px] flex justify-between items-start opacity-70 group-hover:opacity-100 transition-opacity">
                  <div>
                    <p className="font-playfair text-[#CEA574] text-[18px] leading-tight">{t.name}</p>
                    <p className="font-old-standard text-white text-[14px] mt-1">{t.location}</p>
                  </div>
                  <p className="font-old-standard text-white/50 text-[14px] whitespace-nowrap">{t.time}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Row 2: Review cards scrolling RIGHT ───────────────────────────── */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing mb-[100px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            ref={containerRef2}
            style={{ x: x2 }}
            drag="x"
            dragConstraints={{ left: -99999, right: 99999 }}
            dragElastic={0}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={() => setIsPaused(false)}
            className="flex flex-nowrap gap-[32px] py-4 w-max"
          >
            {tripled.map((t, i) => (
              <div
                key={i}
                className="shrink-0 relative overflow-hidden w-[500px] h-[240px] bg-[#5E3E1833] border-[3px] border-[#CEA574] rounded-[16px]"
              >
                <div className="absolute top-[24px] left-[24px]">
                  <h4 className="font-offside text-[24px] text-[#CEA574] leading-[100%]">{t.name}</h4>
                  <p className="font-playfair text-[14px] text-white mt-[8px]">{t.location}</p>
                </div>
                <p className="absolute top-[95px] left-[24px] right-[24px] font-old-standard text-[16px] text-white leading-snug">
                  {t.content}
                </p>
                <div className="absolute bottom-[24px] left-1/2 -translate-x-1/2 flex gap-1">
                  {[...Array(5)].map((_, idx) => (
                    <img key={idx} src={DiamondIcon} alt="★" className="w-[20px] h-[20px] " />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gold divider */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[1px] bg-[#CEA574]/40" />

      </div>
    </section>
  );
};

export default Testimonials;