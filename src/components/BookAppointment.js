import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./styles.css";

const availableSlots = [
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
];

const BookAppointment = () => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time) {
      alert("Please select a time slot");
      return;
    }
    alert("Appointment Booked!");
    navigate("/my-appointments");
  };

  return (
    <motion.div className="container" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Your Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Contact Number"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <Calendar onChange={setDate} value={date} />
        <select required value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">Select Time Slot</option>
          {availableSlots.map((slot, index) => (
            <option key={index} value={slot}>{slot}</option>
          ))}
        </select>
        <button type="submit" className="btn">Book Now</button>
      </form>
    </motion.div>
  );
};

export default BookAppointment;