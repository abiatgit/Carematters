"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Save, Loader2, Building, MapPin, Image } from "lucide-react";
import { useGlobalStore } from "@/store/globalStore";
import { toast } from "sonner";

interface EditOrganizationFormProps {
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function EditOrganizationForm({ setOpen, onSuccess }: EditOrganizationFormProps) {
  const { careHome, setCareHome } = useGlobalStore();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    logo: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);

  // Fetch current organization data
  useEffect(() => {
    const fetchOrganizationData = async () => {
      if (!careHome?.id) {
        setFetchingData(false);
        return;
      }

      try {
        const response = await fetch(`/api/carehome/${careHome.id}`);
        const result = await response.json();

        if (result.success) {
          setFormData({
            name: result.careHome.name || "",
            address: result.careHome.address || "",
            logo: result.careHome.logo || "",
          });
        } else {
          // Fallback to global store data
          setFormData({
            name: careHome?.name || "",
            address: careHome?.address || "",
            logo: careHome?.logo || "",
          });
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
        // Fallback to global store data
        setFormData({
          name: careHome?.name || "",
          address: careHome?.address || "",
          logo: careHome?.logo || "",
        });
      } finally {
        setFetchingData(false);
      }
    };

    fetchOrganizationData();
  }, [careHome]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!careHome?.id) {
      toast.error("Organization ID not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/carehome/${careHome.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setCareHome({ ...careHome, ...formData });
        toast.success("Organization updated successfully");
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(result.error || "Failed to update organization");
      }
    } catch (error) {
      console.error("Error updating organization:", error);
      toast.error("Failed to update organization");
    } finally {
      setLoading(false);
    }
  };

  if (fetchingData) {
    return (
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span>Loading organization details...</span>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          Edit Organization
        </DialogTitle>
        <DialogDescription>
          Update your organization details and logo. Changes will be saved to your profile.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Organization Name
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter organization name"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Address
          </Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Enter organization address"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Logo URL
          </Label>
          <div className="space-y-3">
            <Input
              id="logo"
              name="logo"
              type="url"
              value={formData.logo}
              onChange={handleInputChange}
              placeholder="https://example.com/logo.png"
              className="w-full"
            />
            {formData.logo && (
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50">
                <img
                  src={formData.logo}
                  alt="Organization logo preview"
                  className="w-12 h-12 object-cover rounded-lg border"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Logo Preview</p>
                  <p className="text-xs text-gray-500 truncate">{formData.logo}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setFormData(prev => ({ ...prev, logo: "" }))}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-500">
            Paste a direct link to your organization&apos;s logo image. Supported formats: JPG, PNG, SVG, GIF
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading} className="bg-green-700 hover:bg-green-800">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}