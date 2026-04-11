import { getCategories, searchProducts } from "@/catalog/services/catalog.service";
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
    Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ICON_MAP: Record<string, any> = {
    Refrigerator: Refrigerator,
    Battery: Battery,
    Sun: Sun,
    Zap: Zap,
    Lightbulb: Lightbulb
};

export default async function CatalogPage({
    searchParams
}: {
    searchParams: Promise<{ q?: string, category?: string }>
}) {
    const params = await searchParams;
    const categories = await getCategories();
    const products = await searchProducts({
        query: params.q,
        categoryId: params.category
    });

    return (
        <div className="min-h-screen bg-background pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black italic tracking-tighter mb-2">CATÁLOGO TÉCNICO</h1>
                        <p className="text-muted-foreground">Encontre equipamentos reais para dimensionar sua rig com precisão.</p>
                    </div>
                    
                    <div className="flex w-full md:w-auto gap-2">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Buscar marca ou modelo..." 
                                defaultValue={params.q}
                                className="pl-10 bg-card/50 border-border/50 focus-visible:ring-primary/30"
                            />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Categories Sidebar */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 px-2">Categorias</h3>
                        <div className="flex flex-wrap lg:flex-col gap-1">
                            {categories.map((cat) => {
                                const Icon = ICON_MAP[cat.icon || "Zap"] || Zap;
                                return (
                                    <Button 
                                        key={cat.id}
                                        variant={params.category === cat.id ? "secondary" : "ghost"}
                                        className="justify-start h-10 w-full lg:w-full group"
                                    >
                                        <Icon className={`mr-2 h-4 w-4 ${params.category === cat.id ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}`} />
                                        {cat.name}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {products.length === 0 ? (
                            <div className="text-center py-20 border-2 border-dashed rounded-3xl">
                                <Search className="h-12 w-12 mx-auto mb-4 opacity-10" />
                                <p className="text-muted-foreground">Nenhum produto encontrado.</p>
                                <Button variant="link" className="text-primary mt-2">Sugerir novo equipamento</Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
        <Card className="bg-card/40 backdrop-blur-md border-border/50 hover:border-primary/30 transition-all group overflow-hidden flex flex-col">
            <div className="aspect-square bg-white shadow-inner flex items-center justify-center relative p-8">
                {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.model} className="max-h-full object-contain" />
                ) : (
                    <Zap className="h-12 w-12 text-primary/20" />
                )}
                <Badge className="absolute top-4 right-4 bg-primary text-white border-none font-bold uppercase text-[10px]">PRO DATA</Badge>
            </div>
            
            <CardHeader className="p-4 flex-grow">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-primary/60 tracking-widest">{product.brand}</span>
                    <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">{product.model}</CardTitle>
                </div>
                
                <div className="mt-4 space-y-2">
                    {Object.entries(product.specs as Record<string, any>).slice(0, 3).map(([key, val]) => (
                        <div key={key} className="flex justify-between items-center text-xs">
                            <span className="text-muted-foreground capitalize">{key.replace('_', ' ')}:</span>
                            <span className="font-bold">{val}</span>
                        </div>
                    ))}
                </div>
            </CardHeader>
            
            <CardFooter className="p-4 pt-0">
                <Button className="w-full gap-2 rounded-xl" variant="outline">
                    Ver Detalhes <ChevronRight className="h-3 w-3" />
                </Button>
            </CardFooter>
        </Card>
    );
}
