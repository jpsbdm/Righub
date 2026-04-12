import { getCategories, searchProducts, seedCategories } from "@/catalog/services/catalog.service";
export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Search, 
    Filter, 
    Battery, 
    Sun, 
    Zap, 
    Refrigerator, 
    Lightbulb,
    ChevronRight,
    Plus,
    LayoutGrid
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const ICON_MAP: Record<string, any> = {
    Battery: Battery,
    Sun: Sun,
    Zap: Zap,
    Refrigerator: Refrigerator,
    Lightbulb: Lightbulb
};

export default async function CatalogPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string, category?: string }>
}) {
    const params = await searchParams;
    let categories = await getCategories();

    // Auto-seed for empty environments
    if (categories.length === 0) {
        await seedCategories();
        categories = await getCategories();
    }

    const products = await searchProducts({
        query: params.q,
        categoryId: params.category
    });

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Dark Premium Header */}
            <div className="bg-muted/10 border-b border-white/5 py-16 mb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="space-y-4">
                            <Badge variant="outline" className="rounded-full px-4 border-primary/20 text-primary font-bold tracking-widest text-[10px] uppercase">
                                Technical Database
                            </Badge>
                            <h1 className="text-5xl font-black tracking-tighter italic">CATÁLOGO TÉCNICO</h1>
                            <p className="text-muted-foreground text-lg max-w-lg">Equipamentos validados pela nossa engenharia para compor sua build com precisão.</p>
                        </div>
                        
                        <div className="flex w-full md:w-auto gap-3">
                            <div className="relative flex-1 md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Buscar por marca, modelo ou especificação..." 
                                    defaultValue={params.q}
                                    className="pl-12 h-14 bg-card/40 border-border/50 rounded-2xl focus-visible:ring-primary/20"
                                />
                            </div>
                            <Button variant="outline" className="h-14 w-14 rounded-2xl border-border/50">
                                <Filter className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Categories Sidebar */}
                    <aside className="space-y-6">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-6 px-4 flex items-center gap-2">
                                <LayoutGrid className="h-3 w-3" /> Categorias
                            </h3>
                            <div className="flex flex-wrap lg:flex-col gap-2">
                                <Link href="/catalog" className="w-full">
                                    <Button 
                                        variant={!params.category ? "secondary" : "ghost"}
                                        className="justify-start h-12 w-full rounded-xl px-4 font-bold text-sm"
                                    >
                                        Todos os Produtos
                                    </Button>
                                </Link>
                                {categories.map((cat) => {
                                    const Icon = ICON_MAP[cat.icon || "Zap"] || Zap;
                                    const isActive = params.category === cat.id;
                                    return (
                                        <Link key={cat.id} href={`/catalog?category=${cat.id}`} className="w-full">
                                            <Button 
                                                variant={isActive ? "secondary" : "ghost"}
                                                className={`justify-start h-12 w-full rounded-xl px-4 transition-all ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                            >
                                                <Icon className={`mr-3 h-4 w-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                                                {cat.name}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-border/50 rounded-[3rem] bg-card/20">
                                <Search className="h-16 w-16 mx-auto mb-6 opacity-10" />
                                <h3 className="text-xl font-bold tracking-tight">NENHUM RESULTADO</h3>
                                <p className="text-muted-foreground mt-2 text-sm">Não encontramos equipamentos para os filtros selecionados.</p>
                                <Button variant="link" className="text-primary mt-4 font-bold">Solicitar inclusão de produto</Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {products.map((product) => (
                                    <CatalogProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function CatalogProductCard({ product }: { product: any }) {
    return (
        <Card className="bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/50 transition-all group overflow-hidden flex flex-col border-2 rounded-[2rem]">
            <div className="aspect-square bg-white shadow-inner flex items-center justify-center relative p-10">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.model} className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                ) : (
                    <div className="h-20 w-20 rounded-3xl bg-primary/5 flex items-center justify-center">
                        <Zap className="h-10 w-10 text-primary/20" />
                    </div>
                )}
                <Badge className="absolute top-4 right-4 bg-primary text-white border-none font-bold uppercase text-[9px] tracking-widest px-3">VALOR TÉCNICO</Badge>
            </div>
            
            <CardHeader className="p-6 flex-grow">
                <div className="flex flex-col mb-4">
                    <span className="text-[10px] font-black uppercase text-primary tracking-widest mb-1">{product.brand}</span>
                    <CardTitle className="text-xl font-black italic tracking-tighter leading-tight group-hover:text-primary transition-colors">{product.model}</CardTitle>
                </div>
                
                <div className="space-y-3">
                    {Object.entries(product.specs as Record<string, any>).slice(0, 3).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tight">
                            <span className="text-muted-foreground/60">{key.replace('_', ' ')}</span>
                            <span className="bg-muted px-2 py-0.5 rounded-sm">{val}</span>
                        </div>
                    ))}
                </div>
            </CardHeader>
            
            <CardFooter className="p-6 pt-0">
                <Button className="w-full gap-2 rounded-2xl h-11 font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all" variant="outline">
                    Ficha Técnica <ChevronRight className="h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}
