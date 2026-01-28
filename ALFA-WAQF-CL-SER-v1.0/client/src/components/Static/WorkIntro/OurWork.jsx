import React from "react";
import "./OurWork.css";
import hospitalWaiting from "../../../assets/images/hospitalWaiting.webp";

const OurWork = () => {
  return (
    <>
      <div className="intro-container-wrapper">
        <div className="row">
          <div className="col-md-6 intro-img-container">
            <img
              className="hos-image"
              src={hospitalWaiting}
              alt="Hospital waiting image"
            />
          </div>
          <div className="col-md-6 intro-info-container">
            <h2>Our Work</h2>
            <h3> We care about your health </h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis expedita assumenda ipsa, saepe earum consequatur
              tenetur, numquam tempora hic nulla repellat dolorum eveniet quod
              quisquam dignissimos libero! Sequi, quod delectus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis expedita assumenda ipsa, saepe earum consequatur
            </p>
            <button className="btn button-secondary">Book Appointment</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurWork;
