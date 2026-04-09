import React from "react";
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
import AppointmentDetails from "./pages/User/AppointmentDetails";
import ResetPassword from "./pages/User/ResetPassword";
import SpecialtyDetails from "./pages/Specialties/SpecialtyDetails";
import AllCareers from "./pages/Careers/AllCareers";
import CareerDetails from "./pages/Careers/CareerDetails";
import AllNews from "./pages/News/AllNews";
import NewsDetail from "./pages/News/NewsDetail";
import DonationPage from "./pages/Donation/DonationPage";
import CheckoutPage from "./pages/Donation/CheckoutPage";
import PaymentPage from "./pages/Donation/PaymentPage";

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
        <Route path="/user/reset-password/:id" element={<ResetPassword />} />
        <Route path="/doctors" element={<AllDoctors />} />
        <Route path="/doctor/:id" element={<Appointments />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/appointments" element={<MyAppointments />} />
        <Route path="/user/appointments/:id" element={<AppointmentDetails />} />
        <Route path="/specialties/:slug" element={<SpecialtyDetails />} />
        <Route path="/careers" element={<AllCareers />} />
        <Route path="/careers/:id" element={<CareerDetails />} />
        <Route path="/news" element={<AllNews />} />
        <Route path="/news/:slug" element={<NewsDetail />} />
        <Route path="/donate" element={<DonationPage />} />
        <Route path="/donation/checkout" element={<CheckoutPage />} />
        <Route path="/donation/payment/:sessionId" element={<PaymentPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
