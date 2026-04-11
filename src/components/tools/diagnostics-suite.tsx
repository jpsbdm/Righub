"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoadCalculatorUI from "./load-calculator-ui";
import SolarCalculatorUI from "./solar-calculator-ui";
import DcdcCalculatorUI from "./dcdc-calculator-ui";
import RatingDashboard from "./rating-dashboard";
import { calculateSystemRating, RatingInput } from "@/tools-energy/services/rating.service";
import { Zap, Sun, ShieldCheck, Battery, Truck } from "lucide-react";

export default function DiagnosticsSuite({ vehicles = [] }: { vehicles?: any[] }) {
    // Shared State (Simulated since DB check is skipped for now)
    const [consumptionWh, setConsumptionWh] = useState(2500);
    const [peakWatts, setPeakWatts] = useState(1500);
    const [solarWatts, setSolarWatts] = useState(400);
    const [batteryAh, setBatteryAh] = useState(200);
    const [inverterWatts, setInverterWatts] = useState(2000);
    const [batteryType, setBatteryType] = useState<'lithium' | 'agm' | 'lead-acid'>('lithium');

    const ratingInput: RatingInput = {
        dailyConsumptionWh: consumptionWh,
        peakConsumptionWatts: peakWatts,
        solarWatts: solarWatts,
        peakSunHours: 4.5, // Brazilian average
        dcdcAmps: 30, // Default assumption
        avgDrivingHours: 2,
        batteryAh: batteryAh,
        batteryVoltage: 12,
        batteryType: batteryType,
        inverterWatts: inverterWatts
    };

    const rating = useMemo(() => calculateSystemRating(ratingInput), [ratingInput]);

    return (
        <div className="container mx-auto py-10 px-4 max-w-7xl">
            <header className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight">Análise de Energia 2.0</h1>
                    <p className="text-muted-foreground mt-2">
                        Configure seu consumo, geração e veja o diagnóstico completo do seu setup.
                    </p>
                </div>
                <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
                   <div className="px-4 py-2 flex flex-col items-center">
                        <span className="text-2xl font-black text-primary">{rating.score.toFixed(1)}</span>
                        <span className="text-[10px] uppercase font-bold opacity-50">Rating</span>
                   </div>
                </div>
            </header>

            <Tabs defaultValue="rating" className="space-y-8">
                <div className="flex justify-center md:justify-start">
                    <TabsList className="bg-background/50 border border-border/50 p-1 h-auto gap-1">
                        <TabsTrigger value="rating" className="gap-2 px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                            <ShieldCheck className="h-4 w-4" /> Diagnóstico
                        </TabsTrigger>
                        <TabsTrigger value="load" className="gap-2 px-6 py-3">
                            <Zap className="h-4 w-4" /> Consumo
                        </TabsTrigger>
                        <TabsTrigger value="solar" className="gap-2 px-6 py-3">
                            <Sun className="h-4 w-4" /> Solar
                        </TabsTrigger>
                        <TabsTrigger value="dcdc" className="gap-2 px-6 py-3">
                            <Truck className="h-4 w-4" /> DCDC
                        </TabsTrigger>
                        <TabsTrigger value="battery" className="gap-2 px-6 py-3">
                            <Battery className="h-4 w-4" /> Bateria
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="rating" className="focus-visible:outline-none">
                    <RatingDashboard rating={rating} />
                </TabsContent>

                <TabsContent value="load" className="focus-visible:outline-none">
                    <LoadCalculatorUI vehicles={vehicles} />
                    <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20 text-center">
                        <p className="text-sm">Os dados de consumo acima alimentam automaticamente o diagnóstico.</p>
                    </div>
                </TabsContent>

                <TabsContent value="solar" className="focus-visible:outline-none">
                    <SolarCalculatorUI initialConsumptionWh={consumptionWh} />
                </TabsContent>

                <TabsContent value="dcdc" className="focus-visible:outline-none">
                    <DcdcCalculatorUI />
                </TabsContent>

                <TabsContent value="battery" className="focus-visible:outline-none">
                    <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Configuração da Bateria</CardTitle>
                            <CardDescription>Defina sua reserva de energia.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10 text-center border-2 border-dashed border-border rounded-2xl opacity-50">
                                <p className="col-span-2 italic">Interface de Bateria em desenvolvimento. <br/> Atualmente usando os valores padrão para o Rating.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
