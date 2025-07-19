"use client";
import React, { use, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import MedsTable from "@/components/medsTable/MedsTable";
import { Button } from "@/components/ui/button";
import { Folder, Pencil, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CreateIncidentFrom } from "@/components/forms/incidentreport/CreateIncident";
import { IncidetnChart } from "@/components/incidentChart/incidentChart";
import { fetchResidentwithId, updateResidentWithId } from "../action";
import { Resident, Appointment } from "@prisma/client";
import { fetchAppointmentBasic } from "../../appointments/action";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { showSuccessToast, showErrorToast } from "@/lib/toast";

const SingelResidentPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)

  const getResident = async (residentId: string) => {
    const res = await fetchResidentwithId(residentId)
    setUser(res)
  }
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<Resident | null>(null)
  const [progress, setProgress] = useState(10);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loadingAppointments, setLoadingAppointments] = useState(false);
  const [editingUser, setEditingUser] = useState<Resident | null>(null);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);
  const getAppointments = async (residentId: string) => {
    setLoadingAppointments(true);
    try {
      const appointmentData = await fetchAppointmentBasic(residentId);
      setAppointments(appointmentData || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    getResident(id);
    getAppointments(id);
  }, [id])
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

  const handleEditClick = () => {
    setEditingUser(user);
    setEditSheetOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!editingUser || !user) return;
    
    setSaving(true);
    try {
      const updatedResident = await updateResidentWithId(user.id, {
        name: editingUser.name,
        dateOfBirth: editingUser.dateOfBirth,
        roomNumber: editingUser.roomNumber,
        gp: editingUser.gp || undefined,
        nextOfKin: editingUser.nextOfKin,
        contact: editingUser.contact || undefined,
        bio: editingUser.bio || undefined
      });
      
      if (updatedResident) {
        setUser(updatedResident);
        setEditSheetOpen(false);
        setEditingUser(null);
        showSuccessToast("Resident information updated successfully!");
      } else {
        showErrorToast("Failed to update resident information");
      }
    } catch (error) {
      console.error("Error updating resident:", error);
      showErrorToast("An error occurred while updating resident information");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field: keyof Resident, value: string | Date | number) => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [field]: value
      });
    }
  };

  console.log("user", user);
  console.log("appointments", appointments);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/user">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/list/resident/">Resident</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>id</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className=" mt-4 flex flex-col xl:flex-row gap-8">
        {/* Left*/}
        <div className="w-full xl:w-1/3 space-y-6">
          {/*User badges*/}
          <div className="border border-dashed p-4 rounded-l-lg flex-row space-y-2 ">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Name : {user?.name}</h1>
              <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant={"outline"} size={"icon"} onClick={handleEditClick}>
                    <Pencil></Pencil>
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Edit Resident Information</SheetTitle>
                    <SheetDescription>
                      Update the resident&apos;s information below.
                    </SheetDescription>
                  </SheetHeader>
                  
                  <div className="space-y-4 mt-6 mx-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={editingUser?.name || ""}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={editingUser?.dateOfBirth ? new Date(editingUser.dateOfBirth).toISOString().split('T')[0] : ""}
                        onChange={(e) => handleInputChange("dateOfBirth", new Date(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="roomNumber">Room Number</Label>
                      <Input
                        id="roomNumber"
                        type="number"
                        min="1"
                        value={editingUser?.roomNumber || ""}
                        onChange={(e) => handleInputChange("roomNumber", parseInt(e.target.value) || 1)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gp">GP</Label>
                      <Input
                        id="gp"
                        value={editingUser?.gp || ""}
                        onChange={(e) => handleInputChange("gp", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="nextOfKin">Next of Kin</Label>
                      <Input
                        id="nextOfKin"
                        value={editingUser?.nextOfKin || ""}
                        onChange={(e) => handleInputChange("nextOfKin", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact</Label>
                      <Input
                        id="contact"
                        value={editingUser?.contact || ""}
                        onChange={(e) => handleInputChange("contact", e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={editingUser?.bio || ""}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        variant="outline"
                        onClick={() => setEditSheetOpen(false)}
                        disabled={saving}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveEdit}
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <p className="text-foreground text-sm">
              Date of Birth : {user?.dateOfBirth ? new Date(user.dateOfBirth).toDateString() : "Not set"}
            </p>
            <p className="text-foreground text-sm">Room Number : {user?.roomNumber || "Not set"}</p>
            <p className="text-foreground text-sm">GP : {user?.gp || "Not set"}</p>
            <p className="text-foreground text-sm">Family : {user?.nextOfKin || "Not set"}</p>
            <p className="text-foreground text-sm">Contact : {user?.contact || "Not set"}</p>
            <p className="text-foreground text-sm">
              Bio: {user?.bio || "No bio available"}
            </p>
          </div>
          {/*User info*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            <div>
              <p className="my-7">
                {/* Meds for <span>{date}</span> */}
              </p>
              <Progress value={progress} />
              <MedsTable />
            </div>
            <div className="mt-5"></div>
          </div>
          {/*Appointments Card*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-semibold">Up Coming Appointments</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"outline"} size={"icon"}>
                    <Plus></Plus>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Add New Appointment</SheetTitle>
                    <SheetDescription>
                      Create a new appointment for this resident.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Appointments List */}
            <div className="space-y-3">
              {loadingAppointments ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading appointments...</p>
                </div>
              ) : appointments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="text-gray-400 mb-2">
                    <Calendar size={40} />
                  </div>
                  <p className="text-sm font-medium text-gray-600">No upcoming appointments</p>
                  <p className="text-xs text-gray-400">This resident has no scheduled appointments.</p>
                </div>
              ) : (
                appointments.map((appointment) => {
                  const { dateStr, timeStr } = formatDateTime(appointment.date, appointment.time);
                  
                  return (
                    <Card key={appointment.id} className="p-3 hover:shadow-sm transition-all duration-200 border-l-4 border-l-green-500">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user?.photo || undefined} alt={user?.name || "Resident"} />
                            <AvatarFallback className="bg-green-100 text-green-700 text-xs font-medium">
                              {user?.name?.split(' ').map(n => n[0]).join('') || 'R'}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-gray-900 text-sm">{user?.name}</h4>
                            <p className="text-xs text-gray-500">Room {user?.roomNumber}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-sm font-medium text-gray-900">{dateStr}</p>
                            <p className="text-xs text-gray-500">{timeStr}</p>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{appointment.scheduledWith}</p>
                            <div className="flex items-center justify-end space-x-1 mt-1">
                              <MapPin size={10} className="text-gray-400" />
                              <span className="text-xs text-gray-500">{appointment.venue}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })
              )}
            </div>
          </div>
        </div>
        {/* Left*/}
        <div className="w-full xl:w-2/3 space-y-6">
          {/*User Card*/}
          <div className="border border-dashed flex gap-4 p-4 rounded-l-lg">
            <Button>Daily Reoprt</Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Incidet Reoprt</Button>
              </DialogTrigger>
              <CreateIncidentFrom user={user} setOpen={setOpen} />
            </Dialog>

            <Button>Food & Fluid</Button>
            <Button>Body Map</Button>
            <Button>
              Care Plan <Folder />
            </Button>
          </div>
          {/*Chart container*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            <IncidetnChart></IncidetnChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingelResidentPage;
