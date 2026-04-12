import { 
    Zap, 
    Compass, 
    Activity, 
    Calendar, 
    Battery, 
    Sun, 
    ArrowRight,
    Lock,
    Users,
    Map
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ToolboxPage() {
    const categories = [
        {
            title: "Electrical Station",
            description: "Precision calculators for your off-grid power setup.",
            icon: <Zap className="h-6 w-6" />,
            tools: [
                {
                    name: "Load Calculator",
                    description: "Size your battery bank and estimate daily amp consumption.",
                    href: "/tools/load-calculator",
                    icon: <Battery className="h-5 w-5" />,
                    isPro: false
                },
                {
                    name: "Solar Estimator",
                    description: "Calculate required panel wattage and harvest based on region.",
                    href: "/tools/solar",
                    icon: <Sun className="h-5 w-5" />,
                    isPro: true
                }
            ]
        },
        {
            title: "Expedition Lab",
            description: "Manage your Australian outback adventures and team links.",
            icon: <Compass className="h-6 w-6" />,
            tools: [
                {
                    name: "Trip Planner",
                    description: "Create shared itineraries, expense tracking and group links.",
                    href: "/tools/trip-planner",
                    icon: <Map className="h-5 w-5" />,
                    isPro: true,
                    isNew: true
                },
                {
                    name: "Trail Intel",
                    description: "Real-time track conditions and crowd-sourced difficulty ratings.",
                    href: "/tools/trail-intel",
                    icon: <Activity className="h-5 w-5" />,
                    isPro: true,
                    comingSoon: true
                }
            ]
        },
        {
            title: "Vehicle Intelligence",
            description: "Technical diagnostics and rig performance monitoring.",
            icon: <Activity className="h-6 w-6" />,
            tools: [
                {
                    name: "Diagnostics Hub",
                    description: "Monitor rig health, service intervals and fault logs.",
                    href: "/tools/diagnostics",
                    icon: <Lock className="h-5 w-5" />,
                    isPro: false
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Dark & Tech Hero Area */}
            <div className="relative border-b border-border/50 bg-muted/20 overflow-hidden">
                <div className="container mx-auto px-4 max-w-6xl py-16 lg:py-24 relative z-10">
                    <div className="max-w-2xl space-y-6">
                        <Badge className="bg-primary/20 text-primary border-none font-black uppercase text-[10px] tracking-widest px-4 py-1.5 rounded-full">
                            RigHub Advanced Toolbox
                        </Badge>
                        <h1 className="text-6xl font-black tracking-tighter italic uppercase leading-tight">
                            ENGINEERING <br />
                            <span className="text-primary italic">THE ADVENTURE</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                            Access a suite of professional tools designed to optimize your off-grid 
                            performance and expedition planning across the Australian outback.
                        </p>
                    </div>
                </div>
                {/* Visual Elements */}
                <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent flex items-center justify-center opacity-50">
                    <div className="h-96 w-96 border-2 border-primary/20 rounded-full animate-pulse blur-3xl" />
                </div>
            </div>

            {/* Main Toolbox Dashboard */}
            <main className="container mx-auto px-4 max-w-6xl -mt-12 relative z-20">
                <div className="space-y-16">
                    {categories.map((category, catIdx) => (
                        <section key={catIdx} className="space-y-8">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/50 pb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                                            {category.icon}
                                        </div>
                                        <h2 className="text-3xl font-black italic tracking-tighter uppercase">{category.title}</h2>
                                    </div>
                                    <p className="text-muted-foreground font-medium ml-13">{category.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                {category.tools.map((tool, toolIdx) => (
                                    <Link 
                                        key={toolIdx} 
                                        href={tool.comingSoon ? "#" : tool.href}
                                        className={`group relative ${tool.comingSoon ? "cursor-not-allowed" : "cursor-pointer"}`}
                                    >
                                        <div className="h-full p-8 rounded-[2.5rem] bg-card/60 backdrop-blur-xl border border-border/50 hover:border-primary/40 transition-all shadow-xl group-hover:shadow-primary/5 overflow-hidden flex flex-col justify-between">
                                            {/* Top Row: Icon + Badges */}
                                            <div className="flex items-start justify-between mb-8">
                                                <div className="h-14 w-14 rounded-2xl bg-muted/80 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                                                    {tool.icon}
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    {tool.isPro && (
                                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-none font-bold text-[9px] uppercase tracking-widest px-2">
                                                            PRO ACCESS
                                                        </Badge>
                                                    )}
                                                    {tool.isNew && (
                                                        <Badge className="bg-secondary/20 text-secondary-foreground border-none font-black text-[9px] uppercase tracking-widest px-2 animate-pulse">
                                                            NEW FEATURE
                                                        </Badge>
                                                    )}
                                                    {tool.comingSoon && (
                                                        <Badge className="bg-muted text-muted-foreground border-none font-bold text-[9px] uppercase tracking-widest px-2">
                                                            LOCKED / SOON
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="space-y-4">
                                                <h3 className="text-2xl font-black italic tracking-tighter uppercase group-hover:text-primary transition-colors">
                                                    {tool.name}
                                                </h3>
                                                <p className="text-muted-foreground font-medium text-sm leading-relaxed max-w-xs">
                                                    {tool.description}
                                                </p>
                                            </div>

                                            {/* Action Arrow */}
                                            <div className="mt-8 flex items-center gap-2 font-black italic text-xs uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-x--4 group-hover:translate-x-0">
                                                Launch Tool <ArrowRight className="h-3 w-3" />
                                            </div>

                                            {/* Subtle Decorative Background Icon */}
                                            <div className="absolute -bottom-6 -right-6 h-24 w-24 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                                                {tool.icon}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>

            {/* PRO Upgrade CTA Section */}
            <div className="container mx-auto px-4 max-w-6xl mt-32">
                <div className="p-12 rounded-[3rem] bg-gradient-to-br from-primary to-primary-foreground text-primary-foreground relative overflow-hidden shadow-2xl">
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
                                UNLOCK ALL <br />
                                <span className="text-background">EXPERT TOOLS</span>
                            </h2>
                            <p className="text-xl font-medium opacity-90 max-w-sm">
                                Get access to advanced solar modeling, shared trip planning, and real-time outback track intelligence.
                            </p>
                            <Button className="bg-background text-primary hover:bg-background/90 h-14 px-8 rounded-2xl font-black italic text-lg uppercase tracking-tighter">
                                Upgrade to Pro
                            </Button>
                        </div>
                        <div className="flex justify-center lg:justify-end gap-4 opacity-20">
                            <Users className="h-40 w-40" />
                            <Zap className="h-20 w-20" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
