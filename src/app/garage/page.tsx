import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { vehicles as vehiclesTable } from "@/garage/schema";
import { eq, desc } from "drizzle-orm";
import { AddVehicleDialog } from "@/components/garage/add-vehicle-dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, ChevronRight, Settings, Plus, Gauge, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function GaragePage() {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) redirect("/login");

  const { user } = await lucia.validateSession(sessionId);
  if (!user) redirect("/login");

  const userVehicles = await db.select().from(vehiclesTable).where(eq(vehiclesTable.userId, user.id)).orderBy(desc(vehiclesTable.createdAt));

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Premium Header */}
      <div className="bg-muted/30 border-b border-border/50 py-16 mb-10">
        <div className="container mx-auto px-4 max-w-6xl">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6">
              <div className="space-y-4">
                <Badge variant="outline" className="rounded-full px-4 border-primary/20 text-primary font-bold tracking-widest text-[10px] uppercase">
                    Fleet Management
                </Badge>
                <h1 className="text-5xl font-black tracking-tighter italic">MY GARAGE</h1>
                <p className="text-muted-foreground text-lg max-w-md">Manage your rigs, track modifications, and size your energy setup for every setup.</p>
              </div>
              <AddVehicleDialog />
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        {userVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-border/50 rounded-[3rem] bg-card/20 backdrop-blur-sm">
            <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
              <Car className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-black italic tracking-tight">EMPTY GARAGE</h3>
            <p className="text-muted-foreground mt-2 text-center max-w-xs text-sm">
              You haven't added any vehicles yet. Start by adding your main rig.
            </p>
            <div className="mt-8">
                <AddVehicleDialog />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {userVehicles.map((vehicle: any) => (
              <Link key={vehicle.id} href={`/garage/${vehicle.id}`} className="group block cursor-pointer">
                <Card className="h-full border-border/50 bg-card/40 backdrop-blur-xl hover:border-primary/50 hover:bg-primary/5 transition-all overflow-hidden relative border-2 rounded-[2rem] cursor-pointer">
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
                    <Car className="h-20 w-20" />
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-black uppercase tracking-widest text-primary/60">{vehicle.make}</span>
                      <Badge className="bg-primary/10 text-primary border-none text-[9px] font-black uppercase">ACTIVE RIG</Badge>
                    </div>
                    <CardTitle className="text-2xl font-black italic tracking-tighter group-hover:text-primary transition-colors">
                        {vehicle.year} {vehicle.model}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-background/40 p-3 rounded-2xl border border-border/50 flex flex-col gap-1">
                            <span className="text-[9px] font-black uppercase text-muted-foreground flex items-center gap-1">
                                <Gauge className="h-3 w-3" /> Status
                            </span>
                            <span className="text-xs font-bold">Under Construction</span>
                        </div>
                        <div className="bg-background/40 p-3 rounded-2xl border border-border/50 flex flex-col gap-1">
                            <span className="text-[9px] font-black uppercase text-muted-foreground flex items-center gap-1">
                                <Zap className="h-3 w-3" /> Energy
                            </span>
                            <span className="text-xs font-bold text-yellow-500">200Ah LiFePO4</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                        <div className="flex -space-x-2">
                            <div className="h-6 w-6 rounded-full bg-primary/20 border border-background" />
                            <div className="h-6 w-6 rounded-full bg-secondary/20 border border-background" />
                            <div className="h-6 w-6 rounded-full bg-muted/20 border border-background flex items-center justify-center text-[8px] font-bold">+3</div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-8 rounded-full text-xs font-bold group-hover:bg-primary group-hover:text-primary-foreground">
                            Manage <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
