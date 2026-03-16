'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SellScrap = () => {
  const [date, setDate] = useState<Date>();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex flex-col items-center justify-center py-24 text-center animate-fade-in">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-4">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Request Submitted!</h1>
          <p className="mt-2 text-muted-foreground max-w-sm">Your scrap pickup request has been placed. We&apos;ll assign a pickup agent soon.</p>
          <Button className="mt-6" onClick={() => setSubmitted(false)}>Submit Another</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-8">
        <div className="mx-auto max-w-lg animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Sell Your Scrap</h1>
          <p className="mt-1 text-sm text-muted-foreground mb-6">Fill in the details and we&apos;ll schedule a pickup.</p>

          <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
            <div className="space-y-2">
              <Label>Scrap Category</Label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newspaper">Newspaper & Paper</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="plastic">Plastic</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="qty">Estimated Quantity (kg)</Label>
              <Input id="qty" type="number" placeholder="e.g. 10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Pickup Address</Label>
              <Textarea id="address" placeholder="Enter your full address" rows={3} />
            </div>

            <div className="space-y-2">
              <Label>Preferred Pickup Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>

            <Button className="w-full" onClick={() => setSubmitted(true)}>Submit Request</Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SellScrap;
