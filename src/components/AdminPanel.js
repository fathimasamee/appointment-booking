import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminPanel = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/admin/appointments', {
        params: {
          date: selectedDate.toISOString().split('T')[0]
        }
      });
      setAppointments(response.data);
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (appointmentId, status) => {
    try {
      await axios.patch(`/admin/appointments/${appointmentId}`, { status });
      fetchAppointments();
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Select Date</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium mb-2">Appointments</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.name}</TableCell>
                      <TableCell>{appointment.contact}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant={appointment.status === 'confirmed' ? 'outline' : 'default'}
                            onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                          >
                            Confirm
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                          >
                            Cancel
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
