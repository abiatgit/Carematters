"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

const dummyHandover = Array.from({ length: 10 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    id: i,
    date: format(date, "yyyy-MM-dd"),
    unit: i % 2 === 0 ? "Ceridwen" : "Comgal",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus rhoncus tincidunt nisi, non porta justo volutpat non. Nulla facilisi. Sed blandit mi vitae lacinia tristique. Proin euismod, ligula eget aliquam finibus, magna dolor facilisis orci, vitae ultrices arcu massa vel enim.",
  };
});

export default function HandoverPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [unitFilter, setUnitFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filtered = dummyHandover.filter((item) => {
    const matchUnit = unitFilter === "all" || item.unit === unitFilter;
    const matchDate = dateFilter === "" || item.date === dateFilter;
    return matchUnit && matchDate;
  });

  const selectedNote = dummyHandover.find((item) => item.id === selectedId);

  return (
    <div className="">
      <div className=" mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <h1 className="text-xl font-semibold">Handover Notes</h1>
        <div className="flex flex-wrap gap-4 w-full sm:w-auto">
          <Input
            type="date"
            className="w-[160px]"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
          <Select onValueChange={setUnitFilter} defaultValue="all">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Filter by unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Ceridwen">Ceridwen</SelectItem>
              <SelectItem value="Comgal">Comgal</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {filtered.map((item) => (
          <Button
            key={item.id}
            variant={selectedId === item.id ? "default" : "outline"}
            onClick={() => setSelectedId(item.id)}
          >
            {item.date}
          </Button>
        ))}
      </div>

      {/* Selected Text */}
      {selectedNote && (
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">
              {selectedNote.unit} – {selectedNote.date}
            </h2>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">
            {selectedNote.text}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
