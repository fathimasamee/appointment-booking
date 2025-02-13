import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Phone, Mail, X, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [phoneError, setPhoneError] = useState('');

  // Fetch available slots when date changes
  useEffect(() => {
    fetchAvailableSlots();
  }, [selectedDate]);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/slots`, {
        params: {
          date: selectedDate.toISOString().split('T')[0]
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.error('Error fetching slots:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_BASE_URL}/appointments`,
        {
          date: selectedDate.toISOString().split('T')[0],
          time_slot: selectedTime,
          ...formData
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setBookingStatus('success');
      setTimeout(() => {
        setShowBookingForm(false);
        setBookingStatus(null);
        setSelectedTime(null);
        fetchAvailableSlots();
      }, 2000);
    } catch (error) {
      setBookingStatus('error');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Get day of week for first day of month
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    // Add previous month's days
    for (let i = 0; i < firstDay; i++) {
      days.push({ day: '', disabled: true });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      const isToday = currentDate.toDateString() === new Date().toDateString();
      const isPast = currentDate < new Date(new Date().setHours(0,0,0,0));
      
      days.push({
        day: i,
        disabled: isPast,
        isToday,
        isSelected: currentDate.toDateString() === selectedDate.toDateString()
      });
    }
    
    return days;
  };

  // Navigation handlers
  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  // Phone validation
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    return phoneRegex.test(phone);
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    setFormData({...formData, phone: value});
    if (!validatePhone(value)) {
      setPhoneError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneError('');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-6xl mx-auto p-4"
    >
      <div className="bg-white rounded-lg shadow-lg p-6">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-bold text-gray-800 mb-6"
        >
          Select a Date and Time
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                <div key={day} className="text-center text-gray-500 font-medium py-2">
                  {day}
                </div>
              ))}
              
              {generateCalendarDays().map((day, index) => (
                <button
                  key={index}
                  disabled={day.disabled}
                  onClick={() => day.day && setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.day))}
                  className={`
                    p-2 rounded-lg transition-all duration-200 relative
                    ${day.disabled ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-blue-50'}
                    ${day.isSelected ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
                    ${day.isToday ? 'font-bold' : ''}
                  `}
                >
                  {day.day}
                  {day.isToday && (
                    <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots Section */}
          <motion.div 
            layout
            className="bg-white rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold mb-4">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long' 
              })}
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <AnimatePresence>
                {loading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="col-span-2 flex justify-center items-center py-8"
                  >
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                  </motion.div>
                ) : (
                  availableSlots.map(time => (
                    <motion.button
                      key={time}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedTime(time);
                        setShowBookingForm(true);
                      }}
                      className={`
                        p-4 border rounded-lg transition-all duration-200
                        flex items-center justify-center gap-2
                        ${selectedTime === time ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-500 hover:bg-blue-50'}
                      `}
                    >
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{time}</span>
                    </motion.button>
                  ))
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* Booking Form Modal */}
        <AnimatePresence>
          {showBookingForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                exit={{ y: 50 }}
                className="bg-white rounded-lg p-6 max-w-lg w-full"
              >
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="absolute top-2 right-2 p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>

                <h3 className="text-2xl font-semibold mb-4">Book Your Appointment</h3>
                {bookingStatus && (
                  <div className={`mb-4 text-center ${bookingStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {bookingStatus === 'success' ? <Check className="w-6 h-6 inline" /> : <X className="w-6 h-6 inline" />}
                    <p>{bookingStatus === 'success' ? 'Appointment Booked Successfully' : 'There was an error booking your appointment'}</p>
                  </div>
                )}
                
                <form onSubmit={handleBookAppointment}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="px-4 py-2 text-sm bg-gray-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg"
                    >
                      {loading ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AppointmentBooking;
