import React, { useEffect, useState } from "react";
import "./Appointments.css";
import { useParams } from "react-router";
// import DoctorData from "./DoctorsData.json"; // for static data testing.
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails } from "../../redux/actions/doctorActions";

const Appointments = () => {
  const { id } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [SelectedDateTime, setSelectedDateTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (doctor) {
      setDocInfo(doctor);
      // setIsLoading(true);
    }
  }, [doctor]);

  // Find a doctor based on the id (Static data from json for the testing purpose)
  // const getDocInfo = async () => {
  //   let docInfo = DoctorData.find((doc) => doc.id == id);
  //   setDocInfo(docInfo);
  //   console.log(docInfo);
  // };

  // useEffect(() => {
  //   getDocInfo();
  // }, [id]);

  return (
    <>
      <div
        className={`container docinfo-container ${
          isLoading ? "is-loading" : ""
        }`}
      >
        {/* <!-- Skeleton --> */}
        {isLoading && (
          <>
            <div className="skeleton skeleton-avatar"></div>
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text small"></div>
            <div className="skeleton skeleton-box"></div>
          </>
        )}

        <div class="real-content">
          <div className="row m-3">
            <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
              <img
                className="docinfo-image"
                src={`data:image/jpeg;base64,${docInfo?.image}`}
                alt="docImage"
                height={200}
                width={200}
              />
              <h2 className="docinfo-name">{docInfo?.name}</h2>
              <h6
                className={`docinfo-status ${
                  docInfo?.available ? "text-success" : "text-danger"
                }`}
              >
                {docInfo?.available ? "Available" : "Not Available"}
              </h6>
            </div>
            <div className="col-md-8 d-flex flex-column justify-content-center align-items-center">
              <h6>Experience: {docInfo?.experience} Years</h6>
              <h6>About Doctor</h6>
              <p>{docInfo?.about}</p>
              <h5>Consultation Fee: {docInfo?.fees}</h5>
              {/* Date time */}
              <div className="date-time mt-3">
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
                />
                <p>Your Selected Booking:</p>
                {SelectedDateTime
                  ? SelectedDateTime.toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })
                  : "Please select appointment time"}
              </div>
              <button
                className="btn button-tertiary w-5 docinfo-btn"
                disabled={!docInfo?.available}
              >
                {docInfo?.available ? "Book Now" : "Not Available"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
