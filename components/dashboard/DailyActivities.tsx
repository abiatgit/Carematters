"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const DailyActivities = () => {
  const [food, setFood] = useState({
    breakfast: "",
    lunch: "",
    dinner: "",
    supper: "",
    fluids: "",
  });

  const [personalCare, setPersonalCare] = useState({
    shower: false,
    toilet: false,
    personalCare: false,
  });

  const [dailyNotes, setDailyNotes] = useState({
    time: "",
    notes: "",
  });

  const handleFoodChange = (field: string, value: string) => {
    setFood({ ...food, [field]: value });
  };

  const handlePersonalCareChange = (field: string, value: boolean) => {
    setPersonalCare({ ...personalCare, [field]: value });
  };

  const handleDailyNotesChange = (field: string, value: string) => {
    setDailyNotes({ ...dailyNotes, [field]: value });
  };

  const logFood = (meal: string) => {
    if (food[meal]) {
      console.log(`${meal}:`, food[meal]);
      // Save to backend
    }
  };

  const submitPersonalCare = () => {
    console.log("Personal Care:", personalCare);
    // Save to backend
  };

  const submitDailyNotes = () => {
    console.log("Daily Notes:", dailyNotes);
    // Save to backend
  };

  return (
    <div className="space-y-6">
      {/* Box 1: Food and Fluid */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <img
              src="/avatar.png"
              alt="Resident"
              className="w-16 h-16 rounded-full object-cover border"
            />
            <div>
              <h4 className="text-lg font-semibold">John Doe</h4>
              <p className="text-sm text-gray-500">Room 101</p>
            </div>
          </div>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="space-y-6">
          {["breakfast", "lunch", "dinner", "fluids"].map((meal) => (
            <div key={meal}>
              <label className="block text-sm font-medium capitalize mb-2">
                {meal}
              </label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder={`Enter ${meal} item`}
                  value={food[meal as keyof typeof food]}
                  onChange={(e) => handleFoodChange(meal, e.target.value)}
                />
                <Button
                  onClick={() => logFood(meal)}
                  variant="secondary"
                  className="whitespace-nowrap"
                >
                  Add
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Box 2: Personal Care */}
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Personal Care</h4>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { id: "shower", label: "Shower" },
              { id: "toilet", label: "Toilet" },
              { id: "personalCare", label: "Personal Care" },
            ].map(({ id, label }) => (
              <div className="flex items-center gap-2" key={id}>
                <Checkbox
                  id={id}
                  checked={personalCare[id as keyof typeof personalCare]}
                  onCheckedChange={(checked) =>
                    handlePersonalCareChange(id, checked as boolean)
                  }
                />
                <Label htmlFor={id}>{label}</Label>
              </div>
            ))}
          </div>
          <Button onClick={submitPersonalCare}>Save Personal Care</Button>
        </CardContent>
      </Card>

      {/* Box 3: Daily Notes */}
      <Card>
        <CardHeader>
          <h4 className="text-lg font-semibold">Daily Activity Notes</h4>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="time"
            value={dailyNotes.time}
            onChange={(e) => handleDailyNotesChange("time", e.target.value)}
          />
          <Textarea
            placeholder="Notes about daily activities..."
            value={dailyNotes.notes}
            onChange={(e) => handleDailyNotesChange("notes", e.target.value)}
          />
          <Button onClick={submitDailyNotes}>Save Activity Notes</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DailyActivities;
