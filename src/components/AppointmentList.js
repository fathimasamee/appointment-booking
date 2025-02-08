import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar } from "./ui/calendar";
import { useAuth } from '../auth/AuthContext';

const AppointmentList = () => {
  const [slots, setSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Use useCallback to memoize fetchSlots
  const fetchSlots = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/slots", {
        params: {
          date: selectedDate.toISOString().split('T')[0]
        }
      });
      setSlots(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load available slots");
      setLoading(false);
    }
  }, [selectedDate]); // Adding selectedDate as a dependency

  useEffect(() => {
    if (user) {
      fetchSlots(); // Fetch slots when the user is logged in and selectedDate changes
    }
  }, [fetchSlots, user]); // Include fetchSlots and user as dependencies

  if (!user) {
    return (
      <div className="text-center p-4">
        Please login to view available slots
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Available Slots</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
                className="rounded-md border"
              />
            </div>
            <div className="md:col-span-2">
              {loading ? (
                <div className="text-center p-4">Loading slots...</div>
              ) : error ? (
                <div className="text-red-500 p-4">{error}</div>
              ) : (
                <div className="grid gap-4">
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-lg">{slot}</span>
                        <Button
                          variant="default"
                          asChild
                        >
                          <a href={`/book?date=${selectedDate.toISOString().split('T')[0]}&slot=${encodeURIComponent(slot)}`}>
                            Book Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentList;
