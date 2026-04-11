import { forumService } from "@/forum/forum.service";
export const dynamic = 'force-dynamic';
import ForumCategoryList from "@/components/forum/forum-category-list";
import { MessageSquare, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function ForumPage() {
    const categories = await forumService.getCategories();

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Forum Hero */}
            <div className="bg-muted/30 border-b border-border/50 py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left space-y-4">
                            <Badge className="bg-primary/20 text-primary border-none text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                                Comunidade RigHub
                            </Badge>
                            <h1 className="text-5xl font-black tracking-tighter">O Fórum Técnico</h1>
                            <p className="text-muted-foreground max-w-lg text-lg">
                                Discuta elétrica, mecânica e roteiros com a maior comunidade off-grid do Brasil.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-background border border-border/50 p-4 rounded-2xl flex flex-col items-center">
                                <span className="text-2xl font-bold">1.2k</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Tópicos</span>
                            </div>
                            <div className="bg-background border border-border/50 p-4 rounded-2xl flex flex-col items-center">
                                <span className="text-2xl font-bold">4.8k</span>
                                <span className="text-[10px] font-bold text-muted-foreground uppercase">Membros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-4 max-w-6xl -mt-10">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-3 space-y-10">
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <MessageSquare className="h-6 w-6 text-primary" />
                                <h2 className="text-2xl font-bold tracking-tight">Categorias Principais</h2>
                            </div>
                            <ForumCategoryList categories={categories} />
                        </section>
                    </div>

                    <aside className="space-y-8">
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                            <h3 className="font-bold flex items-center gap-2 mb-4 text-sm">
                                <TrendingUp className="h-4 w-4" /> Tópicos em Alta
                            </h3>
                            <div className="space-y-4">
                                <p className="text-xs text-muted-foreground italic">Nenhum tópico recente no momento.</p>
                            </div>
                        </div>
                        
                        <div className="bg-muted/30 border border-border/50 rounded-2xl p-6">
                            <h3 className="font-bold flex items-center gap-2 mb-4 text-sm">
                                <Users className="h-4 w-4" /> Novos Membros
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20" />
                                <div className="h-8 w-8 rounded-full bg-secondary/20" />
                                <div className="h-8 w-8 rounded-full bg-muted-foreground/20" />
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
