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
import AddDoctor from "./pages/doctors/AddDoctor";
import WebMessages from "./pages/webMessages/WebMessages";
import AddAppointmentManually from "./pages/appointments/AddAppointmentManually";
import AdminCareers from "./pages/careers/AdminCareers";
import AddEditCareer from "./pages/careers/AddEditCareer";
import Applications from "./pages/careers/Applications";
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
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route
          path="/appointment-details/:id"
          element={<AppointmentDetails />}
        />
        <Route
          path="/add-appointment-manually"
          element={<AddAppointmentManually />}
        />
        <Route path="/all-web-messages" element={<WebMessages />} />

        <Route path="/admin/careers" element={<AdminCareers />} />
        <Route path="/admin/add-career" element={<AddEditCareer />} />
        <Route path="/admin/edit-career/:id" element={<AddEditCareer />} />
        <Route
          path="/admin/careers/:jobId/applications"
          element={<Applications />}
        />
      </Routes>
    </>
  );
}

export default App;
