"use client";

import { useState, useMemo, useEffect } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Plus, 
    Trash2, 
    Zap, 
    Battery, 
    ChevronRight, 
    Save, 
    RefreshCcw,
    Gauge,
    Info,
    Settings2,
    Clock,
    ShieldCheck
} from "lucide-react";
import { EQUIPMENT_PRESETS } from "@/tools-energy/constants";
import { calculateLoad, LoadItem, SystemSettings } from "@/tools-energy/lib/calculator-utils";
import { saveLoadCalculationAction } from "@/tools-energy/actions";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CatalogSearch } from "@/components/catalog/catalog-search";

export default function LoadCalculatorPage({ vehicles = [] }: { vehicles?: any[] }) {
    const [items, setItems] = useState<LoadItem[]>([]);
    const [settings, setSettings] = useState<SystemSettings>({
        voltage: 12,
        inverterEfficiency: 0.85,
        inverterIdleCurrent: 0.8,
        batteryCapacityAh: 100,
        batteryChemistry: 'lifepo4'
    });
    const [name, setName] = useState("My Rig Setup");
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>(vehicles[0]?.id);
    const [isSaving, setIsSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const results = useMemo(() => calculateLoad(items, settings), [items, settings]);

    const addItem = (preset?: typeof EQUIPMENT_PRESETS[0]) => {
        const newItem: LoadItem = preset 
            ? { ...preset, quantity: 1 }
            : { name: "New Device", watts: 0, hoursPerDay: 0, dutyCycle: 100, isAC: false, quantity: 1 };
        setItems([...items, newItem]);
    };

    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const updateItem = (index: number, field: keyof LoadItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const updateSettings = (field: keyof SystemSettings, value: any) => {
        setSettings({ ...settings, [field]: value });
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await saveLoadCalculationAction({
            name,
            vehicleId: selectedVehicleId,
            settings,
            items
        });

        if (result.success) {
            setSuccessMessage("Realistic calculation saved successfully!");
            setTimeout(() => setSuccessMessage(null), 3000);
        }
        setIsSaving(false);
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-7xl">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Load Calculator <Badge className="bg-primary/20 text-primary border-none">ENERGY 2.0</Badge>
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl">
                        Advanced off-grid dimensioning including inverter losses, idle current, and realistic battery DOD.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setItems([])}>
                        <RefreshCcw className="mr-2 h-4 w-4" /> Reset
                    </Button>
                    <Button 
                        onClick={handleSave} 
                        disabled={items.length === 0 || isSaving}
                        className="shadow-lg shadow-primary/20"
                    >
                        {isSaving ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Setup</>}
                    </Button>
                </div>
            </header>

            {successMessage && (
                <div className="mb-6 p-3 bg-primary/10 border border-primary/20 text-primary rounded-lg text-center font-medium animate-in fade-in slide-in-from-top-4 uppercase text-xs tracking-widest">
                    {successMessage}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left: Input & Settings Section */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Settings2 className="h-4 w-4 text-primary" /> 1. System Config
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Voltage</Label>
                                        <Select onValueChange={v => updateSettings("voltage", Number(v))} defaultValue="12">
                                            <SelectTrigger className="h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="12">12V DC</SelectItem>
                                                <SelectItem value="24">24V DC</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Inverter Idle (Amps)</Label>
                                        <Input 
                                            type="number" step="0.1" 
                                            value={settings.inverterIdleCurrent} 
                                            onChange={e => updateSettings("inverterIdleCurrent", Number(e.target.value))}
                                            className="h-9"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Inverter Efficiency (%)</Label>
                                    <div className="flex items-center gap-4">
                                        <Input 
                                            type="number" 
                                            value={settings.inverterEfficiency * 100} 
                                            onChange={e => updateSettings("inverterEfficiency", Number(e.target.value) / 100)}
                                            className="h-9"
                                        />
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">Typical: 85-95%</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <Battery className="h-4 w-4 text-primary" /> 2. Battery Bank
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Capacity (Ah)</Label>
                                        <Input 
                                            type="number" 
                                            value={settings.batteryCapacityAh} 
                                            onChange={e => updateSettings("batteryCapacityAh", Number(e.target.value))}
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label className="text-xs">Chemistry</Label>
                                        <Select onValueChange={v => updateSettings("batteryChemistry", v)} defaultValue="lifepo4">
                                            <SelectTrigger className="h-9">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="lifepo4">LiFePO4 (90% DoD)</SelectItem>
                                                <SelectItem value="lead-acid">AGM / Lead (50% DoD)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="p-2 rounded bg-primary/5 border border-primary/10 flex items-center gap-2">
                                    <ShieldCheck className="h-3 w-3 text-primary" />
                                    <span className="text-[10px] text-primary font-medium">
                                        Usable Energy: {results.usableCapacityAh.toFixed(1)} Ah
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">3. Appliances & Devices</CardTitle>
                                <CardDescription>Identify hidden AC losses by tagging inverter-powered items.</CardDescription>
                            </div>
                            <div className="flex gap-2">
                                <CatalogSearch onSelect={(product) => {
                                    const specs = product.specs as any;
                                    const newItem: LoadItem = {
                                        name: `${product.brand} - ${product.model}`,
                                        watts: specs.watts || 0,
                                        hoursPerDay: specs.avg_draw_ah ? 24 : 0,
                                        dutyCycle: specs.avg_draw_ah ? 100 : 100,
                                        isAC: specs.voltage?.includes("V") ? specs.voltage.includes("AC") || specs.voltage.includes("/") : false,
                                        quantity: 1
                                    };
                                    setItems([...items, newItem]);
                                }} />
                                <Button size="sm" onClick={() => addItem()} variant="outline" className="shrink-0">
                                    <Plus className="mr-2 h-4 w-4" /> Add Custom
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                           <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
                                {EQUIPMENT_PRESETS.map((preset) => (
                                    <button
                                        key={preset.name}
                                        onClick={() => addItem(preset)}
                                        className="flex flex-col items-center justify-center p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-center group"
                                    >
                                        <preset.icon className={`h-6 w-6 mb-2 ${preset.isAC ? 'text-accent' : 'text-muted-foreground'} group-hover:text-primary`} />
                                        <span className="text-[10px] font-medium leading-tight">{preset.name}</span>
                                        {preset.isAC && <Badge className="text-[8px] h-3 px-1 mt-1 bg-accent/20 text-accent-foreground border-none">AC</Badge>}
                                    </button>
                                ))}
                           </div>

                           <div className="space-y-4">
                               <AnimatePresence>
                                   {items.length === 0 ? (
                                       <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-xl">
                                           No items added yet. Click a preset above or add a custom row.
                                       </div>
                                   ) : (
                                       items.map((item, idx) => (
                                           <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="flex flex-wrap md:flex-nowrap items-end gap-3 p-4 rounded-lg bg-background/50 border border-border/30 relative group"
                                           >
                                               <div className="w-full md:w-auto md:flex-1 space-y-1">
                                                   <Label className="text-[10px] uppercase text-muted-foreground">Name</Label>
                                                   <Input 
                                                        value={item.name} 
                                                        onChange={e => updateItem(idx, "name", e.target.value)}
                                                        className="h-8 text-sm"
                                                   />
                                               </div>
                                               <div className="w-24 space-y-1">
                                                   <Label className="text-[10px] uppercase text-muted-foreground">Type</Label>
                                                   <Select onValueChange={v => updateItem(idx, "isAC", v === "ac")} defaultValue={item.isAC ? "ac" : "dc"}>
                                                        <SelectTrigger className="h-8 text-[10px]">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="dc">DC (Direct)</SelectItem>
                                                            <SelectItem value="ac">AC (Inverter)</SelectItem>
                                                        </SelectContent>
                                                   </Select>
                                               </div>
                                               <div className="w-20 space-y-1">
                                                   <Label className="text-[10px] uppercase text-muted-foreground">Watts</Label>
                                                   <Input 
                                                        type="number"
                                                        value={item.watts} 
                                                        onChange={e => updateItem(idx, "watts", Number(e.target.value))}
                                                        className="h-8 text-sm"
                                                   />
                                               </div>
                                               <div className="w-16 space-y-1">
                                                   <Label className="text-[10px] uppercase text-muted-foreground">Qty</Label>
                                                   <Input 
                                                        type="number"
                                                        value={item.quantity} 
                                                        onChange={e => updateItem(idx, "quantity", Number(e.target.value))}
                                                        className="h-8 text-sm"
                                                   />
                                               </div>
                                               <div className="w-20 space-y-1">
                                                   <Label className="text-[10px] uppercase text-muted-foreground">Hrs/Day</Label>
                                                   <Input 
                                                        type="number"
                                                        step="0.1"
                                                        value={item.hoursPerDay} 
                                                        onChange={e => updateItem(idx, "hoursPerDay", Number(e.target.value))}
                                                        className="h-8 text-sm"
                                                   />
                                               </div>
                                               <div className="w-20 space-y-1">
                                                   <Label className="text-[10px] uppercase text-muted-foreground text-center block">Duty %</Label>
                                                   <Input 
                                                        type="number"
                                                        value={item.dutyCycle} 
                                                        onChange={e => updateItem(idx, "dutyCycle", Number(e.target.value))}
                                                        className="h-8 text-sm text-center"
                                                   />
                                               </div>
                                               <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    onClick={() => removeItem(idx)}
                                                    className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                               >
                                                   <Trash2 className="h-4 w-4" />
                                               </Button>
                                           </motion.div>
                                       ))
                                   )}
                               </AnimatePresence>
                           </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Results / Dashboard */}
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20 sticky top-10">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl flex items-center">
                                <Gauge className="mr-2 h-5 w-5 text-primary" /> Reality Analysis
                            </CardTitle>
                            <CardDescription>Daily consumption with losses.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-background/80 border border-primary/20 flex flex-col items-center relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-1">
                                        <Zap className="h-3 w-3 text-primary opacity-30" />
                                     </div>
                                    <span className="text-4xl font-bold tracking-tighter text-primary">{Math.round(results.totalWh)}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Total Wh / Day</span>
                                </div>
                                <div className="p-4 rounded-xl bg-background/80 border border-primary/20 flex flex-col items-center">
                                    <span className="text-4xl font-bold tracking-tighter">{Math.round(results.totalAh)}</span>
                                    <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Total Ah / Day (@{settings.voltage}V)</span>
                                </div>
                            </div>

                            <div className="space-y-4 py-4 border-y border-border/50">
                                <div className="flex justify-between items-center text-sm">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-muted-foreground">Autonomy:</span>
                                    </div>
                                    <span className={`font-bold ${results.autonomyDays < 1 ? 'text-destructive' : 'text-primary'}`}>
                                        {results.autonomyDays.toFixed(1)} Days
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Inverter Overhead:</span>
                                    <span className="font-medium text-accent">
                                        {Math.round(settings.inverterIdleCurrent * settings.voltage * 24 / results.totalWh * 100 || 0)}%
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">System Loss:</span>
                                    <Badge variant="outline" className="text-[10px] h-5">Realistic</Badge>
                                </div>
                            </div>

                            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                                <div className="flex gap-2 text-accent-foreground">
                                    <Info className="h-4 w-4 shrink-0" />
                                    <p className="text-[10px] leading-tight font-medium">
                                        Fact: Inverters are least efficient at low loads. Your idle current accounts for <strong>{Math.round(settings.inverterIdleCurrent * settings.voltage * 24)}Wh</strong> daily.
                                    </p>
                                </div>
                            </div>
                            
                            <Link 
                                href="/tools/solar"
                                className={cn(
                                    buttonVariants({ size: "lg" }),
                                    "w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl shadow-primary/20"
                                )}
                            >
                                <ChevronRight className="mr-2 h-5 w-5" /> Next: Solar Setup
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
