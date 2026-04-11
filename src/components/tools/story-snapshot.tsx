"use client";

import { motion } from "framer-motion";
import { SystemRating } from "@/tools-energy/services/rating.service";
import { Zap, Sun, Battery, ShieldCheck } from "lucide-react";

interface StorySnapshotProps {
    data: {
        name: string;
        rating: SystemRating;
        consumptionWh: number;
        solarWatts: number;
        batteryAh: number;
    }
}

export default function StorySnapshot({ data }: StorySnapshotProps) {
    return (
        <div className="w-[360px] h-[640px] bg-[#0F0F0F] text-white relative overflow-hidden font-sans p-8 flex flex-col justify-between rounded-3xl shadow-2xl">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-100px] left-[-100px] w-full h-[400px] rounded-full bg-primary blur-[120px]" />
                <div className="absolute bottom-[-100px] right-[-100px] w-full h-[400px] rounded-full bg-secondary blur-[120px]" />
            </div>

            {/* Header */}
            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
                            <Zap className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-black text-sm tracking-tight uppercase">RigHub</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Energy Diagnosis 2.0</p>
                </div>
                <div className="px-2 py-1 border border-zinc-700 rounded text-[8px] font-bold uppercase">#RIGLIFE</div>
            </div>

            {/* Main Center Score */}
            <div className="relative z-10 flex flex-col items-center py-10">
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative"
                >
                    <div className="h-40 w-40 rounded-full border-[6px] border-zinc-800 flex items-center justify-center">
                        <div className="text-center">
                            <h2 className="text-6xl font-black italic tracking-tighter leading-none">{data.rating.score.toFixed(1)}</h2>
                            <p className="text-[10px] uppercase font-bold text-primary mt-1">Setup Rating</p>
                        </div>
                    </div>
                    <div className="absolute -top-4 -right-4 h-12 w-12 bg-primary rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                        <ShieldCheck className="h-6 w-6 text-white" />
                    </div>
                </motion.div>
                
                <h1 className="mt-8 text-2xl font-black text-center max-w-[200px] leading-tight uppercase italic underline decoration-primary decoration-4 underline-offset-4">
                    {data.name}
                </h1>
            </div>

            {/* Stats Footer */}
            <div className="relative z-10 grid grid-cols-1 gap-3">
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                            <Sun className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div>
                            <p className="text-[8px] uppercase font-bold text-zinc-500">Solar Gen</p>
                            <p className="text-sm font-black italic">{data.solarWatts}W</p>
                        </div>
                    </div>
                    <ArrowRightTiny />
                </div>
                <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                            <Battery className="h-4 w-4 text-zinc-400" />
                        </div>
                        <div>
                            <p className="text-[8px] uppercase font-bold text-zinc-500">Autonomy</p>
                            <p className="text-sm font-black italic">{data.batteryAh}Ah</p>
                        </div>
                    </div>
                    <ArrowRightTiny />
                </div>

                <div className="mt-4 text-center">
                    <p className="text-[8px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Crie seu relatório no RigHub.com</p>
                </div>
            </div>
        </div>
    );
}

function ArrowRightTiny() {
    return (
        <div className="h-4 w-4 border border-zinc-700 rounded-full flex items-center justify-center">
            <div className="h-1 w-1 bg-zinc-600 rounded-full" />
        </div>
    );
}
