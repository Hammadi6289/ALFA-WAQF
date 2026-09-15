import React, { useEffect, useMemo, useState } from "react";
//import AllDoctorsData from "./DoctorsData.json"; // for static data testing.
import { NavLink, useNavigate } from "react-router";
import "./AllDoctors.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../redux/actions/doctorActions";
import { Helmet } from "react-helmet-async";
import { FiSearch, FiFilter } from "react-icons/fi";
import Skeleton from "../../components/common/Skeleton/Skeleton";

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

  // Handle loading inline below
  return (
    <>
      <Helmet>
        <title>Book an Appointment | Alfalah</title>
      </Helmet>

      {/* ── Hero Banner ── */}
      <div className="meet-doctors-container">
        <div className="container-content">
          <span className="hero-eyebrow">Our Medical Team</span>
          <h1 className="doctor-heading">Meet Our Specialists</h1>
          <p className="hero-sub">
            Discover the experts behind your care at Alfalah. Our team of highly
            qualified consultants is here to guide you with specialised
            knowledge and a commitment to your well-being.
          </p>
        </div>
      </div>

      {/* ── Search & Filter Bar ── */}
      <div className="doctor-search-filter-section">
        {/* Search */}
        <div className="search-bar-doctor-client">
          <FiSearch className="search-icon-doctor-client" size={18} />
          <input
            id="doctor-search-input"
            type="text"
            placeholder="Search by name or specialty…"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search doctors"
          />
          {searchTerm && (
            <button
              className="clear-search"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Specialty Dropdown */}
        <div className="specialty-filter-container">
          <FiFilter className="filter-icon" size={16} />
          <select
            id="specialty-filter-select"
            className="specialty-select"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            aria-label="Filter by specialty"
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
              aria-label="Clear specialty filter"
            >
              ✕
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="search-results-count-doctor-client">
          {(searchTerm || selectedSpecialty) && (
            <>
              <span>
                <strong>{filteredDoctors?.length || 0}</strong> Doctor(s) found
              </span>
              <button className="clear-all-filters" onClick={handleClearFilters}>
                Clear All
              </button>
            </>
          )}
          {!searchTerm && !selectedSpecialty && (
            <span>
              <strong>{doctors?.length || 0}</strong> Total Doctors
            </span>
          )}
        </div>
      </div>

      {/* ── Doctor Cards Grid ── */}
      <div className="doc-grid-wrapper">
        <div className="doc-container">
          {loading
            ? [...Array(8)].map((_, index) => (
                <div className="doc-card doc-card--skeleton" key={index}>
                  <div className="doc-card__avatar-wrap">
                    <Skeleton type="circular" width="110px" height="110px" />
                  </div>
                  <div className="doc-card__body">
                    <Skeleton type="text" width="70%" height="18px" style={{ marginBottom: 10 }} />
                    <Skeleton type="text" width="50%" height="14px" style={{ marginBottom: 8 }} />
                    <Skeleton type="text" width="40%" height="14px" />
                  </div>
                </div>
              ))
            : filteredDoctors?.map((doctor) => (
                <NavLink
                  to={`/doctor/${doctor._id}`}
                  className="doc-card"
                  key={doctor._id}
                  aria-label={`View profile of ${doctor.name}`}
                >
                  {/* Available badge */}
                  <span
                    className={`doc-card__avail-dot ${
                      doctor.available ? "doc-card__avail-dot--on" : "doc-card__avail-dot--off"
                    }`}
                    title={doctor.available ? "Available" : "Not Available"}
                  />

                  {/* Avatar */}
                  <div className="doc-card__avatar-wrap">
                    <img
                      src={`https://ui-avatars.com/api/?name=${doctor.name}&size=150&rounded=true&background=random`}
                      alt={doctor.name}
                      width={110}
                      height={110}
                      className="doc-card__avatar"
                    />
                  </div>

                  {/* Info */}
                  <div className="doc-card__body">
                    <h2 className="doc-card__name">{doctor.name}</h2>
                    <p className="doc-card__degree">{doctor.degree}</p>
                    <span className="doc-card__specialty">
                      <i className={doctor.icon} aria-hidden="true" />
                      {doctor.speciality}
                    </span>
                  </div>

                  {/* CTA footer */}
                  <div className="doc-card__footer">
                    <span className="doc-card__cta">View Profile →</span>
                  </div>
                </NavLink>
              ))}
        </div>

        {/* Empty state */}
        {!loading && filteredDoctors?.length === 0 && (
          <div className="doc-empty">
            <span className="doc-empty__icon">🔍</span>
            <h3>No doctors found</h3>
            <p>Try adjusting your search or filter criteria.</p>
            <button className="doc-empty__reset" onClick={handleClearFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AllDoctors;
