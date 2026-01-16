import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import GalleryPage from "./pages/GalleryPage/GalleryPage";
import Register from "./pages/Auth/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import AllDoctors from "./pages/Doctors/AllDoctors";
import Appointments from "./pages/Doctors/Appointments";
import UserProfile from "./pages/User/UserProfile";
import MyAppointments from "./pages/User/MyAppointments";

function App() {
  return (
    <>
      <Navbar />
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/doctor/:id" element={<Appointments />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/appointments" element={<MyAppointments />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
