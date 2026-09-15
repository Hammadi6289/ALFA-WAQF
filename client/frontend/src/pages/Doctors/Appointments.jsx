import React, { useEffect, useState } from "react";
import "./Appointments.css";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails } from "../../redux/actions/doctorActions";
import toast from "react-hot-toast";
import { bookAppointment } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";
import { Helmet } from "react-helmet-async";
import docImageFallback from "../../assets/images/docImage.avif";

const Appointments = () => {
  const { id } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [SelectedDateTime, setSelectedDateTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isBooking, setIsBooking] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setDocInfo(null);
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor, loading } = useSelector((state) => state.doctor);
  const { user, error, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (doctor) {
      setDocInfo(doctor);
      setIsLoading(false);
    }
  }, [doctor]);

  const handleBooking = () => {
    if (!user) {
      toast.error("Please login to book an appointment");
      navigate("/login");
      return;
    }

    const bookingData = {
      userId: user?._id,
      doctorId: id,
      amount: docInfo?.fees,
      slotDate: SelectedDateTime.toLocaleDateString(),
      slotTime: SelectedDateTime.toLocaleTimeString(),
    };
    setIsBooking(true);
    dispatch(bookAppointment(bookingData));
  };

  useEffect(() => {
    if (!isBooking) return;
    if (success) {
      toast.success("Appointment booked successfully");
      navigate("/user/appointments");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
      setIsBooking(false);
    }
  }, [success, error, isBooking]);

  return (
    <>
      <Helmet>
        <title>Appointment Booking | Alfalah</title>
      </Helmet>

      {/* ── Service Unavailable Banner ── */}
      <div className="booking-banner" role="alert" aria-live="polite">
        <span className="booking-banner__icon">🔧</span>
        <div className="booking-banner__body">
          <strong>Booking Service Temporarily Unavailable</strong>
          <p>
            We're currently performing maintenance on our online booking system.
            We apologise for the inconvenience — please call us directly or try
            again later.
          </p>
        </div>
        <a href="/contact" className="booking-banner__cta">
          Contact Us
        </a>
      </div>

      {isLoading || loading ? (
        /* Skeleton loader */
        <div className="container docinfo-container">
          <div className="docinfo-skeleton">
            <div className="skeleton skeleton-avatar"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text small"></div>
          </div>
          <div className="docinfo-skeleton docinfo-skeleton--right">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text small"></div>
            <div className="skeleton skeleton-box"></div>
            <div className="skeleton skeleton-box" style={{ height: 48, marginTop: 12 }}></div>
          </div>
        </div>
      ) : (
        /* Main content */
        <div className="container docinfo-container">
          {/* Left — doctor profile */}
          <aside className="docinfo-profile">
            <div className="docinfo-avatar-wrap">
              <img
                key={docInfo?._id || id}
                className="docinfo-image"
                src={
                  docInfo?.image
                    ? `data:image/jpeg;base64,${docInfo.image}`
                    : docImageFallback
                }
                alt={`Dr. ${docInfo?.name}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = docImageFallback;
                }}
              />
              <span
                className={`docinfo-badge ${
                  docInfo?.available ? "docinfo-badge--available" : "docinfo-badge--unavailable"
                }`}
              >
                {docInfo?.available ? "● Available" : "● Not Available"}
              </span>
            </div>

            <h1 className="docinfo-name">{docInfo?.name}</h1>

            <div className="docinfo-meta">
              <div className="docinfo-meta__item">
                <span className="docinfo-meta__label">Experience</span>
                <span className="docinfo-meta__value">{docInfo?.experience} yrs</span>
              </div>
              <div className="docinfo-meta__divider" />
              <div className="docinfo-meta__item">
                <span className="docinfo-meta__label">Fee</span>
                <span className="docinfo-meta__value fee">
                  {docInfo?.fees ? `PKR ${docInfo.fees}` : "—"}
                </span>
              </div>
            </div>
          </aside>

          {/* Right — booking details */}
          <section className="docinfo-booking">
            {/* About section */}
            {docInfo?.about && (
              <div className="docinfo-about">
                <h2 className="docinfo-section-title">
                  <span className="docinfo-section-icon">👨‍⚕️</span> About the Doctor
                </h2>
                <p className="docinfo-about__text">{docInfo.about}</p>
              </div>
            )}

            {/* Date & time picker */}
            <div className="docinfo-datepick">
              <h2 className="docinfo-section-title">
                <span className="docinfo-section-icon">📅</span> Choose Date &amp; Time
              </h2>
              <DatePicker
                className="calender"
                minDate={new Date()}
                selected={SelectedDateTime}
                onChange={(date) => setSelectedDateTime(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
                dateFormat={"d-MMM-yyy h:mm aa"}
                timeCaption="Time"
                minTime={new Date()}
                maxTime={setHours(setMinutes(new Date(), 2), 22)}
                placeholderText="Select a date and time"
              />

              {SelectedDateTime && (
                <div className="docinfo-selected-slot">
                  <span className="docinfo-selected-slot__label">Selected slot</span>
                  <span className="docinfo-selected-slot__value">
                    {SelectedDateTime.toLocaleString("en-US", {
                      weekday: "short",
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </span>
                </div>
              )}
            </div>

            {/* Book button */}
            <button
              onClick={handleBooking}
              className="docinfo-btn"
              disabled={!docInfo?.available || isBooking}
              aria-label={
                docInfo?.available
                  ? "Confirm appointment booking"
                  : "Doctor not available for booking"
              }
            >
              {isBooking ? (
                <>
                  <span className="docinfo-btn__spinner" aria-hidden="true"></span>
                  Booking…
                </>
              ) : docInfo?.available ? (
                "Confirm Appointment"
              ) : (
                "Doctor Unavailable"
              )}
            </button>

            <p className="docinfo-disclaimer">
              * Online booking is temporarily disabled. You may still submit a request; our team
              will reach out to confirm.
            </p>
          </section>
        </div>
      )}
    </>
  );
};

export default Appointments;
