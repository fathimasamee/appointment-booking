import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./styles.css";

const AppointmentList = () => {
  const [slots] = useState([
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM"
  ]);

  return (
    <motion.div className="container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2>Available Slots</h2>
      <ul className="slots">
        {slots.map((slot, index) => (
          <motion.li key={index} whileHover={{ scale: 1.05 }}>
            {slot} - <Link to="/book">Book Now</Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default AppointmentList;
