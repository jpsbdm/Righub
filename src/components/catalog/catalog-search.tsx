"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Loader2, Zap, Check } from "lucide-react";
import { searchProducts } from "@/catalog/services/catalog.service";
import { Card } from "@/components/ui/card";

interface CatalogSearchProps {
    onSelect: (product: any) => void;
}

export function CatalogSearch({ onSelect }: CatalogSearchProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (query.length < 2) {
                setResults([]);
                return;
            }
            setLoading(true);
            try {
                // Since searchProducts is a server action, this works in client component
                const products = await searchProducts({ query });
                setResults(products);
                setOpen(true);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [query]);

    return (
        <div className="relative w-full">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Pesquisar no catálogo oficial..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-10 h-10 bg-primary/5 border-primary/20 focus-visible:ring-primary/30"
                />
                {loading && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-primary" />
                )}
            </div>

            {open && results.length > 0 && (
                <Card className="absolute z-50 w-full mt-2 max-h-60 overflow-y-auto shadow-2xl border-primary/20 bg-card/95 backdrop-blur-md p-1">
                    {results.map((product) => (
                        <button
                            key={product.id}
                            onClick={() => {
                                onSelect(product);
                                setOpen(false);
                                setQuery(product.model);
                            }}
                            className="w-full flex items-center gap-3 p-2 hover:bg-primary/10 rounded-lg transition-colors text-left group"
                        >
                            <div className="h-10 w-10 shrink-0 rounded bg-background border border-border/50 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-primary/40 group-hover:text-primary transition-colors" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-black uppercase text-primary/60 tracking-widest">{product.brand}</p>
                                <p className="text-sm font-bold truncate">{product.model}</p>
                            </div>
                            <Check className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    ))}
                </Card>
            )}
        </div>
    );
}
