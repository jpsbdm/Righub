"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addVehicleAction } from "@/core-platform/actions/garage.actions";
import { Plus } from "lucide-react";

const vehicleSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num >= 1900 && num <= new Date().getFullYear() + 1;
  }, "Invalid year"),
});

type VehicleValues = z.infer<typeof vehicleSchema>;

export function AddVehicleDialog() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<VehicleValues>({
    resolver: zodResolver(vehicleSchema),
  });

  async function onSubmit(data: VehicleValues) {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("make", data.make);
    formData.append("model", data.model);
    formData.append("year", data.year.toString());

    const result = await addVehicleAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setOpen(false);
      setLoading(false);
      // Success triggers revalidation via server action
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button className="font-semibold shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Add Vehicle
        </Button>
      } />
      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>
            Enter the details of your rig to start tracking builds and calculations.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="make">Make</Label>
            <Input id="make" placeholder="Toyota, Ford, Jeep..." {...register("make")} />
            {errors.make && <p className="text-xs text-destructive">{errors.make.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Input id="model" placeholder="Hilux, F-150, Wrangler..." {...register("model")} />
            {errors.model && <p className="text-xs text-destructive">{errors.model.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input id="year" type="number" placeholder="2024" {...register("year")} />
            {errors.year && <p className="text-xs text-destructive">{errors.year.message}</p>}
          </div>
          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Adding..." : "Save Vehicle"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
