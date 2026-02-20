import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import diamonds from "@/assets/images/diamonds.png";
import hand from "@/assets/images/hand.png";
import single from "@/assets/images/single.png";

type SlotKey = "front" | "mid" | "back";

interface Slide {
  src: string;
  alt: string;
}

const slides: Slide[] = [
  { src: hand, alt: "Reyu Jewels – Diamond Ring I" },
  { src: diamonds, alt: "Reyu Jewels – Diamond Ring II" },
  { src: single, alt: "Reyu Jewels – Diamond Ring III" },
];

const SLOTS: Record<
  SlotKey,
  {
    x: string; y: string; scale: number; opacity: number;
    zIndex: number; rotate: number; brightness: number; borderOpacity: number;
  }
> = {
  front: { x: "0%",   y: "0%",   scale: 1,    opacity: 1,    zIndex: 30, rotate: 0,  brightness: 1,    borderOpacity: 1   },
  mid:   { x: "7.6%", y: "5.5%", scale: 0.81, opacity: 0.70, zIndex: 20, rotate: 5,  brightness: 0.72, borderOpacity: 0.5 },
  back:  { x: "-6%",  y: "4%",   scale: 0.66, opacity: 0.42, zIndex: 10, rotate: -6, brightness: 0.48, borderOpacity: 0.2 },
};

const SLOT_CYCLE: SlotKey[] = ["front", "mid", "back"];

function advanceSlots(current: SlotKey[]): SlotKey[] {
  return current.map((slot) => SLOT_CYCLE[(SLOT_CYCLE.indexOf(slot) + 1) % 3]);
}

function bringToFront(current: SlotKey[], idx: number): SlotKey[] {
  let order = [...current];
  for (let guard = 0; guard < 3; guard++) {
    if (order[idx] === "front") return order;
    order = advanceSlots(order);
  }
  return order;
}

// ── Shared fade+rise variant ──────────────────────────────────────────────────
const fadeRise:  Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: "easeInOut" as any, delay },
  }),
};

// ── Carousel scale+fade variant ───────────────────────────────────────────────
const scaleFade = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: "easeInOut" as any },
  },
};

// ── useScrollOrLoad: triggers immediately if already in view on mount,
//   otherwise fires on scroll into view ────────────────────────────────────────
function useScrollOrLoad(ref: React.RefObject<Element>) {
  const inView = useInView(ref, { once: true, margin: "-80px 0px" });
  return inView;
}

const JewelCarousel = () => {
  const [slotOf, setSlotOf] = useState<SlotKey[]>(["front", "back", "mid"]);
  const [paused, setPaused]   = useState(false);
  const resumeRef             = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef            = useRef<HTMLDivElement>(null);
  const inView                = useScrollOrLoad(wrapperRef as React.RefObject<Element>);

  const clearResume = () => {
    if (resumeRef.current) { clearTimeout(resumeRef.current); resumeRef.current = null; }
  };
  const scheduleResume = (ms = 3500) => {
    clearResume();
    resumeRef.current = setTimeout(() => setPaused(false), ms);
  };

  const tick = useCallback(() => setSlotOf(advanceSlots), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, [paused, tick]);

  const handleCardClick = (idx: number) => {
    if (slotOf[idx] === "front") return;
    setSlotOf((prev) => bringToFront(prev, idx));
    setPaused(true);
    scheduleResume(3500);
  };

  return (
    <motion.div
      ref={wrapperRef}
      variants={scaleFade}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="
        relative w-full max-w-[790px]
        mx-auto xl:mx-0
        min-h-[280px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px] xl:min-h-0
        overflow-hidden
      "
      style={{ aspectRatio: "790 / 546" }}
      onMouseEnter={() => { clearResume(); setPaused(true); }}
      onMouseLeave={() => { clearResume(); setPaused(false); }}
    >
      <div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "58%", height: "58%",
          background: "radial-gradient(circle, rgba(201,168,76,0.16) 0%, transparent 68%)",
          top: "50%", left: "50%",
          transform: "translate(-50%,-52%)",
          zIndex: 1,
        }}
      />

      {slides.map((slide, idx) => {
        const slot = slotOf[idx];
        const s    = SLOTS[slot];
        return (
          <motion.div
            key={idx}
            onClick={() => handleCardClick(idx)}
            animate={{ x: s.x, y: s.y, scale: s.scale, opacity: s.opacity, rotate: s.rotate, zIndex: s.zIndex }}
            transition={{ duration: 0.78, ease: [0.42, 0, 0.18, 1.0] as any}}
            style={{
              width: "68%", aspectRatio: "540 / 546",
              position: "absolute", left: "16%", top: 0,
              borderRadius: 16,
              border: `3px solid rgba(201,168,76,${s.borderOpacity})`,
              overflow: "hidden",
              cursor: slot === "front" ? "default" : "pointer",
              transformOrigin: "center center",
              willChange: "transform, opacity",
              boxShadow:
                slot === "front" ? "0 36px 90px rgba(0,0,0,0.68), 0 0 0 1px rgba(201,168,76,0.28)"
                : slot === "mid"  ? "0 18px 44px rgba(0,0,0,0.44)"
                : "0 8px 22px rgba(0,0,0,0.28)",
            }}
          >
            <motion.img
              src={slide.src} alt={slide.alt} draggable={false}
              animate={{ filter: `brightness(${s.brightness})` }}
              transition={{ duration: 0.78, ease: "easeInOut" as any }}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", userSelect: "none", pointerEvents: "none" }}
            />
            {slot === "front" && (
              <div aria-hidden style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 55%)",
                pointerEvents: "none", borderRadius: 12,
              }} />
            )}
          </motion.div>
        );
      })}

      <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 8, zIndex: 40 }}>
        {slides.map((_, i) => {
          const active = slotOf[i] === "front";
          return (
            <button key={i} onClick={() => handleCardClick(i)} aria-label={`Show slide ${i + 1}`}
              style={{
                width: active ? 28 : 8, height: 8, borderRadius: 4,
                background: active ? "#C9A84C" : "rgba(201,168,76,0.32)",
                border: "none", padding: 0, cursor: "pointer",
                transition: "width 0.35s ease, background 0.35s ease",
              }}
            />
          );
        })}
      </div>

      <AnimatePresence>
        {paused && (
          <motion.span
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute", top: 16, right: 20, zIndex: 40,
              background: "rgba(10,10,10,0.6)", border: "1px solid rgba(201,168,76,0.45)",
              borderRadius: 20, padding: "4px 14px", color: "#C9A84C", fontSize: 10,
              letterSpacing: "0.14em", fontFamily: "'Cormorant Garamond', Georgia, serif",
              pointerEvents: "none", textTransform: "uppercase",
            }}
          >
            Paused
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const About = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const inView  = useScrollOrLoad(textRef as React.RefObject<Element>);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[47%_50%] xl:gap-[3%] gap-10 items-center">

          {/* ── Carousel: scale+fade ─────────────────────────────────────── */}
          <JewelCarousel />

          {/* ── Text: staggered fade+rise ────────────────────────────────── */}
          <div
            ref={textRef}
            className="flex flex-col gap-[20px] w-full max-w-[850px] mx-auto xl:mx-0"
          >
            <motion.h2
              variants={fadeRise}
              custom={0}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="
                font-playfair font-normal text-white leading-tight
                text-3xl sm:text-4xl md:text-5xl xl:text-[48px] 2xl:text-[56px]
              "
            >
              About Reyu Jewels
            </motion.h2>

            <div className="flex flex-col gap-[20px]">
              <motion.p
                variants={fadeRise}
                custom={0.18}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-old-standard font-normal text-gray-300 leading-relaxed text-base sm:text-lg 2xl:text-2xl"
              >
                At Reyu Jewels, we believe every diamond begins with a conscious
                choice. For over two decades, we have been redefining fine jewellery
                through expertly crafted lab-grown diamond creations that embody
                modern elegance, brilliance, and responsibility.
              </motion.p>

              <motion.p
                variants={fadeRise}
                custom={0.32}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-old-standard font-normal text-gray-300 leading-relaxed text-base sm:text-lg 2xl:text-2xl"
              >
                Our master artisans blend time-honored craftsmanship with advanced
                technology, transforming ethically created diamonds into stunning
                works of art. From precision-grown, conflict-free diamonds to the
                final flawless finish, every piece reflects our unwavering
                commitment to quality, transparency, and sustainability.
              </motion.p>

              <motion.p
                variants={fadeRise}
                custom={0.46}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="font-old-standard font-normal text-gray-300 leading-relaxed text-base sm:text-lg 2xl:text-2xl"
              >
                Whether you're envisioning a bespoke engagement ring, a custom
                necklace, or a meaningful piece to celebrate life's milestones, our
                dedicated team collaborates closely with you to bring your vision to
                life—beautifully, responsibly, and without compromise.
              </motion.p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;