"use client";
import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useGlobalStore } from "@/store/globalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Unit } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fetchAllHouse } from "./action";

const appointmentSchema = z.object({
  venue: z.string().min(1, "Venue is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  scheduledWith: z.string().min(1, "With is required"),
  unitId: z.string().min(1, "Unit is required"),
  residentId: z.string().min(1, "Resident is required"),
});

interface AppointmentSheetFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
  preselectedResidentId?: string;
  preselectedUnitId?: string;
  residentName?: string;
  unitName?: string;
}

const AppointmentSheetForm = ({
  setOpen,
  onSuccess,
  preselectedResidentId,
  preselectedUnitId,
  residentName,
  unitName,
}: AppointmentSheetFormProps) => {
  const { careHome } = useGlobalStore();
  const [unitList, setUnitList] = useState<Unit[] | null>(null);
  const [residents, setResident] = useState<Unit[] | null>(null);

  const fetchUnit = async (id: string | undefined) => {
    const data = await fetchAllHouse(id);
    setUnitList(data);
  };

  const fetchResident = async (unitId: string) => {
    if (!unitId) return;
    const res = await fetch(`/api/resident?unitId=${unitId}`, {
      method: "GET",
    });
    const data = await res.json();
    setResident(data.residents);
  };

  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      venue: "",
      date: "",
      time: "",
      scheduledWith: "",
      unitId: preselectedUnitId || "",
      residentId: preselectedResidentId || "",
    },
  });

  useEffect(() => {
    fetchUnit(careHome?.id);
    if (preselectedUnitId) {
      fetchResident(preselectedUnitId);
    }
    
    // Set form values when preselected values are provided
    if (preselectedUnitId) {
      form.setValue("unitId", preselectedUnitId);
    }
    if (preselectedResidentId) {
      form.setValue("residentId", preselectedResidentId);
    }
  }, [careHome?.id, preselectedUnitId, preselectedResidentId, form]);

  async function onSubmit(values: z.infer<typeof appointmentSchema>) {
    const res = await fetch("/api/appointment", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await res.json();

    if (data.success) {
      showSuccessToast("New appointment created");
      setOpen(false);
      onSuccess?.();
    } else {
      showErrorToast("Error creating appointment");
    }
  }

  return (
    <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
      <SheetHeader className="flex-shrink-0">
        <SheetTitle>Add New Appointment</SheetTitle>
        <SheetDescription>
          Create a new appointment for this resident.
        </SheetDescription>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto">
        <div className="mx-4 mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pb-4">
              {preselectedUnitId && unitName ? (
                <div>
                  <FormField
                    control={form.control}
                    name="unitId"
                    render={({ field }) => (
                      <input type="hidden" {...field} />
                    )}
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Unit
                    </label>
                    <Input
                      value={unitName}
                      disabled
                      className="bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="unitId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          fetchResident(value);
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a House" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitList?.map((unit) => (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {preselectedResidentId && residentName ? (
                <div>
                  <FormField
                    control={form.control}
                    name="residentId"
                    render={({ field }) => (
                      <input type="hidden" {...field} />
                    )}
                  />
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Resident
                    </label>
                    <Input
                      value={residentName}
                      disabled
                      className="bg-gray-50 text-gray-700"
                    />
                  </div>
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name="residentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Resident</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Resident" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {residents?.map((resident) => (
                            <SelectItem key={resident.id} value={resident.id}>
                              {resident.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input placeholder="GP Surgery Belfast" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="scheduledWith"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled With</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. John King" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Create Appointment</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </SheetContent>
  );
};

export default AppointmentSheetForm;