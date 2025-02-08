import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppointmentList from "./components/AppointmentList";
import BookAppointment from "./components/BookAppointment";
import UserAppointments from "./components/UserAppointment";
import Login from "./components/Login"; 
import Signup from "./components/Signup"; // Fixed import
import { useAuth } from "./auth/AuthContext"; 
import "./components/styles.css";

// Protected Route Component
const ProtectedRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AppointmentList />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/my-appointments" element={<ProtectedRoute element={<UserAppointments />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> {/* Added Signup Route */}
      </Routes>
    </Router>
  );
};

export default App;
