import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentDetails,
  updateAppointmentStatus,
} from "../../redux/actions/appointmentActions";
import InputSelect from "../../components/Forms/InputSelect";
import toast from "react-hot-toast";

const AppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointmentStatus, setAppointmentStatus] = useState("");

  useEffect(() => {
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id]);

  const { appointment, error, loading, success } = useSelector(
    (state) => state.appointment
  );
  useEffect(() => {
    if (appointment) {
      setAppointmentStatus(appointment?.bookingStatus);
    }
  }, [appointment]);

  const handleUpdateStatus = () => {
    // dispatch(updateAppointmentStatus(id, appointmentStatus));
    dispatch(
      updateAppointmentStatus({
        id,
        appointmentStatus: appointmentStatus.toLowerCase(),
      })
    );
    if (success) {
      toast.success("Status updated successfully");
      navigate("/all-appointments");
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <Layout>
      <h1>Appointment Details</h1>
      <table>
        <tbody>
          <tr>
            <th>Client Name</th>
            <td>{appointment?.clientName}</td>
          </tr>
          <tr>
            <th>Client Phone</th>
            <td>{appointment?.clientPhone}</td>
          </tr>
          <tr>
            <th>Client Email</th>
            <td>{appointment?.clientEmail}</td>
          </tr>
          <tr>
            <th>Doctor Name</th>
            <td>{appointment?.doctorName}</td>
          </tr>
          <tr>
            <th>Doctor Phone</th>
            <td>{appointment?.doctorPhone}</td>
          </tr>
          <tr>
            <th>Doctor Email</th>
            <td>{appointment?.doctorEmail}</td>
          </tr>
          <tr>
            <th>Booking Date</th>
            <td>{appointment?.bookingDate}</td>
          </tr>
          <tr>
            <th>Booking Time</th>
            <td>{appointment?.bookingTime}</td>
          </tr>
          <tr>
            <th>Booking Amount</th>
            <td>{appointment?.amount}</td>
          </tr>
          <tr>
            <th>Booking Status</th>
            <td>{appointment?.bookingStatus}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 w-50">
        <h4>Update Booking Status</h4>
        <div className="mb-3">
          <label className="form-label">Status</label>
          <select
            className="form-select"
            value={appointmentStatus}
            onChange={(e) => setAppointmentStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <button onClick={handleUpdateStatus} className="btn btn-primary">
          Update Status
        </button>
      </div>
    </Layout>
  );
};

export default AppointmentDetails;
