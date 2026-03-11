import React, { useEffect, useState } from "react";
import "./Facility.css";
import FacilityData from "./FacilityData.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Facility = () => {
  const [slidesPerView, setSlidesPerView] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 480) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 768) {
        setSlidesPerView(2);
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(5);
      }
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="facility-section">
        <div className="facility-header">
          <span className="facility-tagline">Our Services</span>
          <h2 className="facility-heading">Alfalah Facilities</h2>
          <div className="facility-underline"></div>
        </div>

        <div className="facility-container">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={slidesPerView}
            navigation={window.innerWidth > 768} // Hide arrows on mobile
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="facility-swiper"
          >
            {FacilityData.map((facility, index) => (
              <SwiperSlide key={index}>
                <div className="facility-card">
                  <div className="facility-icon-wrapper">
                    <i className={`${facility.icon} facility-icon`}></i>
                  </div>
                  <div className="facility-card-body">
                    <h5 className="facility-card-title">{facility.title}</h5>
                    <p className="facility-card-description">
                      {facility.description ||
                        "Quality healthcare services at AGH Islamabad"}
                    </p>
                  </div>
                  <div className="facility-card-overlay"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Facility;
