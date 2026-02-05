import React, { useEffect } from "react";
//import AllDoctorsData from "./DoctorsData.json"; // for static data testing.
import { NavLink, useNavigate } from "react-router";
import "./AllDoctors.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../redux/actions/doctorActions";

const AllDoctors = () => {
  const navigate = useNavigate(); // Not required here.
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDoctors());

    // navigate(`/doctor${doctor.id}`);
  }, [dispatch]);

  const { doctors } = useSelector((state) => state.doctor);
  return (
    <>
      <h4 className="text-center doctor-heading mt-3">
        Select a Doctor and Book an Appointment
      </h4>
      <div className="container doc-container">
        {doctors?.map((doctor, index) => {
          return (
            <div className="card" key={doctor._id} style={{ width: "15rem" }}>
              <NavLink to={`/doctor/${doctor._id}`}>
                <img
                  src={`data:image/jpeg;base64,${doctor?.image}`}
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
