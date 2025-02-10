import React from "react"; // Removed `useState`
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppointmentList from "./components/AppointmentList";
import BookAppointment from "./components/BookAppointment";
import UserAppointments from "./components/UserAppointment";
import Login from "./components/Login"; 
import Signup from "./components/Signup"; 
import { useAuth } from "./auth/AuthContext"; 
import "./components/styles.css";

// Protected Route Component with Notification
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  if (!user) {
    alert("Please login first!"); // Notification
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      {/* Show Navbar only when user is logged in */}
      {user && <Navbar />}
      
      <Routes>
        {/* Redirect "/" to "/login" as the default page */}
        <Route path="/" element={<Navigate replace to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 

        {/* Protected Routes (only accessible after login) */}
        <Route path="/appointments" element={<ProtectedRoute element={<AppointmentList />} />} />
        <Route path="/book" element={<ProtectedRoute element={<BookAppointment />} />} />
        <Route path="/my-appointments" element={<ProtectedRoute element={<UserAppointments />} />} />
      </Routes>
    </Router>
  );
};

export default App;
