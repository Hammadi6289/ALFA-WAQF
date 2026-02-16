import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice";
import UserReducer from "./slice/userSlice";
import DoctorReducer from "./slice/doctorSlice";
import AppointmentReducer from "./slice/appointmentSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    doctor: DoctorReducer,
    appointment: AppointmentReducer,
  },
});
