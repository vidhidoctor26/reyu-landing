import image16 from "@/assets/images/image 16.png";
import expandIcon from "@/assets/images/expand.png";

const certData = [
  "Lab-Grown Diamond Certification – 3.02 Carat Marquise",
  "Lab-Grown Diamond Certification – 0.30 Carat Round",
  "Lab-Grown Diamond Certification – 5.01 Carat Round Brilliant",
  "Lab-Grown Diamond Certification – 3.51 Carat Oval Brilliant",
  "Lab-Grown Diamond Certification – 0.30 Carat Round",
  "Lab-Grown Diamond Certification – 5.01 Carat Round Brilliant",
];

// Helper: fetch image → blob → trigger browser download
const downloadImage = async (src: string, filename: string) => {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch {
    // Fallback: open in new tab if fetch fails (e.g. CORS)
    window.open(src, "_blank");
  }
};

const Certifications = () => {
  return (
    <section className="w-full bg-[#2A2A2A] mt-[-120px]">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-[120px] py-16 md:py-20 lg:py-[120px]">

        {/* ── Top label ───────────────────────────────── */}
        <p className="
          font-offside text-[#CEA574] text-center leading-none
          text-base sm:text-lg md:text-xl lg:text-2xl
          mb-4
        ">
          We Believe in Transparency
        </p>

        {/* ── Main heading ───────────────────────────── */}
        <h2 className="
          font-playfair font-normal text-white text-center leading-[100%]
          text-3xl sm:text-4xl md:text-5xl lg:text-[56px]
          mt-3 mb-6
        ">
          Our Certifications
        </h2>

        {/* ── Description ───────────────────────────── */}
        <p className="
          font-old-standard text-white text-center leading-relaxed
          text-base sm:text-lg md:text-xl lg:text-2xl
          max-w-[1063px] mx-auto
          mb-12 md:mb-16 lg:mb-[100px]
        ">
          We are proud to showcase our certifications and accreditations that
          demonstrate our commitment to quality, authenticity, and excellence
          in every piece we create.
        </p>

        {/* ── Certificate Grid ───────────────────────── */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-x-6 sm:gap-x-8 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-[134px]
          gap-y-10 md:gap-y-12 lg:gap-y-[64px]
        ">
          {certData.map((label, i) => (
            <div
              key={i}
              className="
                group
                flex flex-col gap-[18px]
                transition-all duration-300
                hover:-translate-y-2
              "
            >
              {/* Image Card */}
              <div className="
                relative
                w-full aspect-[431/259]
                2xl:w-[431px] 2xl:h-[259px]
                bg-white
                border-[4px] border-[#CEA574]
                rounded-[16px]
                overflow-hidden
                transition-all duration-300
                group-hover:border-[#F3C98B]
                group-hover:shadow-[0_20px_60px_rgba(206,165,116,0.35)]
              ">

                {/* Certificate Image */}
                <img
                  src={image16}
                  alt={label}
                  className="
                    w-full h-full object-cover block
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />

                {/* Bottom Gradient Overlay */}
                <div className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black/40
                  via-black/10
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity duration-300
                " />

                {/* Expand / Download Icon Button */}
                <button
                  onClick={() =>
                    downloadImage(
                      image16,
                      `certificate-${i + 1}.png`
                    )
                  }
                  aria-label={`Download ${label}`}
                  className="
                    absolute bottom-4 right-4
                    w-10 h-10
                    bg-white/20 backdrop-blur-md
                    border border-white/30
                    rounded-md
                    flex items-center justify-center
                    opacity-0
                    group-hover:opacity-100
                    transition-all duration-300
                    hover:scale-110
                    cursor-pointer
                  "
                >
                  <img
                    src={expandIcon}
                    alt="Download"
                    className="w-6 h-6"
                  />
                </button>

              </div>

              {/* Label */}
              <p className="
                font-old-standard text-white leading-snug w-full
                text-base md:text-lg lg:text-xl 2xl:text-2xl
                transition-opacity duration-300
                group-hover:opacity-90
              ">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Full Width Divider Line */}
        <div className="
          relative
          left-1/2 right-1/2
          -ml-[50vw] -mr-[50vw]
          w-screen h-[1px]
          bg-[#CEA574]/40
          mt-[100px]
        " />

      </div>
    </section>
  );
};

export default Certifications;