import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { Calendar } from "./ui/calendar"; // Ensure this is a valid Calendar component
import "./styles.css"; // Import plain CSS file

const AppointmentList = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch available slots from API
  const fetchSlots = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/slots", {
        params: { date: selectedDate.toISOString().split('T')[0] },
      });
      setSlots(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load available slots");
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (user) fetchSlots();
  }, [fetchSlots, user]);

  if (!user) {
    return <div className="message">Please login to view available slots</div>;
  }

  return (
    <div className="appointment-container">
      <div className="card">
        <div className="card-header">
          <h2>Available Slots</h2>
        </div>
        <div className="card-content">
          <div className="content">
            {/* Left: Calendar */}
            <div className="calendar-section">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
              />
            </div>

            {/* Right: Slots List */}
            <div className="slots-section">
              {loading ? (
                <p className="loading-text">Loading slots...</p>
              ) : error ? (
                <p className="error-text">{error}</p>
              ) : (
                <ul className="slots-list">
                  {slots.map((slot, index) => (
                    <li key={index} className="slot-item">
                      <span>{slot}</span>
                      <a
                        href={`/book?date=${selectedDate.toISOString().split('T')[0]}&slot=${encodeURIComponent(slot)}`}
                        className="book-button"
                      >
                        Book Now
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentList;
