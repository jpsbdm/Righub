import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { getVehicleDetails } from "@/garage/services/garage.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
    ChevronLeft, 
    Settings, 
    Zap, 
    Camera, 
    ExternalLink, 
    Package,
    History
} from "lucide-react";
import Link from "next/link";
import { AddModDialog } from "@/components/garage/add-mod-dialog";
import { MOD_CATEGORIES } from "@/garage/constants";
import UploadZone from "@/components/shared/upload-zone";

export default async function VehicleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) redirect("/login");

  const { user } = await lucia.validateSession(sessionId);
  if (!user) redirect("/login");

  const vehicle = await getVehicleDetails(id);
  if (!vehicle || vehicle.userId !== user.id) notFound();

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Link 
        href="/garage" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-6 group"
      >
        <ChevronLeft className="mr-1 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
        Back to Garage
      </Link>

      <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {vehicle.year} {vehicle.make}
            </h1>
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              {vehicle.model}
            </Badge>
          </div>
          <p className="text-muted-foreground">Detailed build management and setup validation.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Camera className="mr-2 h-4 w-4" /> Photos
          </Button>
          <AddModDialog vehicleId={vehicle.id} />
        </div>
      </div>

      <Tabs defaultValue="mods" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px] h-11 bg-card/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="mods" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Settings className="mr-2 h-4 w-4" /> Mods
          </TabsTrigger>
          <TabsTrigger value="setup" className="flex items-center data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
            <Zap className="mr-2 h-4 w-4" /> Energia
          </TabsTrigger>
          <TabsTrigger value="gallery" className="flex items-center data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Camera className="mr-2 h-4 w-4" /> Galeria
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mods" className="space-y-6">
          {vehicle.mods.length === 0 ? (
            <Card className="border-dashed bg-card/30">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium">No modifications added</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-6 text-center max-w-xs">
                  Start tracking your build by adding your first modification or accessory.
                </p>
                <AddModDialog vehicleId={vehicle.id} />
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {(vehicle.mods as any[]).map((mod) => {
                 const category = MOD_CATEGORIES.find(c => c.value === mod.category) || MOD_CATEGORIES[MOD_CATEGORIES.length - 1];
                 const Icon = category.icon;
                 
                 return (
                   <Card key={mod.id} className="bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-all group">
                     <CardHeader className="pb-3">
                       <div className="flex justify-between items-start">
                         <div className="p-2 rounded-lg bg-primary/10 text-primary">
                           <Icon className="h-5 w-5" />
                         </div>
                         {mod.price && (
                           <span className="text-sm font-semibold text-foreground/70">
                             R$ {(mod.price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                           </span>
                         )}
                       </div>
                     </CardHeader>
                     <CardContent>
                       <CardTitle className="text-lg mb-1">{mod.name}</CardTitle>
                       <CardDescription className="font-medium text-foreground/60 mb-4">
                         {mod.brand || 'No Brand Specified'}
                       </CardDescription>
                       
                       <div className="flex items-center justify-between pt-2 border-t border-border/50">
                         <Badge variant="secondary" className="capitalize text-[10px] px-2 py-0">
                           {category.label}
                         </Badge>
                         {mod.url && (
                            <Link href={mod.url} target="_blank" className="text-primary hover:text-primary/80">
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                         )}
                       </div>
                     </CardContent>
                   </Card>
                 );
               })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="setup" className="space-y-6">
          {vehicle.snapshots.length === 0 ? (
             <Card className="border-dashed bg-card/30">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Zap className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium">No energy setup snapshots</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-6 text-center max-w-xs">
                    Run a calculation in the Tools section to save your first off-grid config.
                  </p>
                  <Link 
                    href="/tools/load-calculator" 
                    className={cn(buttonVariants({ variant: "secondary" }))}
                  >
                    Go to Calculator
                  </Link>
                </CardContent>
             </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {(vehicle.snapshots as any[]).map((snapshot) => (
                 <Card key={snapshot.id} className="bg-card/50 border-accent/20 hover:border-accent/50 transition-all h-full">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-accent/10 text-accent">
                                <Zap className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-lg">{snapshot.name}</CardTitle>
                        </div>
                        <Badge variant="outline" className="border-accent/30 text-accent text-[10px]">
                           Snapshot
                        </Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center text-xs text-muted-foreground mt-2">
                            <History className="mr-1 h-3 w-3" />
                            Saved on {new Date(snapshot.createdAt).toLocaleDateString()}
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-accent hover:text-accent hover:bg-accent/5 py-1 h-8" size="sm">
                            View Details
                        </Button>
                    </CardContent>
                 </Card>
               ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="gallery" className="space-y-6">
            <Card className="bg-card/40 backdrop-blur-sm border-border/50">
                <CardHeader>
                    <CardTitle>Fotos do Rig</CardTitle>
                    <CardDescription>Registre a evolução da sua construção.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <UploadZone maxFiles={5} />
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6 border-t border-border/30">
                        <div className="aspect-square rounded-2xl bg-muted/20 border border-border flex items-center justify-center text-muted-foreground italic text-xs">
                            Sua galeria aparecerá aqui.
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
