import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slice/authSlice";
import UserReducer from "./slice/userSlice";
import DoctorReducer from "./slice/doctorSlice";
// import todosReducer from '../features/todos/todosSlice'
// import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    user: UserReducer,
    doctor: DoctorReducer,
    // todos: todosReducer,
    // filters: filtersReducer,
  },
});
