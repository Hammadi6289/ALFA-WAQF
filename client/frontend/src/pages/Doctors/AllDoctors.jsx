import React, { useEffect, useState } from "react";
//import AllDoctorsData from "./DoctorsData.json"; // for static data testing.
import { NavLink, useNavigate } from "react-router";
import "./AllDoctors.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../redux/actions/doctorActions";
import { Helmet } from "react-helmet-async";

const AllDoctors = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctor);

  useEffect(() => {
    setLoading(true);
    // dispatch(getAllDoctors());
    dispatch(getAllDoctors()).finally(() => setLoading(false));

    // navigate(`/doctor${doctor.id}`);
  }, [dispatch]);

  // Lets keep this as simple as possible but its crucial though
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading doctors...</span>
        </div>
        <p className="mt-3">Loading doctors, please wait...</p>
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>Book an Appointment | Alfalah</title>
      </Helmet>

      <div className="meet-doctors-container">
        <div className="container-content">
          <h3 className="text-center doctor-heading mt-3">
            Meet Our Specialists
          </h3>
          <h4>
            Discover the experts behind your care at Alfalah. Our team of highly
            qualified consultants is here to guide you with specialized
            knowledge and a commitment to your well-being
          </h4>
        </div>
      </div>

      <div className="container doc-container">
        {doctors?.map((doctor) => {
          return (
            <div className="card" key={doctor._id} style={{ width: "15rem" }}>
              <NavLink to={`/doctor/${doctor._id}`}>
                <img
                  // src={`data:image/jpeg;base64,${doctor?.image}`}
                  src={`https://ui-avatars.com/api/?name=${doctor.name}&size=150&rounded=true&background=random`}
                  alt={doctor.name}
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
