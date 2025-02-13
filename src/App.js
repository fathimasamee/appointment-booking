import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import AppointmentBooking from './components/AppointmentBooking';
import MyAppointment from './components/MyAppointment';
import { AuthProvider, useAuth } from './context/AuthContext';
import './tailwind.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              
              {/* Protected Routes */}
              <Route 
                path="/book-appointment" 
                element={
                  <ProtectedRoute>
                    <AppointmentBooking />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/appointments" 
                element={
                  <ProtectedRoute>
                    <MyAppointment />
                  </ProtectedRoute>
                } 
              />
              
              {/* Redirect "/" to "/book-appointment" */}
              <Route path="/" element={<Navigate to="/book-appointment" />} />
            </Routes>
          </AnimatePresence>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
