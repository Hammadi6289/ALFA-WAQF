import React from "react";
import AllDoctorsData from "./DoctorsData.json";
import { NavLink } from "react-router";
import "./AllDoctors.css";

const AllDoctors = () => {
  return (
    <>
      <h4 className="text-center doctor-heading mt-3">
        Select a Doctor and Book an Appointment
      </h4>
      <div className="container doc-container">
        {AllDoctorsData.map((doctor, index) => {
          return (
            <div className="card" key={doctor.id} style={{ width: "15rem" }}>
              <NavLink to={`/doctor/${doctor.id}`}>
                <img
                  src={doctor.image}
                  alt="image"
                  width={150}
                  height={150}
                  className="card-image-top"
                />
                <div className="card-body">
                  <h6>{doctor.name}</h6>
                  <p>{doctor.degree}</p>
                </div>
                <div className="card-footer">
                  <p>
                    <i className={doctor.icon}></i>
                    {doctor.speciality}
                  </p>
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AllDoctors;
