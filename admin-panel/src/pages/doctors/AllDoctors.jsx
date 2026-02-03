import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { getAllDoctors } from "../../redux/actions/doctorActions";
import { reset } from "../../redux/slice/doctorSlice";
import "./AllDoctors.css";
import { FaAngleRight } from "react-icons/fa";

const AllDoctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(reset());
  }, [dispatch]);

  const { doctors } = useSelector((state) => state.doctor);
  return (
    <Layout>
      <div className="doctors-page">
        <div className="doctors-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Doctors</h2>
            <p>Manage hospital doctors and availability</p>
          </div>

          <button
            onClick={() => navigate("/add-doctor")}
            className="add-doctor-btn"
          >
            Add Doctor{" "}
            <FaAngleRight className="FaAngleRight-btn-icon" size={16} />
          </button>
        </div>
      </div>

      <div className="doctors-table-wrapper">
        <table className="doctors-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Doctor</th>
              <th>Degree</th>
              <th>Speciality</th>
              <th>Experience</th>
              <th>Fees</th>
              <th>Contact details</th>
              <th>Gender</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {doctors?.map((doctor, index) => (
              <tr key={doctor._id}>
                <td>{index + 1}</td>

                {/* Doctor info */}
                <td className="doctor-cell">
                  {/* Image */}
                  <td>
                    {doctor.image ? (
                      <img
                        src={`data:image/jpeg;base64,${doctor.image}`}
                        alt={doctor.name}
                        className="doctor-avatar"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <div className="d-flex flex-column">
                    <strong>{doctor.name}</strong>
                    <small>{doctor.email}</small>
                  </div>
                </td>

                <td>{doctor.degree}</td>
                <td>{doctor.speciality}</td>
                <td>{doctor.experience} yrs</td>
                <td>Rs. {doctor.fees}/-</td>

                {/* Contact */}
                <td>
                  <div className="muted">{doctor.phone || "Not available"}</div>
                  <div className="muted">{doctor.address || "—"}</div>
                </td>

                <td>
                  {doctor.gender.charAt(0).toUpperCase() +
                    doctor.gender.slice(1) || "—"}
                </td>

                {/* Availability */}
                <td>
                  <span
                    className={`status-badge ${
                      doctor.available ? "completed" : "cancel"
                    }`}
                  >
                    {doctor.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td>
                  <Link
                    to={`/doctor-details/${doctor?._id}`}
                    className="view-details-link"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AllDoctors;
