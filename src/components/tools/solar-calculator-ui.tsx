"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Sun, 
    Zap, 
    Battery, 
    ChevronRight, 
    TrendingUp,
    TrendingDown,
    Info,
    AlertCircle,
    CloudSun,
    Save
} from "lucide-react";
import { calculateSolarRequirement, SolarSettings, estimateDailyProduction } from "@/tools-energy/services/solar.service";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SolarCalculatorUI({ initialConsumptionWh = 0 }) {
    const [consumptionWh, setConsumptionWh] = useState(initialConsumptionWh);
    const [panelWatts, setPanelWatts] = useState(200);
    const [settings, setSettings] = useState<SolarSettings>({
        peakSunHours: 4.5,
        panelEfficiencyFactor: 0.8,
        controllerType: 'mppt',
        rechargeTargetPercent: 120 // 20% margin
    });

    const requirement = useMemo(() => 
        calculateSolarRequirement(consumptionWh, settings), 
    [consumptionWh, settings]);

    const production = useMemo(() => 
        estimateDailyProduction(panelWatts, settings), 
    [panelWatts, settings]);

    const balance = production - consumptionWh;
    const isDeficit = balance < 0;

    const updateSettings = (field: keyof SolarSettings, value: any) => {
        setSettings({ ...settings, [field]: value });
    };

    return (
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
            <header className="mb-10">
                <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
                    Solar Calculator <Sun className="h-8 w-8 text-primary animate-pulse" />
                </h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    Calculate how many panels you need to recharge your rig based on your daily consumption and location.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Inputs */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                        <CardHeader>
                            <CardTitle className="text-xl">1. Consumption & Location</CardTitle>
                            <CardDescription>How much energy do you need and where are you?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Daily Consumption (Wh)</Label>
                                    <div className="flex gap-2">
                                        <Input 
                                            type="number" 
                                            value={consumptionWh} 
                                            onChange={e => setConsumptionWh(Number(e.target.value))}
                                            className="bg-background/50 h-10"
                                        />
                                        <Button variant="outline" size="icon" className="shrink-0" title="Pull from Load Calculator">
                                            <TrendingUp className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground">Total energy spent in 24h.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Peak Sun Hours (h)</Label>
                                    <Select onValueChange={v => updateSettings("peakSunHours", Number(v))} defaultValue="4.5">
                                        <SelectTrigger className="h-10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="3">3.0h (Winter / South)</SelectItem>
                                            <SelectItem value="4.5">4.5h (Average Brazil)</SelectItem>
                                            <SelectItem value="5.5">5.5h (Summer / North)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Info className="h-3 w-3" /> Hours where panel produces at 100%.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                        <CardHeader>
                            <CardTitle className="text-xl">2. Solar Hardware</CardTitle>
                            <CardDescription>Define your panels and charge controller.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Total Installed Watts (Wp)</Label>
                                    <Input 
                                        type="number" 
                                        value={panelWatts} 
                                        onChange={e => setPanelWatts(Number(e.target.value))}
                                        className="bg-background/50 h-10"
                                    />
                                    <p className="text-[10px] text-muted-foreground">Sum of all your panels.</p>
                                </div>
                                <div className="space-y-2">
                                    <Label>Controller Type</Label>
                                    <Select onValueChange={v => updateSettings("controllerType", v)} defaultValue="mppt">
                                        <SelectTrigger className="h-10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="mppt">MPPT (98% efficient)</SelectItem>
                                            <SelectItem value="pwm">PWM (~75% efficient)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-border/30">
                                <Label className="text-xs text-muted-panelEfficiencyFactor">Panel Efficiency / Loss Factor (e.g. Shading, Dirt, Temp)</Label>
                                <div className="flex items-center gap-4 mt-2">
                                    <Input 
                                        type="number" 
                                        value={settings.panelEfficiencyFactor * 100} 
                                        onChange={e => updateSettings("panelEfficiencyFactor", Number(e.target.value) / 100)}
                                        className="w-24 h-9"
                                    />
                                    <span className="text-[10px] text-muted-foreground">Typical: 80% (20% loss is normal in RVs/Boats)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Dashboard */}
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20 sticky top-10">
                        <CardHeader>
                            <CardTitle className="text-xl flex items-center gap-2">
                                <CloudSun className="h-5 w-5 text-primary" /> Energy Balance
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col items-center p-6 rounded-2xl bg-background/80 border border-primary/20 relative">
                                <div className={`text-4xl font-black tracking-tighter ${isDeficit ? 'text-destructive' : 'text-primary'}`}>
                                    {isDeficit ? '' : '+'}{Math.round(balance)} Wh
                                </div>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Daily Net Balance</span>
                                
                                <div className="mt-4 flex gap-2">
                                    <Badge variant={isDeficit ? "destructive" : "default"} className="text-[10px]">
                                        {isDeficit ? "Deficit" : "Surplus"}
                                    </Badge>
                                    <Badge variant="outline" className="text-[10px]">
                                        Real Efficiency: {Math.round(requirement.totalEfficiency * 100)}%
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t border-border/50">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Estimated Production:</span>
                                    <span className="font-bold text-primary">{Math.round(production)} Wh/day</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Target Panels:</span>
                                    <span className="font-bold">{Math.round(requirement.targetPanelWatts)} Watts</span>
                                </div>
                            </div>

                            <AnimatePresence>
                                {isDeficit && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive flex gap-3"
                                    >
                                        <AlertCircle className="h-5 w-5 shrink-0" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-tight">System Underpowered</p>
                                            <p className="text-[10px] font-medium leading-tight">
                                                You need at least <strong>{Math.round(requirement.targetPanelWatts - panelWatts)}W</strong> more to cover your consumption.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!isDeficit && (
                                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary flex gap-3">
                                    <Zap className="h-5 w-5 shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-tight">Power Positive</p>
                                        <p className="text-[10px] font-medium leading-tight">
                                            This setup will fully recharge your battery in <strong>{Math.round(settings.peakSunHours)}</strong> peak hours.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <Button className="w-full h-12 text-lg font-bold" disabled={true}>
                                <Save className="mr-2 h-5 w-5" /> Save Solar Config
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
