import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, Palette, Settings, Package } from "lucide-react";

const steps = [
  {
    label: "Share Shape or Reference",
    heading: "Customize Your Own Shape",
    description:
      "From classic rounds to fancy one-of-a-kind shapes — we manufacture diamonds exactly the way you want, with calibrated sizes, premium make, with IGI certification upon request.",
    icon: Upload,
  },
  {
    label: "Approve mm Size & Ratio",
    heading: "Precision in Every Millimetre",
    description:
      "We provide exact millimetre specifications for your approval before manufacturing begins. Every ratio is calibrated to maximize brilliance and ensure a perfect fit.",
    icon: CheckCircle,
  },
  {
    label: "Select Color & Clarity",
    heading: "Handpicked Quality, Every Time",
    description:
      "Choose from D–Z color grades and FL–SI clarity ranges. Our gemologists guide you to the ideal combination that balances beauty, certification, and value.",
    icon: Palette,
  },
  {
    label: "Manufacturing Begins",
    heading: "Crafted With Master Precision",
    description:
      "Once confirmed, our artisans begin the lab-growth process using advanced CVD or HPHT technology — producing conflict-free diamonds of unmatched consistency.",
    icon: Settings,
  },
  {
    label: "Delivery & Certification",
    heading: "Certified, Delivered, Secured",
    description:
      "Your diamond arrives with an official IGI certificate and our premium packaging — insured, tracked, and ready to be treasured for a lifetime.",
    icon: Package,
  },
];

const contentVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.4, 0, 0.2, 1] as any } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as any } },
};

const Trust = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 mt-[-150px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left panel: animated content ── */}
          <div className="
            w-full max-w-[658px]
            2xl:w-[658px]
            min-h-[200px] md:min-h-[194px] 2xl:h-[194px]
            mx-auto md:mx-0
            flex items-start
          ">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col gap-3 w-full"
              >
                <h2 className="font-playfair font-normal text-white leading-tight text-2xl sm:text-3xl md:text-[32px] lg:text-[36px]">
                  {steps[activeIdx].heading}
                </h2>
                <p className="font-old-standard text-gray-300 leading-relaxed text-sm sm:text-[15px] md:text-base">
                  {steps[activeIdx].description}
                </p>
                <motion.a
                  href="#contact"
                  whileHover={{ backgroundColor: "rgba(206,165,116,0.12)" }}
                  transition={{ duration: 0.25 }}
                  className="mt-1 self-start font-offside text-[#CEA574] text-sm border border-[#CEA574] rounded-full px-4 py-[6px] leading-none"
                >
                  Get in touch
                </motion.a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right panel: step list ── */}
          <div className="flex flex-col items-center md:items-start">
            
            {/* Title Centered over the grid width (32px pill + 16px gap + 523px card = ~571px) */}
            <div className="w-full max-w-[571px] flex justify-center mb-6">
              <p className="font-playfair text-2xl md:text-3xl lg:text-[36px] text-white">
                How It Works
              </p>
            </div>

            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[571px]">
              {steps.map((step, index) => {
                const isActive = index === activeIdx;
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4 cursor-pointer"
                    onHoverStart={() => setActiveIdx(index)} // Restored Hover Logic
                  >
                    {/* Step number — oval pill */}
                    <motion.div
                      animate={{
                        backgroundColor: isActive
                          ? "rgba(206,165,116,0.6)"
                          : "rgba(206,165,116,0.50)",
                        borderColor: isActive ? "#CEA574" : "rgba(206,165,116,0.45)",
                        scale: isActive ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" as any}}
                      className="shrink-0 flex items-center justify-center border font-offside text-sm"
                      style={{
                        width: 32,
                        height: 45,
                        borderRadius: 21,
                        color: isActive ? "#CEA574" : "rgba(255,255,255,0.75)",
                        padding: 10,
                      }}
                    >
                      {index + 1}
                    </motion.div>

                    {/* Step card */}
                    <motion.div
                      animate={{
                        backgroundColor: isActive ? "rgba(206,165,116,0.12)" : "#353535",
                        boxShadow: isActive
                          ? "0 0 24px rgba(206,165,116,0.18), inset 0 0 12px rgba(206,165,116,0.06)"
                          : "none",
                        y: isActive ? -2 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" as any }}
                      className="flex-1 flex items-center justify-between px-4 sm:px-5"
                      style={{
                        height: 90,
                        borderRadius: 16,
                        border: "4px solid #CEA574",
                      }}
                    >
                      <motion.p
                        animate={{ color: isActive ? "#CEA574" : "rgba(206,165,116,0.65)" }}
                        transition={{ duration: 0.3 }}
                        className="font-offside text-sm md:text-base"
                      >
                        {step.label}
                      </motion.p>

                      {/* Icon — oval pill */}
                      <motion.div
                        animate={{
                          backgroundColor: isActive
                            ? "rgba(206,165,116,0.6)"
                            : "rgba(206,165,116,0.50)",
                          borderColor: isActive ? "#CEA574" : "rgba(206,165,116,0.45)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0 flex items-center justify-center border"
                        style={{
                          width: 32,
                          height: 45,
                          borderRadius: 21,
                          padding: 10,
                        }}
                      >
                        <Icon
                          size={16}
                          color={isActive ? "#fff" : "rgba(206,165,116,0.85)"}
                        />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[1px] bg-[#CEA574]/40 mt-[100px]" />
      </div>
    </section>
  );
};

export default Trust;