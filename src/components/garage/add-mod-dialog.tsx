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
import { addModAction } from "@/garage/actions";
import { Plus, Sparkles } from "lucide-react";
import { MOD_CATEGORIES } from "@/garage/constants";
import { CatalogSearch } from "@/components/catalog/catalog-search";

const modSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  url: z.string().url("Invalid URL").optional().or(z.literal("")),
  price: z.string().refine((val) => {
    if (!val) return true;
    const num = parseFloat(val);
    return !isNaN(num) && num >= 0;
  }, "Invalid price").optional(),
});

type ModValues = z.infer<typeof modSchema>;

interface AddModDialogProps {
  vehicleId: string;
}

export function AddModDialog({ vehicleId }: AddModDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ModValues>({
    resolver: zodResolver(modSchema),
    defaultValues: {
      category: "other"
    }
  });

  const selectedCategory = watch("category");

  async function onSubmit(data: ModValues) {
    setLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("vehicleId", vehicleId);
    formData.append("name", data.name);
    formData.append("category", data.category);
    if (data.brand) formData.append("brand", data.brand);
    if (data.url) formData.append("url", data.url);
    if (data.price) formData.append("price", data.price);

    const result = await addModAction(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setOpen(false);
      setLoading(false);
      reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="outline" size="sm" className="h-9">
          <Plus className="mr-2 h-4 w-4" /> Add Mod
        </Button>
      } />
      <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle>Add Modification</DialogTitle>
          <DialogDescription>
            Pesquise no catálogo oficial para preenchimento automático ou adicione manualmente.
          </DialogDescription>
        </DialogHeader>
        
        <div className="pt-4 border-b border-border/50 pb-6 mb-2">
            <Label className="text-[10px] uppercase font-black text-primary mb-2 block tracking-widest">Busca Pro (Recomendado)</Label>
            <CatalogSearch onSelect={(product) => {
                setValue("name", product.model);
                setValue("brand", product.brand);
                // In a real app we'd also set catalogProductId here
            }} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              onValueChange={(val) => setValue("category", val as string)} 
              defaultValue={selectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {MOD_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center">
                      <cat.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Ex: Heavy Duty Springs" {...register("name")} />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="brand">Brand</Label>
            <Input id="brand" placeholder="Ex: ARB, Old Man Emu..." {...register("brand")} />
            {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (R$)</Label>
              <Input id="price" type="number" step="0.01" placeholder="0.00" {...register("price")} />
              {errors.price && <p className="text-xs text-destructive">{errors.price.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">Product URL</Label>
              <Input id="url" placeholder="https://..." {...register("url")} />
              {errors.url && <p className="text-xs text-destructive">{errors.url.message}</p>}
            </div>
          </div>

          {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          
          <DialogFooter>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Adding..." : "Save Modification"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
