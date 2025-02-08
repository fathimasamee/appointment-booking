import React, { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, time: "10:00 AM - 11:00 AM", date: "2025-02-08" }
  ]);

  const cancelAppointment = (id) => {
    setAppointments(appointments.filter((appt) => appt.id !== id));
  };

  return (
    <motion.div className="container" initial={{ x: -100 }} animate={{ x: 0 }}>
      <h2>My Appointments</h2>
      <ul className="appointments">
        {appointments.length === 0 ? <p>No appointments booked.</p> : (
          appointments.map((appt) => (
            <li key={appt.id}>
              {appt.date} - {appt.time} 
              <button onClick={() => cancelAppointment(appt.id)} className="cancel-btn">Cancel</button>
            </li>
          ))
        )}
      </ul>
    </motion.div>
  );
};

export default UserAppointments;
