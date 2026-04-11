"use client";

import { motion } from "framer-motion";
import { SystemRating } from "@/tools-energy/services/rating.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Zap, 
    Sun, 
    Battery, 
    ShieldCheck, 
    ArrowRight,
    Trophy,
    ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface PublicSetupViewProps {
    data: {
        name: string;
        userName: string;
        rating: SystemRating;
        consumptionWh: number;
        solarWatts: number;
        batteryAh: number;
        vehicleName?: string;
    }
}

export default function PublicSetupView({ data }: PublicSetupViewProps) {
    const { rating } = data;

    const getLevelColor = (level: SystemRating['level']) => {
        switch (level) {
            case 'pro': return 'text-primary';
            case 'good': return 'text-green-500';
            case 'functional': return 'text-yellow-500';
            case 'critical': return 'text-destructive';
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Minimalist Header for Branding */}
            <nav className="border-b border-border/50 bg-background/50 backdrop-blur-md sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                            <Zap className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <span className="font-bold tracking-tight text-xl">RigHub</span>
                    </div>
                    <Button variant="outline" size="sm" className="hidden sm:flex gap-2" onClick={() => window.open('/', '_blank')}>
                        Crie o seu <ExternalLink className="h-3 w-3" />
                    </Button>
                </div>
            </nav>

            <main className="container mx-auto px-4 pt-10 max-w-3xl space-y-10">
                {/* Hero Section */}
                <header className="text-center space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-2"
                    >
                        <ShieldCheck className="h-10 w-10 text-primary" />
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tight">{data.name}</h1>
                    <p className="text-muted-foreground">Projeto de <span className="text-foreground font-semibold">{data.userName}</span></p>
                    
                    <div className="flex justify-center items-center gap-4 mt-6">
                        <div className="flex flex-col items-center p-4 bg-card rounded-2xl border border-border shadow-sm">
                            <span className="text-4xl font-black tabular-nums">{rating.score.toFixed(1)}</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Rating Righub</span>
                        </div>
                        <div className="text-left">
                            <Badge className={`uppercase text-[10px] ${getLevelColor(rating.level)}`}>
                                Status: {rating.level}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">Selo de Eficiência Técnica</p>
                        </div>
                    </div>
                </header>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="bg-primary/5 border-primary/10">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <Zap className="h-5 w-5 text-primary mb-2" />
                            <span className="text-xl font-bold">{Math.round(data.consumptionWh)} Wh</span>
                            <span className="text-[10px] text-muted-foreground uppercase">Consumo Diário</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary/5 border-primary/10">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <Sun className="h-5 w-5 text-primary mb-2" />
                            <span className="text-xl font-bold">{data.solarWatts} Watts</span>
                            <span className="text-[10px] text-muted-foreground uppercase">Solar Instalado</span>
                        </CardContent>
                    </Card>
                    <Card className="bg-primary/5 border-primary/10">
                        <CardContent className="p-4 flex flex-col items-center text-center">
                            <Battery className="h-5 w-5 text-primary mb-2" />
                            <span className="text-xl font-bold">{data.batteryAh} Ah</span>
                            <span className="text-[10px] text-muted-foreground uppercase">Banco de Baterias</span>
                        </CardContent>
                    </Card>
                </div>

                {/* Technical Insights */}
                <Card className="border-border/50 overflow-hidden">
                    <CardHeader className="bg-muted/30">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Trophy className="h-4 w-4 text-primary" /> Destaques do Projeto
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                        {rating.checks.filter(c => c.status === 'pass').slice(0, 3).map((check, idx) => (
                            <div key={idx} className="flex gap-3 text-sm">
                                <div className="h-5 w-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="h-3 w-3" />
                                </div>
                                <div>
                                    <p className="font-semibold">{check.label}</p>
                                    <p className="text-muted-foreground text-xs">{check.message}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Stories Snapshot Preview CTA */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-primary to-secondary text-primary-foreground text-center space-y-4 shadow-xl shadow-primary/20">
                    <h3 className="text-2xl font-bold italic tracking-tight">"Construa o projeto certo antes de gastar com o errado."</h3>
                    <p className="text-sm opacity-90 max-w-[400px] mx-auto">
                        O RigHub é a maior plataforma de inteligência para veículos off-grid. Use nossas calculadoras gratuitas.
                    </p>
                    <Button variant="secondary" size="lg" className="font-bold gap-2" onClick={() => window.open('/', '_blank')}>
                        Criar meu Relatório <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>

                {/* Footer Section */}
                <footer className="text-center pt-10 border-t border-border/50">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">RigHub © 2026 • Powered by Energy 2.0 Engine</p>
                </footer>
            </main>
        </div>
    );
}
