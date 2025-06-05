"use client";
import {
  Form,
  FormControl,
  FormDescription,
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
import { UploadCloud } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  address:z.string().min(2).max(50),
  postcode:z.string()
});
const CreateHome = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
         <FormItem>
      <FormLabel>Logo</FormLabel>
      <FormControl>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" className="flex items-center gap-2">
            <UploadCloud className="w-5 h-5" />
            Choose Image
          </Button>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                field.onChange(file); // Update the field value with the file
              }
            }}
            className="hidden" // hide the raw input visually
            id="image-upload"
          />
        </div>
      </FormControl>
      <FormDescription>Upload a JPG or PNG file (max 2MB)</FormDescription>
      <FormMessage />
    </FormItem>
        
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

export default CreateHome;
