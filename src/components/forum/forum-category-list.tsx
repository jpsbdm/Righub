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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
                <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <Link href={`/forum/c/${category.slug}`}>
                        <Card className="hover:border-primary/50 hover:bg-primary/5 transition-all group cursor-pointer h-full border-border/50 bg-card/40 backdrop-blur-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Users className="h-16 w-16" />
                            </div>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {getIcon(category.icon)}
                                </div>
                                <div>
                                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{category.name}</CardTitle>
                                    <CardDescription className="line-clamp-1">{category.description}</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="flex justify-between items-center text-xs text-muted-foreground">
                                <span className="font-medium">Explorar discussões</span>
                                <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </CardContent>
                        </Card>
                    </Link>
                </motion.div>
            ))}
        </div>
    );
}
