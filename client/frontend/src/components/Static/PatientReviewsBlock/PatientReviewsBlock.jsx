import React from "react";
import "./PatientReviewsBlock.css";
import ReviewData from "./PatientReviews.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaStarHalfAlt, FaQuoteLeft } from "react-icons/fa";

const PatientReviewsBlock = () => {
  return (
    <section className="reviews-section">
      <div className="reviews-container">
        {/* Section Header */}
        <div className="reviews-header">
          <span className="reviews-tagline">Testimonials</span>
          <h2 className="reviews-title">What Our Patients</h2>
          <h2 className="reviews-title highlight">Say About Us</h2>
          <div className="title-underline"></div>
        </div>

        {/* Reviews Slider */}
        <div className="reviews-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="reviews-swiper"
          >
            {ReviewData.map((review, index) => (
              <SwiperSlide key={review.id || index}>
                <div className="review-card">
                  {/* Quote Icon */}
                  <div className="review-quote-icon">
                    <FaQuoteLeft />
                  </div>

                  {/* Star Rating */}
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => {
                      const starValue = i + 1;
                      if (review.rating >= starValue) {
                        return <FaStar key={i} className="star filled" />;
                      } else if (review.rating >= starValue - 0.5) {
                        return <FaStarHalfAlt key={i} className="star half" />;
                      } else {
                        return <FaStar key={i} className="star empty" />;
                      }
                    })}
                  </div>

                  {/* Review Content */}
                  <p className="review-description">
                    "{review.commentDescription || review.comment}"
                  </p>

                  {/* Patient Info */}
                  <div className="reviewer-info">
                    <img
                      src={review.pic}
                      alt={review.name}
                      className="reviewer-avatar"
                    />
                    <div className="reviewer-details">
                      <h4 className="reviewer-name">{review.name}</h4>
                      <p className="reviewer-location">{review.address}</p>
                    </div>
                  </div>

                  {/* Verified Badge */}
                  <div className="verified-badge">
                    <span className="verified-icon">✓</span>
                    <span>Verified Patient</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Google Reviews Link */}
        <div className="google-reviews-link">
          <a
            href="https://www.google.com/search?sca_esv=8f19c72cf42aa264&sxsrf=ANbL-n6dJWLpfpJclGbJlOFsIiz738ZnZw:1774435338013&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOdXje_FNoWNYl2be466AzlZFCjyUPEyIzPS00O_EWhCEqE1LVAscmvuvWhc5OA4RmafXY6fuRkIGAGDkzWB-WzUdCkqmT8ZEzY4__USJ3I1DAam7qg%3D%3D&q=Alfalah+General+Hospital+Reviews&sa=X&ved=2ahUKEwju7P7f7rqTAxXm2gIHHbG0A4wQ0bkNegQIJBAH&biw=1536&bih=714&dpr=1.25"
            target="_blank"
            rel="noopener noreferrer"
            className="google-btn"
          >
            <span className="google-icon">⭐</span>
            See All Google Reviews
            <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PatientReviewsBlock;
