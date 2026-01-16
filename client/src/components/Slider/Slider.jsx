import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";

const Slider = () => {
  const images = [banner1, banner2, banner3, banner4];
  return (
    <>
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
        fadeEffect={{ crossFade: true }}
      >
        {images.map((data, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={data}
                alt="banners"
                style={{ height: "550px", width: "100%", objectFit: "cover" }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Slider;
