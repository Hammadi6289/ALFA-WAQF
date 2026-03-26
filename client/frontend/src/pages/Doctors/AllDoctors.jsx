import React, { useEffect, useMemo, useState } from "react";
//import AllDoctorsData from "./DoctorsData.json"; // for static data testing.
import { NavLink, useNavigate } from "react-router";
import "./AllDoctors.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../redux/actions/doctorActions";
import { Helmet } from "react-helmet-async";
import { FiSearch, FiFilter } from "react-icons/fi";

const AllDoctors = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { doctors } = useSelector((state) => state.doctor);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  useEffect(() => {
    setLoading(true);
    // dispatch(getAllDoctors());
    dispatch(getAllDoctors()).finally(() => setLoading(false));

    // navigate(`/doctor${doctor.id}`);
  }, [dispatch]);

  // Get unique specialties for dropdown
  const specialties = useMemo(() => {
    if (!doctors) return [];
    const uniqueSpecialties = [
      ...new Set(doctors.map((doc) => doc.speciality)),
    ];
    return ["All Specialties", ...uniqueSpecialties.sort()];
  }, [doctors]);

  // Filter doctors based on both search term and selected specialty
  const filteredDoctors = useMemo(() => {
    if (!doctors) return [];

    return doctors.filter((doc) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchTerm === "" ||
        doc.name.toLowerCase().includes(searchLower) ||
        doc.speciality.toLowerCase().includes(searchLower);

      // Specialty filter
      const matchesSpecialty =
        selectedSpecialty === "" ||
        selectedSpecialty === "All Specialties" ||
        doc.speciality === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchTerm, selectedSpecialty]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedSpecialty("");
  };

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

      {/* Search & Filter Section */}
      <div className="doctor-search-filter-section">
        {/* Search Bar */}
        <div className="search-bar-doctor-client">
          <FiSearch className="search-icon-doctor-client" size={20} />
          <input
            type="text"
            placeholder="Search by Name or Speciality"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>

        {/* Specialty Dropdown */}
        <div className="specialty-filter-container">
          <FiFilter className="filter-icon" size={18} />
          <select
            className="specialty-select"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>
                {specialty}
              </option>
            ))}
          </select>
          {selectedSpecialty && selectedSpecialty !== "All Specialties" && (
            <button
              className="clear-filter"
              onClick={() => setSelectedSpecialty("")}
              title="Clear filter"
            >
              ✕
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="search-results-count-doctor-client">
          {(searchTerm || selectedSpecialty) && (
            <>
              {filteredDoctors?.length || 0} Doctor(s) found
              <button
                className="clear-all-filters"
                onClick={handleClearFilters}
              >
                Clear All
              </button>
            </>
          )}
          {!searchTerm && !selectedSpecialty && (
            <span>{doctors?.length || 0} Total Doctors</span>
          )}
        </div>
      </div>

      <div className="container doc-container">
        {filteredDoctors?.map((doctor) => {
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
