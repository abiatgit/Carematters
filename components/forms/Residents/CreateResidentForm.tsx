"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const createResidentSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Minimum 2 letters required" })
    .max(50),
  lastName: z.string().min(1, { message: "Required" }).max(50),
  dateOfBirth: z.string().min(1, { message: "Required" }),
  roomNumber: z.coerce.number().min(1, { message: "Room number is required" }),
  gender: z.enum(["MALE", "FEMALE", "OTHER"]),
  unitId: z.string().min(1, { message: "Unit is required" }),
  teamLeadId: z.string().min(1, { message: "Team lead is required" }),
  gp: z.string().optional(),
  nextOfKin: z.string().min(1, { message: "Next of kin is required" }),
  photo: z.string().url().optional(),
});

const CreateResidentForm = () => {
  async function onSubmit(values: z.infer<typeof createResidentSchema>) {
    await fetch("/api/resident", {
      method: "POST",
      body: JSON.stringify({ values }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const form = useForm<z.infer<typeof createResidentSchema>>({
    resolver: zodResolver(createResidentSchema),
    defaultValues: {},
  });
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Create a New Resident</SheetTitle>
        <SheetDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roomNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Number</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unitId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Unit ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamLeadId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Lead ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Team Lead ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GP</FormLabel>
                    <FormControl>
                      <Input placeholder="Doctor name / reference" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nextOfKin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next of Kin</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Relative's name and contact"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default CreateResidentForm;
