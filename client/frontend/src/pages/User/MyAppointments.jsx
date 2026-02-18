import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelAppointment,
  getAllAppointments,
} from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";
import { Link } from "react-router";
import toast from "react-hot-toast";
import "./MyAppointments.css";

const MyAppointments = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const localData = localStorage.getItem("appData");
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getAllAppointments(id));
      dispatch(reset());
    }
  }, [dispatch]);

  const { appointments, error, success } = useSelector((state) => state.auth);

  const handleCancel = (id) => {
    dispatch(cancelAppointment(id));
    if (success) {
      toast.success("Appointment cancelled successfully");
      window.location.reload();
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="appointments-page">
        <div className="appointments-header d-flex justify-content-between align-items-start">
          <div>
            <h2>My Appointments</h2>
            <p>Alfalah General Hospital - Patient Portal</p>
            {/* Add subtitle */}
          </div>
        </div>

        {/* Table wrapper - add this */}
        <div className="appointments-table-wrapper">
          <table className="appointments-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Receipt No.</th>
                <th>Date</th>
                <th>Time</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments?.length > 0 ? (
                appointments.map((appointment, index) => (
                  <tr key={appointment._id}>
                    <td>{index + 1}</td>
                    <td className="receipt-id-cell">
                      <span className="receipt-id">
                        {appointment?._id.substring(0, 8)}...
                      </span>
                    </td>
                    <td>{appointment?.slotDate}</td>
                    <td>
                      <span className="time-badge">
                        {appointment?.slotTime}
                      </span>
                    </td>
                    <td className="amount-cell">Rs. {appointment?.amount}/-</td>
                    <td>
                      {appointment?.status === "pending" ? (
                        <button
                          className="status-action-btn cancel-btn"
                          onClick={() => handleCancel(appointment?._id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <span className={`status-badge ${appointment?.status}`}>
                          {appointment?.status?.charAt(0).toUpperCase() +
                            appointment?.status?.slice(1)}
                        </span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/user/appointments/${appointment?._id}`}
                        className="view-details-link" /* Add className */
                      >
                        View Details
                      </Link>
                    </td>
                    <td>
                      <button className="status-action-btn edit-btn">
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    No appointment history available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default MyAppointments;
