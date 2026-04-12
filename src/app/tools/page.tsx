import { 
    Zap, 
    Sun, 
    Compass, 
    ShieldCheck, 
    ArrowRight,
    Calculator,
    Map
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const TOOLS = [
    {
        title: "Calculadora de Carga",
        description: "Dimensione seu banco de baterias baseado no consumo real dos seus eletrodomésticos.",
        icon: Zap,
        href: "/tools/load-calculator",
        status: "Ativo",
        color: "text-yellow-500",
        bg: "bg-yellow-500/10"
    },
    {
        title: "Engenharia Solar",
        description: "Simule a captação solar baseado na sua localização e inclinação dos painéis.",
        icon: Sun,
        href: "#",
        status: "Em Breve",
        color: "text-orange-500",
        bg: "bg-orange-500/10"
    },
    {
        title: "Trip Planner",
        description: "Calcule combustível, autonomia e paradas técnicas para sua próxima expedição.",
        icon: Compass,
        href: "#",
        status: "Em Breve",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "Inspetor de Build",
        description: "Valide se a sua montagem segue as normas técnicas de segurança e elétrica.",
        icon: ShieldCheck,
        href: "#",
        status: "Experimental",
        color: "text-green-500",
        bg: "bg-green-500/10"
    }
];

export default function ToolsHubPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-16 max-w-6xl">
                
                {/* Header */}
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <Badge variant="outline" className="rounded-full px-4 py-1 border-primary/20 text-primary font-bold tracking-widest text-[10px] uppercase">
                        Engineering Hub
                    </Badge>
                    <h1 className="text-5xl font-black tracking-tighter italic">FERRAMENTAS TÉCNICAS</h1>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Precisão e segurança para sua vida off-grid. Use nossas calculadoras validadas para projetar a build perfeita.
                    </p>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TOOLS.map((tool) => {
                        const Icon = tool.icon;
                        const isComingSoon = tool.status === "Em Breve";

                        return (
                            <Link 
                                key={tool.title} 
                                href={tool.href}
                                className={cn(
                                    "block group transition-all",
                                    isComingSoon && "pointer-events-none opacity-60"
                                )}
                            >
                                <Card className="h-full border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/50 hover:bg-primary/5 transition-all overflow-hidden relative border-2">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Icon className="h-24 w-24" />
                                    </div>
                                    <CardHeader className="flex flex-row items-center gap-5">
                                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", tool.bg, tool.color)}>
                                            <Icon className="h-7 w-7" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CardTitle className="text-xl font-bold">{tool.title}</CardTitle>
                                                {isComingSoon && (
                                                    <span className="text-[9px] font-black uppercase tracking-tighter bg-muted px-1.5 py-0.5 rounded text-muted-foreground mr-auto">
                                                        {tool.status}
                                                    </span>
                                                )}
                                            </div>
                                            <CardDescription className="text-sm leading-relaxed">
                                                {tool.description}
                                            </CardDescription>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex justify-end pt-0 pb-6 pr-6">
                                        {!isComingSoon && (
                                            <Button variant="ghost" size="sm" className="font-bold text-xs tracking-tight group-hover:bg-primary group-hover:text-primary-foreground rounded-full transition-all">
                                                Acessar Ferramenta <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

                {/* Suggestion CTA */}
                <div className="mt-20 p-10 rounded-[3rem] bg-muted/30 border border-border/50 text-center space-y-6">
                    <div className="h-12 w-12 bg-background rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                        <Map className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black tracking-tight italic">SENTINDO FALTA DE ALGO?</h3>
                        <p className="text-muted-foreground max-w-md mx-auto text-sm">
                            Estamos constantemente desenvolvendo novas calculadoras. Sugira uma ferramenta técnica que facilitaria sua jornada.
                        </p>
                    </div>
                    <Button variant="outline" className="rounded-full font-bold">Enviar Sugestão</Button>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
