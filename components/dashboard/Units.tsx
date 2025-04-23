import { Plus } from "lucide-react";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Units = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 p-4">
      <Card className="sm:col-span-1">
        <CardHeader>
          <CardTitle>Unit 1</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="text-sm text-muted-foreground">Room A</li>
            <li className="text-sm text-muted-foreground">Room B</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="sm:col-span-1">
        <CardHeader>
          <CardTitle>Unit 2</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            <li className="text-sm text-muted-foreground">Room C</li>
            <li className="text-sm text-muted-foreground">Room D</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="flex items-center justify-center sm:col-span-1 hover:bg-muted transition-colors cursor-pointer">
        <Button variant="ghost" size="icon">
          <Plus className="h-6 w-6" />
        </Button>
      </Card>
    </div>
  );
};

export default Units;
