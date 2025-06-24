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
import { useEffect, useState, useCallback } from "react";
import { Unit } from "@prisma/client";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useGlobalStore } from "@/store/globalStore";

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

interface CreateFormProp {
  onResidentCreated?: () => void;
  setOpen: (open: boolean) => void;
}

type MinimalCareHome = {
  id: string;
  name?: string;
} | null;

const CreateResidentForm = ({
  setOpen,
  onResidentCreated,
}: CreateFormProp) => {
  const { careHome } = useGlobalStore();
  const [unitList, setUnitList] = useState<Unit[]>([]);
  const [isLoadingUnits, setIsLoadingUnits] = useState(false);
  const [unitsFetched, setUnitsFetched] = useState(false);

 const fetchUnits = useCallback(async (careHome: MinimalCareHome) => {
    if (!careHome?.id || isLoadingUnits) return;

    setIsLoadingUnits(true);
    try {
      const res = await fetch(
        `/api/houses?careHomeId=${encodeURIComponent(careHome.id)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      
      if (data?.houses && Array.isArray(data.houses)) {
        setUnitList(data.houses);
        setUnitsFetched(true);
      } else {
        console.warn("No units found or invalid response format");
        setUnitList([]);
      }
    } catch (error) {
      console.error("Error fetching units:", error);
      showErrorToast("Failed to load units");
      setUnitList([]);
    } finally {
      setIsLoadingUnits(false);
    }
  }, [isLoadingUnits]);


  useEffect(() => {
    if (careHome?.id && !unitsFetched && !isLoadingUnits) {
      fetchUnits(careHome);
    }
  }, [careHome?.id, unitsFetched, isLoadingUnits, fetchUnits]);

  const form = useForm<z.infer<typeof createResidentSchema>>({
    resolver: zodResolver(createResidentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      roomNumber: 1,
      gender: undefined,
      unitId: "",
      gp: "",
      nextOfKin: "",
      photo: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createResidentSchema>) {
    try {
      const res = await fetch("/api/resident", {
        method: "POST",
        body: JSON.stringify({ values }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        showSuccessToast("New resident created successfully");
        form.reset(); 
        setOpen(false);
        onResidentCreated?.();
      } else {
        throw new Error(data.message || "Failed to create resident");
      }
    } catch (error) {
      console.error("Error creating resident:", error);
      showErrorToast("Error creating resident");
    }
  }

  return (
    <SheetContent className="p-5">
      <SheetHeader>
        <SheetTitle>Create a New Resident</SheetTitle>
        <SheetDescription>
          Fill in the details below to create a new resident profile.
        </SheetDescription>
      </SheetHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
                  <Input 
                    type="number" 
                    min="1"
                    placeholder="1"
                    {...field} 
                  />
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
                  value={field.value}
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
                  value={field.value}
                  disabled={isLoadingUnits}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue 
                        placeholder={
                          isLoadingUnits 
                            ? "Loading units..." 
                            : unitList.length === 0 
                              ? "No units available" 
                              : "Select a unit"
                        } 
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {unitList.map((unit) => (
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
          
          <FormField
            control={form.control}
            name="gp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GP (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Doctor name" {...field} />
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
                <FormLabel>Photo URL (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoadingUnits}
            >
              Create Resident
            </Button>
          </div>
        </form>
      </Form>
    </SheetContent>
  );
};

export default CreateResidentForm;