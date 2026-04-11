"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
    Truck, 
    Zap, 
    Clock, 
    Settings2, 
    ChevronRight, 
    Info,
    RefreshCcw,
    Trash2
} from "lucide-react";
import { calculateDcdcGeneration, DcdcSettings, DCDC_PRESETS } from "@/tools-energy/services/dcdc.service";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DcdcCalculatorUI() {
    const [settings, setSettings] = useState<DcdcSettings>({
        chargerAmps: 30,
        systemVoltage: 12,
        drivingHoursPerDay: 2,
        efficiency: 0.95
    });

    const result = useMemo(() => calculateDcdcGeneration(settings), [settings]);

    const updateSettings = (field: keyof DcdcSettings, value: number) => {
        setSettings({ ...settings, [field]: value });
    };

    const applyPreset = (id: string) => {
        const preset = DCDC_PRESETS.find(p => p.id === id);
        if (preset) {
            setSettings({ 
                ...settings, 
                chargerAmps: preset.amps, 
                systemVoltage: preset.voltage 
            });
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-1 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Truck className="h-5 w-5 text-primary" /> Carregamento via Alternador (DCDC)
                        </CardTitle>
                        <CardDescription>Calcule quanta energia você gera enquanto dirige.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Presets Row */}
                        <div className="space-y-3">
                            <Label className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Presets do Catálogo</Label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {DCDC_PRESETS.map(preset => (
                                    <button
                                        key={preset.id}
                                        onClick={() => applyPreset(preset.id)}
                                        className="flex flex-col items-start p-3 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                                    >
                                        <span className="text-[10px] font-bold text-primary uppercase">{preset.brand}</span>
                                        <span className="text-sm font-semibold truncate w-full">{preset.model}</span>
                                        <div className="mt-2 flex items-center gap-2">
                                            <Badge variant="secondary" className="text-[9px] px-1.5">{preset.amps}A</Badge>
                                            <Badge variant="outline" className="text-[9px] px-1.5">{preset.voltage}V</Badge>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/30">
                            <div className="space-y-2">
                                <Label>Corrente do Carregador (Amps)</Label>
                                <div className="relative">
                                    <Input 
                                        type="number" 
                                        value={settings.chargerAmps} 
                                        onChange={e => updateSettings('chargerAmps', Number(e.target.value))}
                                        className="bg-background/50 pl-9"
                                    />
                                    <Zap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-[10px] text-muted-foreground">Ex: 30A ou 60A são comuns.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Horas de Estrada por Dia</Label>
                                <div className="relative">
                                    <Input 
                                        type="number" 
                                        value={settings.drivingHoursPerDay} 
                                        onChange={e => updateSettings('drivingHoursPerDay', Number(e.target.value))}
                                        className="bg-background/50 pl-9"
                                    />
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-[10px] text-muted-foreground">Média de tempo com motor ligado.</p>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-border/30">
                            <div className="flex justify-between items-center">
                                <Label className="text-xs">Eficiência do Sistema</Label>
                                <span className="text-xs font-bold">{Math.round(settings.efficiency * 100)}%</span>
                            </div>
                            <input 
                                type="range" 
                                min="0.8" 
                                max="1.0" 
                                step="0.01" 
                                value={settings.efficiency}
                                onChange={e => updateSettings('efficiency', Number(e.target.value))}
                                className="w-full accent-primary h-1 bg-muted rounded-full appearance-none cursor-pointer"
                            />
                            <p className="text-[10px] text-muted-foreground">Considera perdas em cabos e calor (~95% p/ DCDC).</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Result Column */}
            <div className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 sticky top-10">
                    <CardHeader>
                        <CardTitle className="text-lg">Geração Estimada</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center p-6 rounded-2xl bg-background/80 border border-primary/20">
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={result.dailyGenerationWh}
                                className="text-4xl font-black text-primary tracking-tighter"
                            >
                                +{Math.round(result.dailyGenerationWh)} Wh
                            </motion.div>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mt-1">Por dia de Estrada</p>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-border/50">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Amperagem Diária:</span>
                                <span className="font-bold">{Math.round(result.dailyGenerationAh)} Ah</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Tensão do Sistema:</span>
                                <span className="font-bold">{settings.systemVoltage}V</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex gap-3">
                            <Info className="h-5 w-5 text-primary shrink-0" />
                            <p className="text-[10px] font-medium leading-tight">
                                Esta energia é gerada apenas enquanto o motor está funcionando. É a fonte mais estável para recargas rápidas.
                            </p>
                        </div>

                        <Button className="w-full h-12 font-bold gap-2" variant="default">
                            <Settings2 className="h-4 w-4" /> Salvar Configuração
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
