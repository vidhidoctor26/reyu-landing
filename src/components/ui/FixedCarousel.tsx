import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import img1 from "@/assets/images/image1.png";
import img2 from "@/assets/images/image2.png";
import img3 from "@/assets/images/image3.png";

// Figma: w=540 h=810 → aspect ratio 540:810 = 2:3
// w-full + aspect-[2/3] makes it fluid at every viewport while keeping the
// exact Figma proportions. max-w-[540px] caps it at the Figma size on desktop.

const FixedCarousel = () => {
  return (
    <div className="w-full max-w-[540px] mx-auto relative overflow-hidden rounded-[16px]">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full aspect-[2/3]"
      >
        <SwiperSlide className="w-full aspect-[2/3]">
          <img
            src={img1}
            alt="Slide 1"
            className="w-full h-full object-cover block"
          />
        </SwiperSlide>

        <SwiperSlide className="w-full aspect-[2/3]">
          <img
            src={img2}
            alt="Slide 2"
            className="w-full h-full object-cover block"
          />
        </SwiperSlide>

        <SwiperSlide className="w-full aspect-[2/3]">
          <img
            src={img3}
            alt="Slide 3"
            className="w-full h-full object-cover block"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default FixedCarousel;