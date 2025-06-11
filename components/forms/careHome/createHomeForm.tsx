"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  address: z.string().min(2).max(50),
  postcode: z.string(),
  logo: z.string(),
});
type CareHomePro = {
  userId: string;
};
const CreateHome = ({ userId }: CareHomePro) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      postcode: "",
      logo: "",
    },
  });
  const succesTosting = () => {
    toast(
      <div className="flex items-center gap-2">
        <Check className="h-5 w-5 text-green-700" />
        Succesfuly Created Your Home
      </div>
    );
  };
  const errorTosting = () => {
    toast(
      <div className="flex items-center gap-2">
        <X className="h-5 w-5 text-red-700" />
        Error while Creating
      </div>
    );
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const payload = {
      ...values,
      createdBy: userId,
    };
    const res = await fetch("/api/carehome", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      succesTosting();
      router.push("/user");
    } else {
      errorTosting();
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex  items-center justify-center mt-5 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carehome Name</FormLabel>
                <FormControl>
                  <Input placeholder="Care home" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Code</FormLabel>
                <FormControl>
                  <Input placeholder="Post code" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="my-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carehome Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="address" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <Input placeholder="logo Link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="mt-5">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateHome;
