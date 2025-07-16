"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { fetchAppointment, EnrichedAppointment } from "@/app/(dashboard)/list/appointments/action";
import { useGlobalStore } from "@/store/globalStore";
import { Skeleton } from "@/components/ui/skeleton";

const Appointments = () => {
  const [appointments, setAppointments] = useState<EnrichedAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { careHome } = useGlobalStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!careHome?.id) return;
      
      setLoading(true);
      try {
        console.log("Fetching all appointments for careHome:", careHome.id);
        const allAppointments = await fetchAppointment(careHome.id);
        console.log("All appointments fetched:", allAppointments);
        
        // Filter for next 10 days
        const now = new Date();
        now.setHours(0, 0, 0, 0); // Start of today
        const tenDaysFromNow = new Date();
        tenDaysFromNow.setDate(now.getDate() + 10);
        tenDaysFromNow.setHours(23, 59, 59, 999); // End of the 10th day
        
        console.log("Date range:", {
          now: now.toISOString(),
          tenDaysFromNow: tenDaysFromNow.toISOString()
        });
        
        const upcomingAppointments = allAppointments.filter(apt => {
          const appointmentDate = new Date(apt.date);
          appointmentDate.setHours(0, 0, 0, 0); // Normalize to start of day
          console.log("Checking appointment:", {
            id: apt.id,
            appointmentDate: appointmentDate.toISOString(),
            isInRange: appointmentDate >= now && appointmentDate <= tenDaysFromNow
          });
          return appointmentDate >= now && appointmentDate <= tenDaysFromNow;
        }).slice(0, 10);
        
        console.log("Filtered upcoming appointments:", upcomingAppointments);
        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error("Error fetching upcoming appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [careHome]);

  const formatDateTime = (date: Date, time: Date) => {
    const appointmentDate = new Date(date);
    const appointmentTime = new Date(time);
    
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    let dateStr = "";
    if (appointmentDate.toDateString() === today.toDateString()) {
      dateStr = "Today";
    } else if (appointmentDate.toDateString() === tomorrow.toDateString()) {
      dateStr = "Tomorrow";
    } else {
      dateStr = appointmentDate.toLocaleDateString("en-US", { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
    
    const timeStr = appointmentTime.toLocaleTimeString("en-US", { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    return `${dateStr}, ${timeStr}`;
  };

  return (
    <Card className="sm:col-span-2 transition hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          🗓️ Upcoming Appointments (Next 10 Days)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[120px]" />
              </div>
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No upcoming appointments in the next 10 days
          </div>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} className="flex justify-between items-center">
              <span>
                {appointment.scheduledWith} - {appointment.residentName}
              </span>
              <span className="text-xs text-gray-500">
                {formatDateTime(appointment.date, appointment.time)}
              </span>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default Appointments;
