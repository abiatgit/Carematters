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
import { Link, Loader2 } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  gender: z.enum(["male", "female", "other"]).optional(),
  image: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type UserData = {
  id: string;
  name: string | null;
  email: string;
  gender: "male" | "female" | "other" | null;
  image: string | null;
  role: string;
  unitId: string | null;
};

interface EditProfileFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}

const EditProfileForm = ({ setOpen, onSuccess }: EditProfileFormProps) => {
  const { user, setUser } = useGlobalStore();
  const [previewImage, setPreviewImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [fetchedUserData, setFetchedUserData] = useState<UserData | null>(null);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: undefined,
      image: "",
    },
  });

  // Fetch current user data from database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/user/profile", {
          method: "GET",
        });

        const data = await response.json();

        if (data.success && data.user) {
          const userData = data.user;
          setFetchedUserData(userData);
          
          // Update form with fetched data
          form.reset({
            name: userData.name || "",
            email: userData.email || "",
            gender: userData.gender || undefined,
            image: userData.image || "",
          });

          // Set preview image
          setPreviewImage(userData.image || "");
        } else {
          showErrorToast(data.error || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        showErrorToast("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [form]);

  const handleImageUrlChange = (value: string) => {
    setPreviewImage(value);
    form.setValue("image", value);
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
        // Update the global store with fresh user data from response
        setUser({
          ...user,
          ...data.user,
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
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span>Loading profile data...</span>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-20 w-20 border-2 border-gray-200">
                <AvatarImage 
                  src={previewImage || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="} 
                  alt="Profile picture" 
                />
                <AvatarFallback>
                  {fetchedUserData?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
              
              {/* Profile Image URL Field */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="flex items-center space-x-1">
                      <Link className="h-4 w-4" />
                      <span>Profile Picture URL</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/your-profile-picture.jpg" 
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleImageUrlChange(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <Button type="submit">
                Save Changes
              </Button>
            </DialogFooter>
            </form>
          </Form>
        )}
      </div>
    </DialogContent>
  );
};

export default EditProfileForm;