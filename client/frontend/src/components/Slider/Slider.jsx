import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade } from "swiper/modules";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";
import "./Slider.css";

const Slider = () => {
  const images = [banner1, banner2, banner3, banner4];
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        effect="fade"
        spaceBetween={10}
        loop={true}
        autoplay={{ delay: 1000, pauseOnMouseEnter: true }}
        fadeEffect={{ crossFade: true }}
        className="main-slider"
      >
        {images.map((data, index) => (
          <SwiperSlide key={index}>
            <img
              src={data}
              alt={`banner ${index + 1}`}
              className="slider-image"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Slider;
