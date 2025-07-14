"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
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
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { useGlobalStore } from "@/store/globalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, Upload } from "lucide-react";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other"]).optional(),
  image: z.string().optional(),
});

interface EditProfileFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}

const EditProfileForm = ({ setOpen, onSuccess }: EditProfileFormProps) => {
  const { user, setUser } = useGlobalStore();
  const [uploadingImage, setUploadingImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(user?.image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      gender: user?.gender || undefined,
      image: user?.image || "",
    },
  });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      showErrorToast("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      showErrorToast("Please select a valid image file");
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        const imageUrl = data.url;
        setPreviewImage(imageUrl);
        form.setValue("image", imageUrl);
        showSuccessToast("Image uploaded successfully");
      } else {
        showErrorToast(data.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      showErrorToast("Failed to upload image");
    } finally {
      setUploadingImage(false);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        // Update the global store with new user data
        setUser({
          ...user,
          ...values,
        });
        showSuccessToast("Profile updated successfully");
        setOpen(false);
        onSuccess?.();
      } else {
        showErrorToast(data.error || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showErrorToast("Failed to update profile");
    }
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid gap-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-gray-200">
                  <AvatarImage 
                    src={previewImage || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} 
                    alt="Profile picture" 
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                  onClick={triggerImageUpload}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={triggerImageUpload}
                disabled={uploadingImage}
                className="flex items-center space-x-1 text-sm"
              >
                <Upload className="h-4 w-4" />
                <span>{uploadingImage ? "Uploading..." : "Change Photo"}</span>
              </Button>
            </div>

            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Enter your email address" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender (Optional)</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
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

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploadingImage}>
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
};

export default EditProfileForm;