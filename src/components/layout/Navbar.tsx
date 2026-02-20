import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/images/logo.png";

const NAV_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Diamonds", href: "#diamonds" },
  { label: "Collection", href: "#collection" },
  { label: "Services", href: "#services" },
  { label: "Certificates", href: "#certificates" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1️⃣ Scroll Management: Debounced-style scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2️⃣ Prevent scroll-leak: Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  return (
    <header>
      {/* ── Main Navigation ── */}
      <nav
        aria-label="Main Navigation"
        className={`
    fixed top-0 left-0 w-full z-50
    transition-all duration-500 ease-in-out
    ${
      scrolled
        ? "bg-[#0A0A0A]/95 backdrop-blur-lg py-3 md:py-4"
        : "bg-transparent py-5 md:py-8"
    }
    relative overflow-hidden
  `}
      >
        {/* 🌟 Radial Glow Overlay */}
        {scrolled && (
          <div
            className="
        absolute inset-0 pointer-events-none
        bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0)_100%)]
        opacity-60
      "
          />
        )}

        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between">
          {/* Logo Section */}
          <a
            href="/"
            className="relative z-50 shrink-0 transition-transform active:scale-95"
            aria-label="Reyu Jewels Home"
          >
            <img
              src={logo}
              alt="Reyu Jewels"
              className="h-8 md:h-10 lg:h-12 w-auto object-contain"
            />
          </a>

          {/* ── Desktop Menu ── */}
          <div className="hidden lg:flex items-center gap-10 xl:gap-14">
            <div className="flex items-center gap-8 xl:gap-10">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-offside text-[15px] xl:text-[16px] text-white/80 hover:text-[#CEA574] tracking-wider transition-all duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#CEA574] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-6 border-l border-white/10 pl-10">
              <a
                href="#signup"
                className="font-offside text-[15px] text-white/90 hover:text-[#CEA574] transition-colors"
              >
                Sign Up
              </a>
              <a
                href="#contact"
                className="
                  font-offside text-[15px] text-[#0A0A0A] bg-[#CEA574] 
                  px-7 py-2.5 rounded-full hover:bg-white transition-all duration-500
                "
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-[7px]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
              className="w-7 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={
                mobileOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }
              }
              className="w-7 h-[1.5px] bg-white rounded-full"
            />
            <motion.span
              animate={
                mobileOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }
              }
              className="w-7 h-[1.5px] bg-white rounded-full"
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] lg:hidden flex flex-col px-10 pt-32 pb-10"
          >
            <div className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setMobileOpen(false)}
                  className="font-playfair text-3xl text-white/90 hover:text-[#CEA574]"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-5">
              <a
                href="#signup"
                className="text-center font-offside text-lg text-white border border-white/20 py-4 rounded-full"
              >
                Sign Up
              </a>
              <a
                href="#contact"
                className="text-center font-offside text-lg text-[#0A0A0A] bg-[#CEA574] py-4 rounded-full"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
