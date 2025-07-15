"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, Loader2, Building, MapPin, Image, Link, Check, X, AlertCircle } from "lucide-react";
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
  const [logoValid, setLogoValid] = useState<boolean | null>(null);

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
    
    // Reset logo validation when URL changes
    if (name === 'logo') {
      setLogoValid(null);
    }
  };

  const validateLogo = (url: string) => {
    if (!url) {
      setLogoValid(null);
      return;
    }
    
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.onload = () => setLogoValid(true);
      img.onerror = () => setLogoValid(false);
      img.src = url;
    }
  };

  // Validate logo when URL changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.logo) {
        validateLogo(formData.logo);
      }
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [formData.logo]);

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
      <DialogContent className="sm:max-w-[600px]">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 border rounded-full flex items-center justify-center mb-4">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Loading Organization</h3>
          <p className="text-muted-foreground text-center">Fetching your organization details...</p>
        </div>
      </DialogContent>
    );
  }

  return (
    <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
      <DialogHeader className="pb-6">
        <DialogTitle className="flex items-center gap-3 text-xl">
          <div className="w-10 h-10 border rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5" />
          </div>
          Edit Organization
        </DialogTitle>
        <DialogDescription className="text-base">
          Update your organization information and branding. Changes will be reflected across the platform.
        </DialogDescription>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Organization Details Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building className="w-5 h-5" />
              Organization Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Organization Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Sunshine Care Home"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="e.g., 123 Main Street, City, Postcode"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Logo Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Image className="w-5 h-5" />
              Organization Logo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="logo" className="text-sm font-medium flex items-center gap-2">
                <Link className="w-4 h-4" />
                Logo Image URL
              </Label>
              <div className="relative">
                <Input
                  id="logo"
                  name="logo"
                  type="url"
                  value={formData.logo}
                  onChange={handleInputChange}
                  placeholder="https://your-domain.com/logo.png"
                  className="pr-10"
                />
                {formData.logo && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {logoValid === true && (
                      <Check className="h-5 w-5 text-foreground" />
                    )}
                    {logoValid === false && (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    {logoValid === null && formData.logo && (
                      <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Logo Preview */}
              {formData.logo && (
                <div className="mt-4">
                  <div className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {logoValid === true ? (
                        <div className="relative group">
                          <img
                            src={formData.logo}
                            alt="Organization logo preview"
                            className="w-20 h-20 object-cover rounded-lg border"
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 border border-dashed rounded-lg flex items-center justify-center">
                          <Image className="w-8 h-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Logo Preview</h4>
                          <p className="text-xs text-muted-foreground break-all">{formData.logo}</p>
                          
                          {logoValid === true && (
                            <div className="flex items-center gap-1 mt-2">
                              <Check className="w-3 h-3" />
                              <span className="text-xs font-medium">Valid image URL</span>
                            </div>
                          )}
                          
                          {logoValid === false && (
                            <div className="flex items-center gap-1 mt-2">
                              <AlertCircle className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground font-medium">Cannot load image</span>
                            </div>
                          )}
                        </div>
                        
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData(prev => ({ ...prev, logo: "" }))}
                          className="ml-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="border rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <Image className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div className="text-xs">
                    <p className="font-medium mb-1">Logo Guidelines:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Use a direct image URL (JPG, PNG, SVG, GIF)</li>
                      <li>• Recommended size: 200x200px or larger</li>
                      <li>• Square or rectangular logos work best</li>
                      <li>• Ensure the URL is publicly accessible</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel Changes
          </Button>
          
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Discard
            </Button>
            <Button 
              type="submit" 
              disabled={loading || (!!formData.logo && logoValid === false)} 
              className="min-w-[140px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </DialogContent>
  );
}