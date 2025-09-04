import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import EventsPage from "./pages/Events/Events.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import EventInfo from "./pages/EventInfo/EventInfo.jsx";

export default function App() {
  return (
    <>
      <Navbar /> {/* shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventInfo />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer /> {/* same footer on every page */}
    </>
  );
}
