import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppointmentList from "./components/AppointmentList";
import BookAppointment from "./components/BookAppointment";
import UserAppointments from "./components/UserAppointment";
import "./components/styles.css";



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppointmentList />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<UserAppointments />} />
      </Routes>
    </Router>
  );
};

export default App;
