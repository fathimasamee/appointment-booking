import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./styles.css";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    time: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Appointment Booked Successfully!");
    navigate("/my-appointments");
  };

  return (
    <motion.div 
      className="container" 
      initial={{ scale: 0.9, opacity: 0 }} 
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="form">
        <input 
          type="text" 
          name="name" 
          placeholder="Your Name" 
          value={formData.name} 
          required 
          onChange={handleChange} 
        />
        <input 
          type="tel" 
          name="contact" 
          placeholder="Contact Number" 
          value={formData.contact} 
          required 
          onChange={handleChange} 
        />
        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          required 
          onChange={handleChange} 
        />
        <select 
          name="time" 
          value={formData.time} 
          required 
          onChange={handleChange}
        >
          <option value="">Select Time Slot</option>
          <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
          <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
        </select>
        <button type="submit" className="btn">Book Now</button>
      </form>
    </motion.div>
  );
};

export default BookAppointment;
