"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { Unit } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const appoinmentSchema = z.object({
  venue: z.string().min(1, "Venue is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  scheduledWith: z.string().min(1, "With is required"),
  unitId: z.string().min(1, "Unit is required"),
  residentId: z.string().min(1, "Resident is required"),
});

const AppointmentForm = () => {
  const [unitList, setUnitList] = useState<Unit[] | null>(null);
  const [residents, setResident] = useState<Unit[] | null>(null);

  const fetchUnit = async () => {
    const res = await fetch("/api/houses", {
      method: "GET",
    });
    const data = await res.json();
    setUnitList(data.houses);
  };
  useEffect(() => {
    fetchUnit();
    fetchResident();
  }, []);
const fetchResident = async () => {
    const res = await fetch("/api/resident", {
      method: "GET",
    });
    const data = await res.json();
    setResident(data.residents);
  };

  const form = useForm<z.infer<typeof appoinmentSchema>>({
    resolver: zodResolver(appoinmentSchema),
    defaultValues: {
      venue: "",
      date: "",
      time: "",
      scheduledWith: "",
      unitId: "",
      residentId: "",
    },
  });
  async function onSubmit(values: z.infer<typeof appoinmentSchema>) {
     const res=await fetch("/api/appoinment",{
      method:"POST",
      body:JSON.stringify(values)
    })
    const data=await res.json()
    console.log(data)

  }

  return (
    <div>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle> Appoinment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="unitId"
                render={({ field }) => (
                  <div className="mb-5">
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a House" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitList?.map((unit) => {
                            return (
                              <SelectItem key={unit.id} value={unit.id}>
                                {unit.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="residentId"
                render={({ field }) => (
                  <div className="mb-5">
                    <FormItem>
                      <FormLabel>Resident</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Resident" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {residents?.map((resident) => {
                            return (
                              <SelectItem key={resident.id} value={resident.id}>
                                {resident.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="venue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Venue</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Gp Surgery Belfast"
                        {...field}
                      ></Input>
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
                    <FormLabel>With</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr.John King" {...field}></Input>
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
                      <Input placeholder="Time" type="date" {...field}></Input>
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
                      <Input placeholder="Time" type="time" {...field}></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter className="mt-5">
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </div>
  );
};

export default AppointmentForm;
