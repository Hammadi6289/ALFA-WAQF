import React from "react";
import "./Facility.css";
import FacilityData from "./FacilityData.json";

const Facility = () => {
  return (
    <>
      <h2 className="facility-heading">Alfalah Facilites</h2>
      <div className="facility-container-block-wrapper">
        {FacilityData.map((facility, index) => {
          return (
            <div className="facility-container-card" key={index}>
              <i className={`${facility.icon} card-img-top`}></i>
              <div className="facility-card-body">
                <h5 className="facility-card-title">{facility.title}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Facility;
