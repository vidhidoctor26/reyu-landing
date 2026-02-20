import First from "@/assets/images/first.png";
import image12 from "@/assets/images/image 12.png";
import image9 from "@/assets/images/image 9.png";
import image4 from "@/assets/images/image 4.png";
import image5 from "@/assets/images/image 5.png";
import image6 from "@/assets/images/image 6.png";
import image7 from "@/assets/images/image 7.png";
import image8 from "@/assets/images/image 8.png";
import image10 from "@/assets/images/image 10.png";
import image11 from "@/assets/images/image 11.png";
import image15 from "@/assets/images/image 15.png";

const shapeImages = [
  { src: First, alt: "Round" },
  { src: image12, alt: "Princess" },
  { src: image9, alt: "Cushion" },
  { src: image4, alt: "Oval" },
  { src: image5, alt: "Emerald" },
  { src: image6, alt: "Pear" },
  { src: image7, alt: "Marquise" },
  { src: image8, alt: "Radiant" },
  { src: image10, alt: "Asscher" },
  { src: image15, alt: "Heart" },
  { src: image11, alt: "Trillion" },
];

const Shapes = () => {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 mt-[-150px]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
            {shapeImages.map((shape, i) => (
              <div
                key={i}
                className="
                    group
                    w-full aspect-square
                    2xl:w-[150px] 2xl:h-[150px]
                    rounded-[16px]
                    border-[3px] border-[#CEA574]
                    overflow-hidden
                    bg-[#E6CDB3]
                    cursor-pointer
                    transition-all duration-300 ease-in-out
                    hover:scale-105
                    hover:shadow-[0_0_25px_rgba(206,165,116,0.6)]
                  "
              >
                <img
                  src={shape.src}
                  alt={shape.alt}
                  className="
                    w-full h-full object-cover block
                    transition-transform duration-500 ease-in-out
                    group-hover:scale-110
                  "
                />
              </div>
            ))}
          </div>

          {/* Text */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="font-playfair font-normal text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-tight text-white">
              Shapes we Offer
            </h2>
            <p className="font-old-standard text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-300">
              Discover beautifully crafted lab-grown diamond cuts, designed for
              modern elegance and conscious luxury.
            </p>
          </div>
        </div>
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen h-[1px] bg-[#CEA574]/40 mt-[100px]" />
      </div>
    </section>
  );
};

export default Shapes;
