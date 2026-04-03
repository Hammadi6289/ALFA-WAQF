import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice";
import UserReducer from "./slice/userSlice";
import DoctorReducer from "./slice/doctorSlice";
import AppointmentReducer from "./slice/appointmentSlice";
import webMessageReducer from "./slice/webMessageSlice";
import careerReducer from "./slice/careerSlice";
import NewsReducer from "./slice/newsSlice";
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    doctor: DoctorReducer,
    appointment: AppointmentReducer,
    webMessage: webMessageReducer,
    career: careerReducer,
    news: NewsReducer,
    // todos: todosReducer,
    // filters: filtersReducer,
  },
});
