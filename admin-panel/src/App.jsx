import "./App.css";
import Dashboard from "./pages/Dashboard";
import AllDoctors from "./pages/doctors/AllDoctors";
import Login from "./pages/user/Login";
import { Toaster } from "react-hot-toast";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AllUsers from "./pages/user/AllUsers";
import DoctorDetails from "./pages/doctors/DoctorDetails";
import AllAppointments from "./pages/appointments/AllAppointments";
import AppointmentDetails from "./pages/appointments/AppointmentDetails";
import UserDetails from "./pages/user/UserDetails";
//import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard />
            // <PrivateRoute>
            //   <Dashboard />
            // </PrivateRoute>
          }
        />

        <Route path="/all-doctors" element={<AllDoctors />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/user-details/:id" element={<UserDetails />} />
        <Route path="/all-appointments" element={<AllAppointments />} />

        <Route path="/doctor-details/:id" element={<DoctorDetails />} />
        <Route
          path="/appointment-details/:id"
          element={<AppointmentDetails />}
        />
      </Routes>
    </>
  );
}

export default App;
