import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getGlobalFeed } from "@/social/services/social.service";
import { getVehiclesByUserId } from "@/garage/services/garage.service";
import { PostCard } from "@/components/social/post-card";
import { CreatePostForm } from "@/components/social/create-post-form";
import { 
    LayoutDashboard, 
    Navigation, 
    Users, 
    TrendingUp,
    Filter,
    Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function FeedPage() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user } = await lucia.validateSession(sessionId);
    if (!user) redirect("/login");

    const posts = await getGlobalFeed();
    const vehicles = await getVehiclesByUserId(user.id);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    
                    {/* Left Sidebar: Navigation (Desktop) */}
                    <div className="hidden lg:flex flex-col gap-4 sticky top-10 h-fit">
                        <div className="p-4 rounded-xl bg-card/40 border border-border/50">
                            <h2 className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-4">Explorar</h2>
                            <nav className="space-y-1">
                                <Link href="/feed" className="block">
                                    <Button variant="ghost" className="w-full justify-start text-primary font-bold bg-primary/5">
                                        <Users className="mr-2 h-4 w-4" /> Global Feed
                                    </Button>
                                </Link>
                                <Link href="/forum" className="block">
                                    <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                                        <Navigation className="mr-2 h-4 w-4" /> Expedições
                                    </Button>
                                </Link>
                                <Link href="/catalog" className="block">
                                    <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground">
                                        <TrendingUp className="mr-2 h-4 w-4" /> Trending Builds
                                    </Button>
                                </Link>
                            </nav>
                        </div>

                        <div className="p-4 rounded-xl bg-card/40 border border-border/50">
                            <h2 className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-4">Filtros</h2>
                            <Button variant="outline" size="sm" className="w-full justify-between h-9 text-xs">
                                <span className="flex items-center"><Filter className="mr-2 h-3 w-3" /> Categorias</span>
                                <span className="text-[10px] bg-muted px-1.5 rounded">All</span>
                            </Button>
                        </div>
                    </div>

                    {/* Main Content: Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        <CreatePostForm vehicles={vehicles} />

                        <div className="space-y-6">
                            {posts.length === 0 ? (
                                <div className="text-center py-20 border-2 border-dashed rounded-3xl text-muted-foreground">
                                    <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                    <p className="text-lg font-medium">O mural está vazio.</p>
                                    <p className="text-sm">Seja o primeiro a compartilhar sua jornada!</p>
                                </div>
                            ) : (
                                posts.map((post) => (
                                    <PostCard key={post.id} post={post} currentUserId={user.id} />
                                ))
                            )}
                        </div>
                    </div>

                    {/* Right Sidebar: Active Builds / Stats */}
                    <div className="hidden lg:flex flex-col gap-6 sticky top-10 h-fit">
                        <CardWrapper title="Builds em Destaque">
                             <div className="space-y-4">
                                 {/* Mock trending builds */}
                                 <BuildMiniCard name="Toyota Hilux GR" owner="Carlos Expedições" rating={4.9} />
                                 <BuildMiniCard name="Defender 110" owner="Joana Overlander" rating={4.8} />
                             </div>
                        </CardWrapper>

                        <div className="p-6 rounded-3xl bg-primary shadow-2xl shadow-primary/20 text-primary-foreground relative overflow-hidden group">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black italic mb-2 tracking-tighter">PRO RIGS</h3>
                                <p className="text-sm opacity-90 leading-snug mb-4">Tenha acesso a specs detalhadas e chats com instaladores.</p>
                                <Link href="/pricing" className="block w-full">
                                    <Button variant="secondary" size="sm" className="w-full rounded-full font-bold">Ver Planos</Button>
                                </Link>
                            </div>
                            <div className="absolute -bottom-6 -right-6 opacity-20 transform group-hover:scale-110 transition-transform">
                                <LayoutDashboard className="h-32 w-32" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CardWrapper({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="p-4 rounded-3xl bg-card/40 border border-border/50">
            <h2 className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-4">{title}</h2>
            {children}
        </div>
    )
}

function BuildMiniCard({ name, owner, rating }: any) {
    return (
        <div className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Car className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate group-hover:text-primary transition-colors">{name}</h4>
                <p className="text-[10px] text-muted-foreground truncate">@{owner}</p>
            </div>
        </div>
    )
}
