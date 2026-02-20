import React from "react";
import "./PatientReviewsBlock.css";
import ReviewData from "./PatientReviews.json";

const PatientReviewsBlock = () => {
  return (
    <>
      <div className="review-container">
        <div className="review-heading-container">
          <span>Testimonial</span>
          <h2>What Our Patients</h2>
          <h2>Says About Us</h2>
        </div>
        {/* Patients reviews on Google*/}
        <div className="patient-reviews-container">
          {ReviewData.map((review, index) => {
            return (
              <div className="col-md-3" key={review.id}>
                <img src={review.pic} alt="userpicture" width={"100px"} />
                <p>{review.name}</p>
                <p>{review.address}</p>
                <div className="d-flex flex-row">
                  <h6 className="icon">
                    <span className="fas fa-star active-star"></span>
                    <span className="fas fa-star active-star"></span>
                    <span className="fas fa-star active-star"></span>
                    <span className="fas fa-star active-star"></span>
                    <span className="fas fa-star half-alt active-star"></span>
                  </h6>
                </div>
                <h6>{review.commentTitle}</h6>
                <p>{review.commentDescription}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PatientReviewsBlock;
