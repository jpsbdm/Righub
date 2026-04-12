import { db } from "@/lib/db";
import { users } from "@/core-platform/schema";
import { vehicles as vehiclesTable } from "@/garage/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Calendar, 
    MapPin, 
    ShieldCheck, 
    Car, 
    MessageSquare,
    Users,
    Camera,
    Globe
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function UserProfilePage({ params }: { params: { id: string } }) {
    const { id } = await params;

    // Fetch user details
    const [user] = await db.select().from(users).where(eq(users.id, id));
    if (!user) notFound();

    // Fetch user's vehicles
    const userVehicles = await db.select().from(vehiclesTable).where(eq(vehiclesTable.userId, id));

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Cover Header */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-primary/20 via-primary/5 to-background border-b border-border/50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            <main className="container mx-auto px-4 max-w-5xl -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Sidebar: Profile Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-border/50 bg-card/60 backdrop-blur-xl rounded-[2rem] overflow-hidden shadow-2xl">
                            <CardHeader className="flex flex-col items-center text-center pb-2">
                                <Avatar className="h-32 w-32 border-4 border-background shadow-xl mb-4">
                                    <AvatarImage src={user.avatarUrl || undefined} />
                                    <AvatarFallback className="text-4xl font-black italic">
                                        {user.name?.substring(0,2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl font-black italic tracking-tighter">{user.name}</CardTitle>
                                    <p className="text-muted-foreground text-sm">@{user.email.split('@')[0]}</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 mt-4">
                                    {user.role === 'admin' && <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none px-3 py-1 text-[10px] font-bold">STAFF</Badge>}
                                    {user.isPro && <Badge className="bg-orange-500/20 text-orange-500 border-none px-3 py-1 text-[10px] font-bold italic">PRO RIG</Badge>}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-sm text-center text-muted-foreground leading-relaxed">
                                    Entusiasta de vida off-grid e engenharia de expedição. Construindo o setup perfeito para o deserto.
                                </p>
                                
                                <div className="space-y-3 pt-4 border-t border-border/40">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <MapPin className="h-4 w-4" /> <span>Brasil</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" /> <span>Membro desde {new Date(user.createdAt).getFullYear()}</span>
                                    </div>
                                </div>

                                <div className="flex justify-center gap-4 pt-4">
                                    <Button variant="ghost" size="icon" className="rounded-full hover:text-primary"><Camera className="h-5 w-5" /></Button>
                                    <Button variant="ghost" size="icon" className="rounded-full hover:text-primary"><Globe className="h-5 w-5" /></Button>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-card/40 border border-border/50 rounded-2xl p-4 text-center">
                                <p className="text-2xl font-black italic">{userVehicles.length}</p>
                                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Builds</p>
                            </div>
                            <div className="bg-card/40 border border-border/50 rounded-2xl p-4 text-center">
                                <p className="text-2xl font-black italic">0</p>
                                <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Posts</p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content: Garage & Activity */}
                    <div className="lg:col-span-2 space-y-10">
                        
                        {/* Garage Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Car className="h-6 w-6 text-primary" />
                                    <h2 className="text-2xl font-black italic tracking-tighter">GARAGEM</h2>
                                </div>
                                <Badge variant="outline" className="rounded-full px-3">{userVehicles.length} Veículos</Badge>
                            </div>

                            {userVehicles.length === 0 ? (
                                <div className="p-12 border-2 border-dashed border-border/50 rounded-[2rem] text-center text-muted-foreground">
                                    <p>Nenhuma build pública no momento.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {userVehicles.map(vehicle => (
                                        <Link key={vehicle.id} href={`/garage/${vehicle.id}`}>
                                            <Card className="hover:border-primary/50 transition-all bg-card/40 border-border/50 rounded-[1.5rem] overflow-hidden group">
                                                <div className="h-2 bg-primary/10 group-hover:bg-primary/30 transition-colors" />
                                                <CardHeader className="pb-4">
                                                    <CardTitle className="text-lg font-bold">{vehicle.make} {vehicle.model}</CardTitle>
                                                    <p className="text-xs text-muted-foreground">{vehicle.year}</p>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest">
                                                        Ver Detalhes <ChevronRight className="h-3 w-3" />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Recent Activity */}
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <MessageSquare className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-black italic tracking-tighter">ATIVIDADE RECENTE</h2>
                            </div>
                            <div className="space-y-4">
                               <div className="p-8 border border-border/50 rounded-[2rem] bg-muted/20 text-center italic text-muted-foreground">
                                    O usuário ainda não postou no feed.
                               </div>
                            </div>
                        </section>

                    </div>
                </div>
            </main>
        </div>
    );
}

function ChevronRight({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" /></svg>;
}
