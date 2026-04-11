import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getGarageByUserId, getVehicleDetails } from "@/garage/services/garage.service";
import { db } from "@/lib/db";
import { vehicles as vehiclesTable } from "@/garage/schema";
import { eq } from "drizzle-orm";
import { AddVehicleDialog } from "@/components/garage/add-vehicle-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, ChevronRight, Settings } from "lucide-react";
import Link from "next/link";

export default async function GaragePage() {
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) redirect("/login");

  const { user } = await lucia.validateSession(sessionId);
  if (!user) redirect("/login");

  // Fetch vehicles for the user
  const userVehicles = await db.select().from(vehiclesTable).where(eq(vehiclesTable.userId, user.id));

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">My Garage</h1>
          <p className="text-muted-foreground mt-1">Manage your off-road rigs and setups.</p>
        </div>
        <AddVehicleDialog />
      </header>

      {userVehicles.length === 0 ? (
        <Card className="border-dashed bg-card/50">
          <CardContent className="flex flex-col items-center justify-center py-20">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">No vehicles found</h3>
            <p className="text-muted-foreground mt-2 text-center max-w-sm">
              Your garage is empty. Add your first vehicle to start tracking your build and energy needs.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVehicles.map((vehicle: any) => (
            <Link key={vehicle.id} href={`/garage/${vehicle.id}`}>
              <Card className="group hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/5 bg-card/50 backdrop-blur-sm cursor-pointer overflow-hidden">
                <div className="h-3 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{vehicle.year} {vehicle.make}</CardTitle>
                      <CardDescription className="text-lg font-medium text-foreground/80">{vehicle.model}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 py-1">
                      Active Rig
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>View Mods & Calculations</span>
                    <ChevronRight className="ml-auto h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
