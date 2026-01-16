import React from "react";
import "./KeyFactsBlock.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";
import banner4 from "../../../assets/images/banner4.jpg";

const keyFacts = [
  {
    icon: banner1,
    text: "Over 120,000 patients treated across outpatient and inpatient services in Islamabad",
  },
  {
    icon: banner2,
    text: "More than 18,000 successful surgical procedures performed by specialist consultants",
  },
  {
    icon: banner3,
    text: "24/7 emergency and trauma care serving patients from Islamabad and nearby regions",
  },
  {
    icon: banner4,
    text: "Comprehensive maternity and neonatal care with over 6,500 safe deliveries annually",
  },
  {
    icon: banner2,
    text: "Advanced diagnostic services including MRI, CT scan, and digital laboratories",
  },
  {
    icon: banner3,
    text: "Critical care units equipped with modern ICUs and round-the-clock medical staff",
  },
];

const KeyFactsBlock = () => {
  return (
    <section className="key-facts">
      <div className="key-facts__wrapper">
        <h2 className="key-facts__title">Our History in Numbers</h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 1000 }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {keyFacts.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="key-facts__card">
                <div className="key-facts__icon">
                  <img src={item.icon} alt="" />
                </div>
                <p className="key-facts__text">{item.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default KeyFactsBlock;
