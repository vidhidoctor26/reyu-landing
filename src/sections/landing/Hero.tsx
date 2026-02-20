import diamondImage from "@/assets/images/diamond.png";

const Hero = () => {
  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes riseUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-heading {
          animation: slideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 0.1s;
        }

        .hero-subheading {
          animation: slideUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 0.35s;
        }

        .hero-diamond-wrapper {
          animation: riseUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
          animation-delay: 0.55s;
        }
      `}</style>

      <section className="w-full bg-[#2A2A2A] flex items-center justify-center overflow-hidden pt-[160px] pb-0">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Heading */}
          <h1
            className="
              hero-heading
              font-playfair
              font-normal
              text-4xl
              sm:text-5xl
              md:text-7xl
              lg:text-[108px]
              leading-[1]
              tracking-normal
              text-white
            "
          >
            Eternal, In Every Facet
          </h1>

          {/* Subheading */}
          <p
            className="
              hero-subheading
              mt-6
              md:mt-8
              font-old-standard
              font-normal
              text-base
              sm:text-lg
              md:text-2xl
              leading-relaxed
              tracking-normal
              text-white
              text-center
            "
          >
            Fine diamonds crafted with uncompromising precision and enduring
            beauty.
          </p>

          {/* Diamond Image */}
          <div className="hero-diamond-wrapper relative w-full flex justify-center mt-16 md:mt-24">

            {/* Outer ambient glow */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: "10%",
                width: "70%",
                height: "70%",
                background:
                  "radial-gradient(ellipse at 50% 60%, rgba(200,220,255,0.18) 0%, rgba(180,200,255,0.08) 40%, transparent 70%)",
                filter: "blur(32px)",
                pointerEvents: "none",
              }}
            />

            {/* Mid glow */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                top: "5%",
                width: "50%",
                height: "55%",
                background:
                  "radial-gradient(ellipse at 50% 55%, rgba(220,235,255,0.22) 0%, rgba(200,220,255,0.10) 45%, transparent 70%)",
                filter: "blur(18px)",
                pointerEvents: "none",
              }}
            />

            {/* Bottom surface glow */}
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{
                bottom: "28%",
                width: "40%",
                height: "12%",
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(210,225,255,0.30) 0%, rgba(180,200,255,0.10) 60%, transparent 100%)",
                filter: "blur(14px)",
                pointerEvents: "none",
              }}
            />

            {/* Diamond image */}
            <img
              src={diamondImage}
              alt="Diamond"
              className="
                relative z-10
                w-[60vw]
                max-w-[868px]
                min-w-[240px]
                h-auto
                object-contain
              "
            />

            {/* Bottom fade-out gradient */}
            <div
              className="
                absolute bottom-0 left-0 w-full z-20
                h-[55%]
                bg-gradient-to-t
                from-[#2A2A2A]
                via-[#2A2A2A]/70
                to-transparent
              "
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;