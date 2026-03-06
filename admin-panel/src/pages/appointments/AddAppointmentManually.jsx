import React, { useEffect, useState } from "react";
import "./AddAppointmentManually.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import { FaAngleLeft } from "react-icons/fa";
import { reset } from "../../redux/slice/appointmentSlice";
import { addAppointmentManually } from "../../redux/actions/appointmentActions";
import { getAllDoctors } from "../../redux/actions/doctorActions";
import { getAllUsers } from "../../redux/actions/userActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";

const AddAppointmentManually = () => {
  const [inputMode, setInputMode] = useState("dropdown"); // or manual
  const [selectedUser, setSelectedUser] = useState("");
  const [manualName, setManualName] = useState("");

  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [isBooking, setIsBooking] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { doctors } = useSelector((state) => state.doctor);
  const { users } = useSelector((state) => state.user);
  const { error, success } = useSelector((state) => state.appointment);

  useEffect(() => {
    dispatch(getAllDoctors());
    dispatch(getAllUsers());
  }, [dispatch]);

  // Auto-fill amount when doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      const doctor = doctors?.find((d) => d._id === selectedDoctor);
      setAmount(doctor?.fees || "");
    }
  }, [selectedDoctor, doctors]);

  const handleBooking = () => {
    // Validate based on input mode
    const patientId = inputMode === "dropdown" ? selectedUser : null;
    const patientName = inputMode === "manual" ? manualName : null;

    if (!patientId && !patientName) {
      toast.error("Please select or enter a patient name");
      return;
    }

    if (!selectedDoctor || !selectedDateTime || !amount) {
      toast.error("Please fill all fields");
      return;
    }

    const bookingData = {
      userId: patientId, // Send ObjectId if dropdown, null if manual
      patientName: patientName, // Send name if manual, null if dropdown
      doctorId: selectedDoctor,
      amount: amount,
      slotDate: selectedDateTime.toLocaleDateString("en-GB"), // DD-MM-YYYY
      slotTime: selectedDateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setIsBooking(true);
    dispatch(addAppointmentManually(bookingData));
  };

  useEffect(() => {
    if (!isBooking) return;

    if (success) {
      toast.success("Appointment booked successfully");
      dispatch(reset());
      navigate("/all-appointments");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
      setIsBooking(false);
    }
  }, [success, error, isBooking]);

  return (
    <Layout>
      <div className="add-new-appointment-page">
        <div className="appointment-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Add New Appointment</h2>
            <p>Book appointment for walk-in or phone customers</p>
          </div>

          <button
            onClick={() => navigate("/all-appointments")}
            className="back-btn"
          >
            <FaAngleLeft size={16} />
            Back to Appointments
          </button>
        </div>

        <div className="add-appointment-form-card">
          {/* Select Patient */}
          <div className="form-group">
            <label>Select Patient *</label>
            <div className="mb-2">
              <button onClick={() => setInputMode("dropdown")}>
                From Users
              </button>
              <button onClick={() => setInputMode("manual")}>
                Manual Entry
              </button>
            </div>

            {inputMode === "dropdown" ? (
              <select
                className="form-control"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">-- Choose Patient --</option>
                {users?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                className="form-control"
                placeholder="Enter patient name"
                value={manualName}
                onChange={(e) => setManualName(e.target.value)}
              />
            )}
          </div>

          {/* Select Doctor */}
          <div className="form-group">
            <label>Select Doctor *</label>
            <select
              className="form-control"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
            >
              <option value="">-- Choose Doctor --</option>
              {doctors?.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.name} - {doctor.speciality}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time Picker */}
          <div className="form-group">
            <label>Appointment Date & Time *</label>
            <DatePicker
              wrapperClassName="datepicker-wrapper"
              className="calender"
              minDate={new Date()}
              selected={selectedDateTime}
              onChange={(date) => setSelectedDateTime(date)}
              showTimeSelect
              timeFormat="h:mm aa"
              timeIntervals={30}
              dateFormat={"d-MMM-yyy h:mm aa"}
              timeCaption="Time"
              minTime={new Date()}
              maxTime={setHours(setMinutes(new Date(), 2), 22)}
            />
          </div>

          {/* Amount */}
          <div className="form-group">
            <label>Consultation Fee *</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary mt-4"
            onClick={handleBooking}
            disabled={isBooking}
          >
            {isBooking ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddAppointmentManually;
