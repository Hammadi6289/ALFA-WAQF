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
      {/* Decorative background blobs */}
      <div className="reviews-bg-blob reviews-bg-blob--1" aria-hidden="true" />
      <div className="reviews-bg-blob reviews-bg-blob--2" aria-hidden="true" />

      <div className="reviews-container">
        {/* Section Header */}
        <div className="reviews-header">
          <span className="reviews-tagline">Testimonials</span>
          <h2 className="reviews-title">
            What Our Patients
            <span className="reviews-title__highlight"> Say About Us</span>
          </h2>
          <p className="reviews-title__sub">
            Real experiences from real patients — we're proud to serve our
            community with compassionate, world-class care.
          </p>
          <div className="title-underline" />
        </div>

        {/* Aggregate rating row */}
        <div className="reviews-aggregate">
          <div className="reviews-aggregate__stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="star filled" />
            ))}
          </div>
          <span className="reviews-aggregate__score">4.8 / 5</span>
          <span className="reviews-aggregate__count">
            Based on {ReviewData.length}+ patient reviews
          </span>
        </div>

        {/* Reviews Slider */}
        <div className="reviews-slider-wrapper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={28}
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
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="reviews-swiper"
          >
            {ReviewData.map((review, index) => (
              <SwiperSlide key={review.id || index}>
                <div className="review-card">
                  {/* Large decorative quote */}
                  <div className="review-quote-icon" aria-hidden="true">
                    <FaQuoteLeft />
                  </div>

                  {/* Star Rating */}
                  <div className="review-stars" aria-label={`Rating: ${review.rating} out of 5`}>
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
                    <span className="review-rating-num">{review.rating}.0</span>
                  </div>

                  {/* Comment title */}
                  {review.commentTitle && (
                    <h3 className="review-title">{review.commentTitle}</h3>
                  )}

                  {/* Review Content — fixed JSX expression bug */}
                  <p className="review-description">
                    {review.commentDescription || review.comment}
                  </p>

                  {/* Patient Info */}
                  <div className="reviewer-info">
                    <div className="reviewer-avatar-wrap">
                      <span className="reviewer-initials" aria-hidden="true">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                    <div className="reviewer-details">
                      <h4 className="reviewer-name">{review.name}</h4>
                      {review.address && (
                        <p className="reviewer-location">📍 {review.address}</p>
                      )}
                    </div>

                    {/* Verified Badge */}
                    <div className="verified-badge" title="Verified Patient">
                      <span className="verified-icon" aria-hidden="true">✓</span>
                    </div>
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
            <span className="google-icon" aria-hidden="true">⭐</span>
            See All Google Reviews
            <span className="arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PatientReviewsBlock;
