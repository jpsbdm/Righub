"use client";

import { motion } from "framer-motion";
import { SystemRating, ValidationCheck } from "@/tools-energy/services/rating.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    CheckCircle2, 
    AlertTriangle, 
    XCircle, 
    Zap, 
    ShieldCheck, 
    ArrowRight,
    Trophy,
    Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RatingDashboardProps {
    rating: SystemRating;
    onReset?: () => void;
}

export default function RatingDashboard({ rating, onReset }: RatingDashboardProps) {
    const getStatusIcon = (status: ValidationCheck['status']) => {
        switch (status) {
            case 'pass': return <CheckCircle2 className="h-5 w-5 text-green-500 fill-green-500/10" />;
            case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500 fill-yellow-500/10" />;
            case 'fail': return <XCircle className="h-5 w-5 text-destructive fill-destructive/10" />;
        }
    };

    const getLevelColor = (level: SystemRating['level']) => {
        switch (level) {
            case 'pro': return 'text-primary';
            case 'good': return 'text-green-500';
            case 'functional': return 'text-yellow-500';
            case 'critical': return 'text-destructive';
        }
    };

    // Gauge calculation
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (rating.score / 10) * circumference;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {/* Main Score Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="md:col-span-1 bg-card/40 backdrop-blur-xl border-border/50 flex flex-col items-center justify-center p-8 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative h-48 w-48">
                        <svg className="h-full w-full rotate-[-90deg]">
                            <circle
                                cx="96"
                                cy="96"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                className="text-muted/20"
                            />
                            <motion.circle
                                cx="96"
                                cy="96"
                                r={radius}
                                stroke="currentColor"
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={circumference}
                                initial={{ strokeDashoffset: circumference }}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className={getLevelColor(rating.level)}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black tracking-tighter">{rating.score.toFixed(1)}</span>
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">Sistema / 10</span>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <Badge variant="outline" className={`text-xs uppercase px-4 py-1 border-opacity-50 ${getLevelColor(rating.level)}`}>
                            Status: {rating.level.toUpperCase()}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-2">Baseado em 20 verificações técnicas</p>
                    </div>
                </Card>

                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Diagnóstico do Setup</h2>
                        <p className="text-muted-foreground mt-2">
                            Seu sistema obteve nota <strong>{rating.score.toFixed(1)}</strong>. 
                            {rating.score >= 7 
                                ? " Parabéns! Seu dimensionamento está seguro e eficiente para uso contínuo." 
                                : " Identificamos pontos de atenção que podem comprometer sua autonomia."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-3">
                            <Trophy className="h-5 w-5 text-primary shrink-0" />
                            <div>
                                <p className="text-sm font-bold">Top Melhoria</p>
                                <p className="text-xs text-muted-foreground">{rating.topImprovements[0] || 'Seu sistema está ótimo!'}</p>
                            </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50 flex items-start gap-3">
                            <Zap className="h-5 w-5 text-primary shrink-0" />
                            <div>
                                <p className="text-sm font-bold">Eficiência Estimada</p>
                                <p className="text-xs text-muted-foreground">Otimizado para {rating.score > 8 ? 'Alta performance' : 'Uso moderado'}.</p>
                            </div>
                        </div>
                    </div>

                    {onReset && (
                        <Button variant="ghost" className="text-xs gap-2" onClick={onReset}>
                            <ArrowRight className="h-4 w-4 rotate-180" /> Recalcular tudo
                        </Button>
                    )}
                </div>
            </div>

            {/* Checklist Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-card/40 backdrop-blur-xl border-border/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-primary" /> Relatório de Segurança
                        </CardTitle>
                        <CardDescription>Detalhamento de cada ponto do seu sistema elétrico.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {rating.checks.slice(0, 10).map((check, idx) => (
                            <div key={check.id} className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/30 transition-colors border border-transparent hover:border-border/30">
                                <div className="flex gap-3">
                                    <div className="mt-0.5">{getStatusIcon(check.status)}</div>
                                    <div>
                                        <p className="text-sm font-medium">{check.label}</p>
                                        <p className="text-[10px] text-muted-foreground leading-tight max-w-[200px]">{check.message}</p>
                                    </div>
                                </div>
                                <div className="text-[10px] font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                                    {check.score > 0 ? `+${check.score}` : '0.0'} pts
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    {/* Insights Box */}
                    <Card className="bg-primary/5 border-primary/20 overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Target className="h-24 w-24" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-lg">Próximos Passos</CardTitle>
                            <CardDescription>O que você deve fazer para chegar aos 10 pontos.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {rating.topImprovements.map((imp, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-background/50 rounded-xl border border-primary/10">
                                    <div className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-[10px] font-bold">
                                        {idx + 1}
                                    </div>
                                    <span className="text-xs font-medium">{imp}</span>
                                </div>
                            ))}
                            <Button className="w-full mt-4 gap-2" variant="outline">
                                <Zap className="h-4 w-4" /> Ver sugestões de produtos Pro
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Pro Call to Action */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg">Desbloqueie o Diagnóstico Detalhado</h3>
                            <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">
                                Com o plano **Pro**, você vê a justificativa técnica de cada check e simula o impacto de novos itens.
                            </p>
                            <Button size="sm" className="mt-4">Upgrade para Pro</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
