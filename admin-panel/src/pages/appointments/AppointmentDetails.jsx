import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentDetails } from "../../redux/actions/appointmentActions";

const AppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
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
  return (
    <Layout>
      <h1>All Appointment Details</h1>
    </Layout>
  );
};

export default AppointmentDetails;
