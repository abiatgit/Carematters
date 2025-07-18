
"use client";
import { Card } from "../ui/card";

import { SkeletonDemo } from "../skelton";
import { MapPin, Calendar,  } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { fetchAppointmentsByUnit, EnrichedAppointment } from "@/app/(dashboard)/list/appointments/action";
import { useGlobalStore } from "@/store/globalStore";
import { useEffect, useState } from "react";

type Props = {
  unitId?: string | null;
  limit?: number;
};

const AppointmentCards = ({ unitId, limit = 20 }: Props) => {
  const { houseId, careHome } = useGlobalStore();
  const [appointments, setAppointments] = useState<EnrichedAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  const selectedUnitId = unitId || houseId;

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedUnitId) return;
      
      setLoading(true);
      try {
        const appointmentData = await fetchAppointmentsByUnit(selectedUnitId, limit, careHome?.id);
        setAppointments(appointmentData);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [selectedUnitId, limit, careHome]);

  const formatDateTime = (date: Date, time: Date) => {
    const appointmentDate = new Date(date);
    const appointmentTime = new Date(time);
    
    const dateStr = appointmentDate.toLocaleDateString("en-US", { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    
    const timeStr = appointmentTime.toLocaleTimeString("en-US", { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    return { dateStr, timeStr };
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-5">
        <SkeletonDemo />
        <SkeletonDemo />
        <SkeletonDemo />
        <SkeletonDemo />
        <SkeletonDemo />
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-gray-400 mb-2">
          <Calendar size={48} />
        </div>
        <p className="text-lg font-medium text-gray-600">No appointments found</p>
        <p className="text-sm text-gray-400">There are no appointments for this unit.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {appointments.map((item, index) => {
        const { dateStr, timeStr } = formatDateTime(item.date, item.time);
        
        return (
          <Card
            key={item.id || index}
            className="p-4 hover:shadow-sm transition-all duration-200 border-l-4 border-l-green-700"
          >
            <div className="grid grid-cols-3 gap-4 items-center">
              {/* Left: Avatar and Resident Info */}
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarImage 
                    src={item.residentAvatar || undefined} 
                    alt={item.residentName || "Resident"} 
                  />
                  <AvatarFallback className="bg-blue-100 text-green-700 text-sm font-medium">
                    {item.residentName?.split(' ').map(n => n[0]).join('') || 'R'}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <h4 className="font-medium text-gray-900 text-sm truncate">
                    {item.residentName}
                  </h4>
                  <p className="text-xs text-gray-500 truncate">
                    {item.unitName}
                  </p>
                </div>
              </div>

              {/* Middle: Date & Time */}
              <div className="flex flex-col items-center text-center">
                <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{dateStr}</p>
                <p className="text-xs text-gray-500 whitespace-nowrap">{timeStr}</p>
              </div>

              {/* Right: Appointment Details */}
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {item.scheduledWith}
                </p>
                <div className="flex items-center justify-end space-x-1 mt-1">
                  <MapPin size={12} className="text-gray-400 flex-shrink-0" />
                  <span className="text-xs text-gray-500 truncate">{item.venue}</span>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
      
      {appointments.length === limit && (
        <div className="text-center py-3">
          <p className="text-xs text-gray-400">
            Showing first {limit} appointments
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCards;
