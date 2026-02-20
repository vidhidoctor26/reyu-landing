import { useRef } from "react";
import { motion, useInView, cubicBezier, type Variants } from "framer-motion";
import image2 from "@/assets/images/image 2.png";
import image3 from "@/assets/images/image 3.png";

function useScrollOrLoad(ref: React.RefObject<Element>) {
  return useInView(ref, { once: true, margin: "-80px 0px" });
}

const fadeRise: Variants= {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) as any, delay },
  }),
};

// const slideFromLeft: Variants = {
//   hidden: { opacity: 0, x: -72 },
//   visible: {
//     opacity: 1, x: 0,
//     transition: { duration: 0.85, ease: cubicBezier(0.22, 1, 0.36, 1), delay: 0.15 },
//   },
// };

// const slideFromRight: Variants = {
//   hidden: { opacity: 0, x: 72 },
//   visible: {
//     opacity: 1, x: 0,
//     transition: { duration: 0.85, ease: cubicBezier(0.22, 1, 0.36, 1), delay: 0.3 },
//   },
// };

const ShimmerText = ({ text, inView }: { text: string; inView: boolean }) => (
  <div className="relative inline-block overflow-hidden">
    <p className="font-offside text-lg md:text-2xl text-[#CEA574] leading-none select-none">
      {text}
    </p>
    <motion.span
      aria-hidden
      initial={{ x: "-110%" }}
      animate={inView ? { x: "210%" } : { x: "-110%" }}
      transition={{ duration: 1.1, ease: "easeInOut" as any, delay: 0.25 }}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(105deg, transparent 30%, rgba(255,235,160,0.82) 50%, transparent 70%)",
        mixBlendMode: "screen",
        pointerEvents: "none",
        borderRadius: 2,
      }}
    />
  </div>
);

const GlassImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="relative overflow-hidden rounded-[16px] border-b-4 border-[#CEA574] shrink-0 group/img">
    {/* Image — subtle scale on hover adds depth */}
    <img
      src={src}
      alt={alt}
      className="
        w-full aspect-[600/348] object-cover block rounded-[16px]
        transition-transform duration-700 ease-out
        group-hover/img:scale-[1.03]
      "
    />

    {/* Layer 1 — Primary diagonal reflection streak */}
    <div
      aria-hidden
      className="
        absolute inset-0 rounded-[16px] pointer-events-none
        opacity-0 group-hover/img:opacity-100
        transition-opacity duration-500 ease-out
      "
      style={{
        background:
          "linear-gradient(118deg, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.08) 30%, transparent 54%)",
      }}
    />

    {/* Layer 2 — Thin facet-edge catch (narrow bright band) */}
    <div
      aria-hidden
      className="
        absolute inset-0 rounded-[16px] pointer-events-none
        opacity-0 group-hover/img:opacity-100
        transition-opacity duration-700 ease-out delay-75
      "
      style={{
        background:
          "linear-gradient(135deg, transparent 36%, rgba(255,255,255,0.18) 42%, rgba(255,255,255,0.05) 48%, transparent 54%)",
      }}
    />

    {/* Layer 3 — Bottom table sheen (cool blue-white bounce light) */}
    <div
      aria-hidden
      className="
        absolute bottom-0 left-0 right-0 h-[40%] rounded-b-[16px] pointer-events-none
        opacity-0 group-hover/img:opacity-100
        transition-opacity duration-600 ease-out delay-100
      "
      style={{
        background:
          "linear-gradient(to top, rgba(190,215,255,0.12) 0%, rgba(190,215,255,0.04) 55%, transparent 100%)",
      }}
    />

    {/* Layer 4 — Inset gold rim glow (warm reflection from the setting) */}
    <div
      aria-hidden
      className="
        absolute inset-0 rounded-[16px] pointer-events-none
        opacity-0 group-hover/img:opacity-100
        transition-opacity duration-500 ease-out
      "
      style={{
        boxShadow: "inset 0 0 32px rgba(201,168,76,0.14)",
      }}
    />
  </div>
);

// ── Staggered fade+rise for cards (mirrors About paragraphs) ──────────────────
const cardFadeRise = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: cubicBezier(0.22, 1, 0.36, 1) as any, delay },
  }),
};

// ── Main component ─────────────────────────────────────────────────────────────
const DiamondComparison = () => {
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const headingInView = useScrollOrLoad(headingRef as React.RefObject<Element>);
  const cardsInView   = useScrollOrLoad(cardsRef   as React.RefObject<Element>);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 2xl:pl-[249px] 2xl:pr-[249px]">

        {/* ── Heading ─────────────────────────────────────────────────────── */}
        <div
          ref={headingRef}
          className="flex flex-col items-center gap-3 mb-12 md:mb-16 lg:mb-20"
        >
          <motion.div
            variants={fadeRise}
            custom={0}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
          >
            <ShimmerText text="Lab-Grown Excellence" inView={headingInView} />
          </motion.div>

          <motion.h1
            variants={fadeRise}
            custom={0.18}
            initial="hidden"
            animate={headingInView ? "visible" : "hidden"}
            className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white text-center"
          >
            CVD & HPHT Diamond
          </motion.h1>
        </div>

        {/* ── Cards ───────────────────────────────────────────────────────── */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-[223px] w-full max-w-[1423px] mx-auto"
        >
          {/* CVD — fade + rise, first */}
          <motion.div
            variants={cardFadeRise}
            custom={0.1}
            initial="hidden"
            animate={cardsInView ? "visible" : "hidden"}
            className="
              group
              w-full 2xl:max-w-[600px] 2xl:h-[732px]
              bg-[#272727] border-4 border-[#CEA574] rounded-[16px]
              overflow-hidden flex flex-col
              transition-all duration-500 ease-out
              hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(206,165,116,0.25)]
            "
          >
            <GlassImage src={image2} alt="CVD diamond" />

            <div className="flex flex-col flex-1 px-[24px] pt-[24px] pb-[24px]">
              <p className="font-playfair font-normal text-[32px] leading-none text-white">
                CVD Diamonds
              </p>
              <p className="text-[#CEA574] font-offside text-base mt-[8px]">
                Chemical Vapor Deposition
              </p>
              <p className="font-old-standard text-base text-gray-300 leading-relaxed mt-[17px] max-w-[550px]">
                Created in controlled laboratory environments, CVD diamonds
                deliver authentic sparkle, superior hardness, and certified
                quality, providing an eco-friendly, conflict-free alternative to
                traditional mining while maintaining timeless elegance,
                durability, transparency, and accessible luxury for conscious
                consumers.
              </p>
              <div className="flex justify-between mt-auto pt-4">
                <div>
                  <p className="text-[#CEA574] font-offside text-[20px]">High</p>
                  <p className="text-[#BABABA] font-offside text-[14px] mt-[8px]">Clarity & Purity</p>
                </div>
                <div className="text-right">
                  <p className="text-[#CEA574] font-offside text-[20px]">Eco-Friendly</p>
                  <p className="text-[#BABABA] font-offside text-[14px] mt-[8px]">Sustainable Process</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* HPHT — fade + rise, staggered */}
          <motion.div
            variants={cardFadeRise}
            custom={0.28}
            initial="hidden"
            animate={cardsInView ? "visible" : "hidden"}
            className="
              group
              w-full 2xl:max-w-[600px] 2xl:h-[732px]
              bg-[#272727] border-4 border-[#CEA574] rounded-[16px]
              overflow-hidden flex flex-col
              transition-all duration-500 ease-out
              hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(206,165,116,0.25)]
            "
          >
            <GlassImage src={image3} alt="HPHT diamond" />

            <div className="flex flex-col flex-1 px-[24px] pt-[24px] pb-[24px]">
              <p className="font-playfair font-normal text-[32px] leading-none text-white">
                HPHT Diamonds
              </p>
              <p className="text-[#CEA574] font-offside text-base mt-[8px]">
                High Pressure High Temperature
              </p>
              <p className="font-old-standard text-base text-gray-300 leading-relaxed mt-[17px] max-w-[550px]">
                Created under intense pressure and heat, HPHT diamonds offer
                authentic chemical composition, stunning brilliance, certified
                quality, and responsible origins, providing a conflict-free,
                eco-conscious alternative to mined diamonds while maintaining
                timeless luxury and durability.
              </p>
              <div className="flex justify-between mt-auto pt-4">
                <div>
                  <p className="text-[#CEA574] font-offside text-[20px]">Exceptional</p>
                  <p className="text-[#BABABA] font-offside text-[14px] mt-[8px]">Color & Brilliance</p>
                </div>
                <div className="text-right">
                  <p className="text-[#CEA574] font-offside text-[20px]">Certified</p>
                  <p className="text-[#BABABA] font-offside text-[14px] mt-[8px]">Quality Assured</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[1px] bg-[#CEA574]/40 mt-[100px]" />
      </div>
    </section>
  );
};

export default DiamondComparison;