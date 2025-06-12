"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCareHomeStore } from "@/store/globalStore";

export const createResidentSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Minimum 2 letters required" })
    .max(50),
  lastName: z.string().min(1, { message: "Required" }).max(50),
  dateOfBirth: z.string().min(1, { message: "Required" }),
  roomNumber: z.coerce.number().min(1, { message: "Room number is required" }),
  gender: z.enum(["male", "female", "other"]),
  unitId: z.string().min(1, { message: "Unit is required" }),
  gp: z.string().optional(),
  nextOfKin: z.string().min(1, { message: "Next of kin is required" }),
  photo: z.string().url().optional(),
});

const CreateResidentForm = ({setOpen}:{setOpen:(open:boolean)=>void}) => {

  
  const { units } = useCareHomeStore();
  

  async function onSubmit(values: z.infer<typeof createResidentSchema>) {
   const res = await fetch("/api/resident", {
      method: "POST",
      body: JSON.stringify({ values }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data=await res.json()
    setOpen(false)
    if (data.sccess){

    }
  }
  const form = useForm<z.infer<typeof createResidentSchema>>({
    resolver: zodResolver(createResidentSchema),
    defaultValues: {
    },
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
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
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
                        {units.map((unit) => {
                          return (
                            <SelectItem key={unit.id} value={unit.id}>
                              {unit.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
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
                      <Input placeholder="Doctor name " {...field} />
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
