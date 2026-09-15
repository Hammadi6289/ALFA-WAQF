import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { NavLink } from "react-router";
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.webp";
import banner3 from "../../assets/images/banner3.webp";
import banner4 from "../../assets/images/banner4.jpg";
import banner5 from "../../assets/images/banner5.webp";
import "./Slider.css";

const slides = [
  {
    image: banner1,
    eyebrow: "Welcome to Alfalah",
    heading: "Compassionate Care,\nClose to Home",
    sub: "Expert specialists and cutting-edge facilities, dedicated to your health and well-being.",
    cta: { label: "Book Appointment", to: "/doctors" },
  },
  {
    image: banner2,
    eyebrow: "Our Specialists",
    heading: "World-Class Doctors,\nPersonalised Treatment",
    sub: "A multidisciplinary team committed to delivering the highest standards of healthcare.",
    cta: { label: "Meet Our Doctors", to: "/doctors" },
  },
  {
    image: banner3,
    eyebrow: "Advanced Facilities",
    heading: "State-of-the-Art\nMedical Technology",
    sub: "Modern diagnostics and treatment equipment for accurate and effective care.",
    cta: { label: "Learn More", to: "/about" },
  },
  {
    image: banner4,
    eyebrow: "Community & Waqf",
    heading: "Healthcare Rooted\nin Giving Back",
    sub: "Your donations and trust enable us to serve every patient regardless of their means.",
    cta: { label: "Support Us", to: "/donate" },
  },
  {
    image: banner5,
    eyebrow: "Latest News",
    heading: "Stay Informed,\nStay Healthy",
    sub: "Read the latest health updates, hospital news and community announcements.",
    cta: { label: "Read News", to: "/news" },
  },
];

const Slider = () => {
  return (
    <section className="slider-section" aria-label="Hero image slider">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        spaceBetween={0}
        loop={true}
        autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{
          nextEl: ".slider-btn--next",
          prevEl: ".slider-btn--prev",
        }}
        pagination={{ el: ".slider-dots", clickable: true, bulletClass: "slider-dot", bulletActiveClass: "slider-dot--active" }}
        className="main-slider"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-wrapper">
              {/* Background image */}
              <img
                src={slide.image}
                alt={slide.heading.replace("\n", " ")}
                className="slider-image"
                loading={index === 0 ? "eager" : "lazy"}
              />

              {/* Dark gradient overlay */}
              <div className="slide-overlay" aria-hidden="true" />

              {/* Text content */}
              <div className="slide-content">
                <span className="slide-eyebrow">{slide.eyebrow}</span>
                <h2 className="slide-heading">
                  {slide.heading.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < slide.heading.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
                <p className="slide-sub">{slide.sub}</p>
                <NavLink to={slide.cta.to} className="slide-cta">
                  {slide.cta.label}
                  <span className="slide-cta__arrow" aria-hidden="true">→</span>
                </NavLink>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom navigation arrows */}
      <button className="slider-btn slider-btn--prev" aria-label="Previous slide">
        ‹
      </button>
      <button className="slider-btn slider-btn--next" aria-label="Next slide">
        ›
      </button>

      {/* Pagination dots */}
      <div className="slider-dots" role="tablist" aria-label="Slide navigation" />
    </section>
  );
};

export default Slider;
