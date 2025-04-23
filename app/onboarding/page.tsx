"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
export const formSchema = z.object({
  careHomeName: z.string().min(2, { message: "Name must be atleast 2 characters." }),
  address: z
    .string()
    .min(2, { message: "Address must be atleast 2 characters" }),
  totalRooms: z.number({ message: "Address must be atleast 2 characters" }),
});
type FormData = z.infer<typeof formSchema>;

const OnBoardingPage = () => {
  const router=useRouter()
  const {user}=useUser()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      careHomeName: "",
      address:"",
      totalRooms: 0,
    },
  });
  const submitHandle =async (data:FormData) => {

     const response= await fetch("/api/carehome",{
         method:"POST",
         body:JSON.stringify({
          ...data,
          createdBy:user?.id
         })
     })
     if(response.ok){
            router.push("/manager")
     }else{
      console.log("Failed to create")
     }
  };
  return (
    <div className="flex  justify-center">
      <form onSubmit={form.handleSubmit(submitHandle)}>
        <label className="m-3">CareHome Name</label>
        <br></br>
        <input
          className="border rounded-xl p-3 m-3 border-blue-400"
          placeholder="Care Home Name"
          {...form.register("careHomeName")}
        ></input>
             {form.formState.errors.totalRooms && (
          <p className="text-red-500">{form.formState.errors.address?.message}</p>
        )}
        <br></br>

        <label className="m-3">Address</label>
        <br></br>
        <input
          className="border rounded-xl p-3 m-3 border-blue-400"
          placeholder="Address"
          {...form.register("address")}
        ></input>
          {form.formState.errors.totalRooms && (
          <p className="text-red-500">{form.formState.errors.address?.message}</p>
        )}
        <br></br>

        <label className="m-3">Toatal rooms</label>
        <br></br>
        <input
          className="border rounded-xl p-3 m-3 border-blue-400"
          placeholder="Total Rooms"
          {...form.register("totalRooms", { valueAsNumber: true })}
        ></input>
        {form.formState.errors.totalRooms && (
          <p className="text-red-500">{form.formState.errors.totalRooms?.message}</p>
        )}
        <br></br>

        <button
          type="submit"
          className="bg-black p-4 m-3 text-white rounded-xl"
        >
          Get Started
        </button>
      </form>
    </div>
  );
};
export default OnBoardingPage;
