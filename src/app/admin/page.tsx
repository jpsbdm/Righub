import { adminGuard } from "@/admin/lib/guard";
import { db } from "@/lib/db";
import { users } from "@/core-platform/schema";
import { vehicles } from "@/garage/schema";
import { sql } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Truck, DollarSign, Activity, ChevronRight, PackageSearch } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    await adminGuard();

    const [userCount] = await db.select({ count: sql<number>`count(*)` }).from(users);
    const [proCount] = await db.select({ count: sql<number>`count(*)` }).from(users).where(sql`is_pro = true`);
    const [vehicleCount] = await db.select({ count: sql<number>`count(*)` }).from(vehicles);

    const stats = [
        { title: "Total de Usuários", value: userCount.count, icon: <Users className="h-5 w-5" />, color: "text-blue-500" },
        { title: "Membros PRO", value: proCount.count, icon: <DollarSign className="h-5 w-5" />, color: "text-green-500" },
        { title: "Rigs na Garagem", value: vehicleCount.count, icon: <Truck className="h-5 w-5" />, color: "text-orange-500" },
        { title: "Crescimento (30d)", value: "+12%", icon: <Activity className="h-5 w-5" />, color: "text-purple-500" },
    ];

    return (
        <div className="container mx-auto py-10 px-4">
            <header className="mb-10">
                <h1 className="text-4xl font-black tracking-tighter uppercase italic">Backoffice <span className="text-primary italic">Admin</span></h1>
                <p className="text-muted-foreground mt-2">Visão geral da plataforma RigHub.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <Card key={i} className="bg-card/40 backdrop-blur-sm border-border/50">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <div className={`${stat.color}`}>
                                {stat.icon}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black italic">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Ações Administrativas</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AdminLinkCard 
                                title="Gerenciar Catálogo" 
                                desc="Aprovar novos produtos e categorias." 
                                icon={<PackageSearch />} 
                                href="/admin/catalog"
                            />
                            <AdminLinkCard 
                                title="Controle de Usuários" 
                                desc="Suspender, banir ou promover usuários." 
                                icon={<Users />} 
                                href="/admin/users"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">Metas de Receita</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                    <span>Atual (AUD)</span>
                                    <span>Meta (AUD)</span>
                                </div>
                                <div className="text-2xl font-black">$ {proCount.count * 9} / $ 4,000</div>
                                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                                    <div 
                                        className="bg-primary h-full transition-all duration-1000" 
                                        style={{ width: `${Math.min(100, (proCount.count * 9 / 4000) * 100)}%` }}
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function AdminLinkCard({ title, desc, icon, href }: { title: string; desc: string; icon: React.ReactNode; href: string }) {
    return (
        <Link href={href} className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-sm leading-none mb-1 group-hover:text-primary transition-colors">{title}</h4>
                <p className="text-[10px] text-muted-foreground leading-tight">{desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </Link>
    );
}
