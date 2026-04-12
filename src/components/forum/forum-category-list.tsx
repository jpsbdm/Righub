"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Zap, 
    Settings, 
    Tent, 
    Truck, 
    Map, 
    ShoppingCart,
    MessageSquare,
    ChevronRight,
    Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
    description: string | null;
    icon: string | null;
    slug: string;
}

export default function ForumCategoryList({ categories }: { categories: Category[] }) {
    const getIcon = (iconName: string | null) => {
        switch (iconName) {
            case 'zap': return <Zap className="h-6 w-6" />;
            case 'settings': return <Settings className="h-6 w-6" />;
            case 'tent': return <Tent className="h-6 w-6" />;
            case 'truck': return <Truck className="h-6 w-6" />;
            case 'map': return <Map className="h-6 w-6" />;
            case 'shopping-cart': return <ShoppingCart className="h-6 w-6" />;
            default: return <MessageSquare className="h-6 w-6" />;
        }
    };

    return (
        <div className="space-y-4">
            {categories.map((category, idx) => (
                <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                >
                    <Link href={`/forum/c/${category.slug}`}>
                        <div className="flex items-center justify-between p-6 rounded-[1.5rem] bg-card/40 border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-pointer">
                            <div className="flex items-center gap-6">
                                <div className="h-14 w-14 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all shadow-inner">
                                    {getIcon(category.icon)}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-primary transition-colors">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground font-medium max-w-md">
                                        {category.description}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="hidden md:flex items-center gap-12">
                                <div className="text-center">
                                    <p className="text-lg font-black tracking-tighter leading-none italic uppercase">124</p>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Topics</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-lg font-black tracking-tighter leading-none italic uppercase">2.1k</p>
                                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Posts</p>
                                </div>
                                <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
