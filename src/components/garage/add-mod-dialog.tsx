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
import { addModAction } from "@/core-platform/actions/garage.actions";
import { Plus, Wrench } from "lucide-react";

const modSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
});

type ModValues = z.infer<typeof modSchema>;

export function AddModDialog({ vehicleId }: { vehicleId: string }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ModValues>({
    resolver: zodResolver(modSchema),
  });

  async function onSubmit(data: ModValues) {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("vehicleId", vehicleId);
    formData.append("name", data.name);
    formData.append("category", data.category);

    const result = await addModAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setOpen(false);
      setLoading(false);
    }
  }

  const categories = [
    "Electrical & Solar",
    "Suspension & Tyres",
    "Drivetrain & Engine",
    "Interior & Storage",
    "Exterior & Armor",
    "Camping & Lifestyle",
    "Other"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
            <Button variant="ghost" size="sm" className="font-bold text-primary cursor-pointer">
                <Plus className="h-4 w-4 mr-1" /> Add Mod
            </Button>
        }
      />
      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-border/50 rounded-[2rem] p-8 shadow-2xl">
        <DialogHeader>
          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
             <Wrench className="h-6 w-6" />
          </div>
          <DialogTitle className="text-3xl font-black italic tracking-tighter uppercase leading-none">ADD MOD</DialogTitle>
          <DialogDescription className="text-muted-foreground mt-2">
            Log a new modification to keep track of your build progress.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground block ml-1">Mod Name</Label>
            <Input id="name" placeholder="e.g. 2-Inch Lift Kit, Dual Batteries..." className="h-12 bg-muted/50 border-none rounded-xl font-medium" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-[10px] uppercase font-black tracking-widest text-muted-foreground block ml-1">Category</Label>
            <Select onValueChange={(val: string | null) => { if (val) setValue("category", val) }}>
                <SelectTrigger className="h-12 bg-muted/50 border-none rounded-xl w-full font-medium">
                    <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
          </div>

          {error && <p className="text-sm font-medium text-destructive bg-destructive/10 p-3 rounded-xl">{error}</p>}
          
          <DialogFooter className="pt-4">
            <Button type="submit" disabled={loading} className="w-full h-14 rounded-2xl font-black italic tracking-tighter text-xl shadow-xl shadow-primary/20 cursor-pointer">
              {loading ? "ADDING..." : "SAVE MOD"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
