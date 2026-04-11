"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    Check, 
    Zap, 
    ShieldCheck, 
    Crown, 
    Sun, 
    TrendingUp,
    ChevronRight,
    Star
} from "lucide-react";
import { createCheckoutSessionAction } from "@/billing/actions/checkout.actions";
import { useState } from "react";

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleSubscribe = async (plan: 'MONTHLY' | 'YEARLY') => {
        setLoading(plan);
        await createCheckoutSessionAction(plan);
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="py-20 text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto px-4 relative z-10"
                >
                    <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 mb-6">
                        Planos & Preços
                    </Badge>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase underline decoration-primary decoration-8 underline-offset-8">
                        Voe em modo <span className="text-primary italic">PRO</span>
                    </h1>
                    <p className="text-muted-foreground mt-8 text-xl max-w-2xl mx-auto leading-relaxed">
                        Desbloqueie diagnósticos detalhados, relatórios ilimitados e o suporte da maior comunidade técnica off-grid.
                    </p>
                </motion.div>
            </header>

            <main className="container mx-auto px-4 max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Free Plan */}
                    <Card className="bg-card/40 backdrop-blur-sm border-border/50 relative overflow-hidden flex flex-col group">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold tracking-tight italic">Free Forever</CardTitle>
                            <CardDescription>O essencial para começar seu setup.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black">$0</span>
                                <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">AUD / m</span>
                            </div>
                            
                            <div className="space-y-4 pt-6 border-t border-border/30">
                                <FeatureItem text="Calculadora de Carga básica" />
                                <FeatureItem text="Calculadora Solar manual" />
                                <FeatureItem text="Rating de Sistema (Resumido)" />
                                <FeatureItem text="1 Relatório Público" />
                                <FeatureItem text="Acesso ao Fórum (Leitura)" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full h-12 font-bold" disabled>Plano Atual</Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Plan */}
                    <Card className="bg-card/60 backdrop-blur-xl border-primary/30 relative overflow-hidden flex flex-col group shadow-2xl shadow-primary/10">
                        <div className="absolute top-0 right-0 p-4">
                            <Crown className="h-8 w-8 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                        </div>
                        {/* Recommendation Badge */}
                        <div className="absolute top-4 left-4">
                            <Badge className="bg-primary text-primary-foreground font-black text-[9px] uppercase tracking-tighter">Economize 22% anual</Badge>
                        </div>

                        <CardHeader className="pt-12">
                            <CardTitle className="text-3xl font-black tracking-tighter italic text-primary uppercase">RigHub PRO</CardTitle>
                            <CardDescription className="font-semibold text-foreground">Ferramentas avançadas para setups reais.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6">
                            <div className="space-y-2">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black">$9</span>
                                    <span className="text-muted-foreground text-sm font-bold uppercase tracking-widest">AUD / mês</span>
                                </div>
                                <p className="text-[10px] font-bold text-primary italic">Ou apenas $7/mês no plano anual</p>
                            </div>
                            
                            <div className="space-y-4 pt-6 border-t border-border/30">
                                <FeatureItem text="Rating Detalhado com justificativa técnica" pro />
                                <FeatureItem text="Simulador de Autonomia Avançado" pro />
                                <FeatureItem text="Relatórios Ilimitados & Download-Snapshots" pro />
                                <FeatureItem text='Modo "E-se": simule mudanças de hardware' pro />
                                <FeatureItem text="Selo Pro Verificado na Garagem" pro />
                                <FeatureItem text="Acesso prioritário ao Fórum" pro />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            <Button 
                                className="w-full h-14 font-black italic tracking-tighter uppercase text-lg shadow-xl shadow-primary/20"
                                onClick={() => handleSubscribe('YEARLY')}
                                disabled={!!loading}
                            >
                                {loading === 'YEARLY' ? 'Processando...' : 'Assinar Anual (Best Value)'}
                            </Button>
                            <Button 
                                variant="ghost" 
                                className="w-full h-10 text-xs font-bold text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => handleSubscribe('MONTHLY')}
                                disabled={!!loading}
                            >
                                {loading === 'MONTHLY' ? '...' : 'Alternar para Mensal ($9)'}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <section className="mt-24 text-center space-y-12">
                    <h2 className="text-3xl font-black italic tracking-tighter uppercase underline decoration-primary decoration-4 underline-offset-4">Por que migrar para o <span className="text-primary italic">PRO</span>?</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <BenefitCard 
                            icon={<ShieldCheck className="h-6 w-6" />}
                            title="Segurança Máxima"
                            desc="Saiba exatamente se seus cabos e proteções estão corretos para seu consumo."
                        />
                        <BenefitCard 
                            icon={<Sun className="h-6 w-6" />}
                            title="Otimização de Custos"
                            desc="Não gaste com painéis ou baterias que você não precisa. Acerte na primeira compra."
                        />
                        <BenefitCard 
                            icon={<TrendingUp className="h-6 w-6" />}
                            title="Relatórios Técnicos"
                            desc="Gere PDFs e links que mostram o valor real do seu Rig na hora da venda."
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}

function FeatureItem({ text, pro = false }: { text: string; pro?: boolean }) {
    return (
        <div className="flex items-center gap-3">
            <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${pro ? 'bg-primary/20 text-primary' : 'bg-muted/30 text-muted-foreground'}`}>
                <Check className="h-3 w-3" />
            </div>
            <span className={`text-sm ${pro ? 'font-semibold' : 'text-muted-foreground'}`}>{text}</span>
        </div>
    );
}

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/50 text-left space-y-4 hover:border-primary/30 transition-all group">
            <div className="h-12 w-12 rounded-xl bg-background border border-border flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
        </div>
    );
}
