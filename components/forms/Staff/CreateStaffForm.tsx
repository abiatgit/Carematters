import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

export const staffSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  role: z.enum(["MANAGER", "TEAM_LEAD", "SUPPORT_WORKER"]),
  unitId: z.string().optional(),
  photURL:z.string(),
  onboarded:z.boolean().optional()
});

const CreateStaffForm = () => {
  const form = useForm<z.infer<typeof staffSchema>>({
    resolver: zodResolver(staffSchema),
    defaultValues: {},
  });
  async function onSubmit (values: z.infer<typeof staffSchema>) {
   values={...values,onboarded:true}
   console.log(values)
        const res=await fetch("/api/staff",{
        method:"POST",
        headers:{
           "Content-Type": "application/json",
        },
        body:JSON.stringify(values)
        })
        const data=await res.json()
        console.log(data)
       
  }
  return (
    <DialogHeader>
      <DialogTitle className="font-bold">Create  new staff</DialogTitle>
      <DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>Staff&apos;s full name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@domain.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Staff&apos;s login email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormDescription>At least 6 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
      <div className="flex gap-5">
              <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <div className="mb-5">
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">
                         Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
               
                  <FormMessage />
                </FormItem>
                   </div>
              )}
            />
                  <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <div className="mb-5">
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="MANAGER">Manager</SelectItem>
                        <SelectItem value="TEAM_LEAD">Team Lead</SelectItem>
                        <SelectItem value="SUPPORT_WORKER">
                          Support Worker
                        </SelectItem>
                      </SelectContent>
                    </Select>
               
                  <FormMessage />
                </FormItem>
                   </div>
              )}
            />
      </div>
            <FormField
              control={form.control}
              name="unitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit / House</FormLabel>
                  <FormControl>
                    <Input placeholder="Rose House" {...field} />
                  </FormControl>
                  <FormDescription>
                   Assign the staff to a unit or house where they work.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo Url</FormLabel>
                  <FormControl>
                    <Input placeholder="Photo url" {...field} />
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogDescription>
    </DialogHeader>
  );
};

export default CreateStaffForm;
