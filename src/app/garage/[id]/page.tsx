import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { db } from "@/lib/db";
import { vehicles, vehicleMods, mediaAssets } from "@/garage/schema";
import { users } from "@/core-platform/schema";
import { eq, and } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
    Car, 
    Zap, 
    Settings, 
    Camera, 
    Hammer, 
    ChevronLeft, 
    Share2, 
    ExternalLink,
    Wrench,
    Battery,
    Compass
} from "lucide-react";
import Link from "next/link";

export default async function VehicleDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user: currentUser } = await lucia.validateSession(sessionId);
    if (!currentUser) redirect("/login");

    const [vehicle] = await db.select().from(vehicles).where(eq(vehicles.id, id));
    if (!vehicle) notFound();

    const [owner] = await db.select().from(users).where(eq(users.id, vehicle.userId));
    const mods = await db.select().from(vehicleMods).where(eq(vehicleMods.vehicleId, id));
    const media = await db.select().from(mediaAssets).where(eq(mediaAssets.vehicleId, id));

    const isOwner = currentUser.id === vehicle.userId;

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Context Navigation */}
            <div className="border-b border-border/50 bg-card/20 backdrop-blur-md sticky top-16 z-30">
                <div className="container mx-auto px-4 max-w-6xl h-14 flex items-center justify-between">
                    <Link href="/garage">
                        <Button variant="ghost" size="sm" className="gap-2 font-bold text-muted-foreground hover:text-foreground">
                            <ChevronLeft className="h-4 w-4" /> Back to Garage
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                            <Share2 className="h-4 w-4" />
                        </Button>
                        {isOwner && (
                            <Button variant="secondary" size="sm" className="gap-2 font-bold rounded-xl px-4">
                                <Settings className="h-4 w-4" /> Edit Rig
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Premium Header Section */}
            <div className="relative border-b border-border/50 overflow-hidden bg-muted/30">
                <div className="container mx-auto px-4 max-w-6xl py-12 lg:py-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Badge className="bg-primary/10 text-primary border-none font-black uppercase text-[10px] tracking-widest px-3">
                                   Build in Progress
                                </Badge>
                                <span className="text-xs text-muted-foreground font-bold">Updated {new Date(vehicle.updatedAt).toLocaleDateString()}</span>
                            </div>
                            <div className="space-y-2">
                                <h1 className="text-6xl font-black tracking-tighter italic uppercase leading-none">
                                    {vehicle.nickname ? (
                                        <>
                                            <span className="text-primary">"{vehicle.nickname}"</span>
                                            <br />
                                            <span className="text-2xl opacity-50 block mt-2">{vehicle.year} {vehicle.make} {vehicle.model}</span>
                                        </>
                                    ) : (
                                        <>
                                            {vehicle.year} {vehicle.make} <br />
                                            <span className="text-primary">{vehicle.model}</span>
                                        </>
                                    )}
                                </h1>
                                <p className="text-xl text-muted-foreground font-medium max-w-md">
                                    A technical build designed for Australian expeditions and off-grid living.
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Link href={`/tools/load-calculator?vehicleId=${id}`}>
                                    <Button className="h-14 px-8 rounded-2xl font-black text-lg shadow-xl shadow-primary/20 gap-3">
                                        <Zap className="h-5 w-5" /> ENERGY HUB
                                    </Button>
                                </Link>
                                <Button variant="outline" className="h-14 px-8 rounded-2xl font-black text-lg border-border/50 gap-3 bg-background/50">
                                    <Compass className="h-5 w-5" /> EXPEDITIONS
                                </Button>
                            </div>
                        </div>

                        {/* Visual Preview / Main Photo */}
                        <div className="aspect-[4/3] rounded-[3rem] bg-gradient-to-br from-primary/10 to-card border-2 border-primary/20 p-2 shadow-2xl relative group">
                            <div className="w-full h-full rounded-[2.5rem] bg-card/60 flex items-center justify-center border border-white/5 overflow-hidden">
                                {media.length > 0 ? (
                                    <img src={media[0].url} alt={vehicle.model} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-muted-foreground/30">
                                        <Camera className="h-20 w-20" />
                                        <p className="font-black italic uppercase tracking-widest text-sm">No photos uploaded yet</p>
                                    </div>
                                )}
                            </div>
                            {isOwner && (
                                <Button className="absolute bottom-8 right-8 rounded-full h-12 w-12 p-0 shadow-2xl">
                                    <Camera className="h-5 w-5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute -top-20 -right-20 h-96 w-96 bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 max-w-6xl mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Mods & Specs */}
                    <div className="lg:col-span-2 space-y-12">
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-3">
                                    <Wrench className="h-6 w-6 text-primary" /> Modifications
                                </h2>
                                {isOwner && (
                                    <Button variant="ghost" size="sm" className="font-bold text-primary">
                                        + Add Mod
                                    </Button>
                                )}
                            </div>
                            
                            {mods.length === 0 ? (
                                <div className="p-12 border-2 border-dashed border-border/50 rounded-[2rem] text-center bg-muted/20">
                                    <Hammer className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p className="font-bold text-muted-foreground">No modifications listed yet.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {mods.map((mod) => (
                                        <div key={mod.id} className="p-4 rounded-2xl bg-card border border-border/50 flex items-center justify-between group hover:border-primary/30 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                                                    <Settings className="h-5 w-5 text-muted-foreground/60" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-primary tracking-widest">{mod.category}</p>
                                                    <h4 className="font-bold text-sm tracking-tight">{mod.name}</h4>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <ExternalLink className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Right Column: Energy & Stats Sidebar */}
                    <div className="space-y-8">
                         <Card className="rounded-[2rem] bg-card/40 border-border/50 backdrop-blur-xl overflow-hidden">
                            <CardHeader className="bg-primary/5 border-b border-border/50 p-6">
                                <div className="flex items-center gap-2 text-primary">
                                    <Battery className="h-5 w-5" />
                                    <CardTitle className="text-lg font-black italic uppercase tracking-tight">Energy Setup</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="p-4 bg-background/50 rounded-2xl border border-border/50">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Battery Bank</p>
                                        <p className="text-xl font-black italic tracking-tighter">200Ah Lithium</p>
                                    </div>
                                    <div className="p-4 bg-background/50 rounded-2xl border border-border/50">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Solar Input</p>
                                        <p className="text-xl font-black italic tracking-tighter">350W Fixed</p>
                                    </div>
                                </div>
                                <Link href={`/tools/load-calculator?vehicleId=${id}`}>
                                    <Button variant="outline" className="w-full rounded-xl font-bold border-primary/20 text-primary hover:bg-primary/5">
                                        View Full Schematic
                                    </Button>
                                </Link>
                            </CardContent>
                         </Card>

                         <div className="p-8 rounded-[2rem] bg-muted/40 border border-border/50 text-center">
                            <h3 className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-4">OWNER</h3>
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-primary to-secondary p-1">
                                    <div className="h-full w-full rounded-full bg-background flex items-center justify-center font-black text-xl italic">
                                        {owner.name?.substring(0, 2).toUpperCase() || "RH"}
                                    </div>
                                </div>
                                <div>
                                    <p className="font-black tracking-tight">{owner.name}</p>
                                    <p className="text-xs text-muted-foreground">Certified Overlander</p>
                                </div>
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Tool(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15.5 8.5 2 2" />
            <path d="m11 11-4.8 4.8c-.5.5-.5 1.3 0 1.8l0 0a2.7 2.7 0 0 0 4.1 0L15 13" />
            <path d="M11 11c.5-.5 1.3-.5 1.8 0l1.4 1.4c.5.5.5 1.3 0 1.8l-4.5 4.5l-4.5-4.5l4.5-4.5Z" />
            <path d="M15 13c1.5 1.5 3 1.5 4.5 0s1.5-3 0-4.5l-4.5-4.5M10.1 6.8 15 11.7" />
        </svg>
    )
}
