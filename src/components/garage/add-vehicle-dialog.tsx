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
import { AUSTRALIAN_VEHICLES, getAllMakes, getModelsForMake } from "@/garage/lib/vehicles-data";

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
  const [selectedMake, setSelectedMake] = useState<string>("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<VehicleValues>({
    resolver: zodResolver(vehicleSchema),
  });

  const makes = getAllMakes();
  const models = selectedMake ? getModelsForMake(selectedMake) : [];

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
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button className="font-semibold shadow-lg shadow-primary/20 rounded-full px-6">
            <Plus className="mr-2 h-4 w-4" /> Add Vehicle
          </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-border/50 rounded-[2rem]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic italic tracking-tighter">ADD NEW RIG</DialogTitle>
          <DialogDescription>
            Select your vehicle details to start your build journey.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="make" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mr-auto block ml-1">Make</Label>
            <Select onValueChange={(val: string | null) => {
              if (val) {
                setSelectedMake(val);
                setValue("make", val);
                setValue("model", ""); // Reset model on make change
              }
            }}>
                <SelectTrigger className="h-12 bg-muted/50 border-none rounded-xl w-full">
                    <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                    {makes.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    <SelectItem value="Other">Other...</SelectItem>
                </SelectContent>
            </Select>
            {errors.make && <p className="text-xs text-destructive">{errors.make.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="model" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mr-auto block ml-1">Model</Label>
            {selectedMake && selectedMake !== "Other" ? (
                <Select onValueChange={(val: string | null) => { if (val) setValue("model", val) }}>
                    <SelectTrigger className="h-12 bg-muted/50 border-none rounded-xl w-full">
                        <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                        {models.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                    </SelectContent>
                </Select>
            ) : (
                <Input id="model" placeholder="Enter model name" className="h-12 bg-muted/50 border-none rounded-xl" {...register("model")} />
            )}
            {errors.model && <p className="text-xs text-destructive">{errors.model.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="year" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mr-auto block ml-1">Year</Label>
            <Input id="year" type="number" placeholder="e.g. 2024" className="h-12 bg-muted/50 border-none rounded-xl" {...register("year")} />
            {errors.year && <p className="text-xs text-destructive">{errors.year.message}</p>}
          </div>

          {error && <p className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-xl">{error}</p>}
          
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl font-bold text-lg">
              {loading ? "Adding..." : "Save Rig"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
