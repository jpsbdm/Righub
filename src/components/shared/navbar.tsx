"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
    LayoutDashboard, 
    Car, 
    Zap, 
    MessageSquare, 
    BookOpen, 
    Settings, 
    LogOut,
    Menu,
    X,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { logoutAction } from "@/core-platform/actions/auth.actions";

const NAV_ITEMS = [
    { label: "Feed", href: "/feed", icon: MessageSquare },
    { label: "Garagem", href: "/garage", icon: Car },
    { label: "Catálogo", href: "/catalog", icon: BookOpen },
    { label: "Fórum", href: "/forum", icon: LayoutDashboard },
    { label: "Ferramentas", href: "/tools/load-calculator", icon: Zap },
];

export function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logoutAction();
        router.push("/login");
        router.refresh();
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
            <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
                
                {/* Logo */}
                <Link href="/feed" className="flex items-center gap-2 group">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-black italic transform transition-transform group-hover:rotate-12">
                        R
                    </div>
                    <span className="font-black italic tracking-tighter text-xl hidden sm:inline-block">RIGHUB</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link key={item.href} href={item.href}>
                                <Button 
                                    variant="ghost" 
                                    size="sm"
                                    className={cn(
                                        "h-9 px-4 rounded-full font-medium transition-all",
                                        isActive 
                                            ? "bg-primary/10 text-primary hover:bg-primary/15" 
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    <Icon className={cn("mr-2 h-4 w-4", isActive && "animate-pulse")} />
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <div className="h-8 w-[1px] bg-border/50 mx-2 hidden md:block" />
                    
                    <Link href="/garage">
                         <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>

                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-full hidden md:flex text-muted-foreground hover:text-destructive transition-colors"
                        onClick={handleLogout}
                    >
                        <LogOut className="h-4 w-4" />
                    </Button>

                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden rounded-full"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-2xl animate-in slide-in-from-top duration-300">
                    <nav className="p-4 flex flex-col gap-2">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link 
                                    key={item.href} 
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 p-4 rounded-2xl font-bold transition-colors",
                                        isActive 
                                            ? "bg-primary/10 text-primary" 
                                            : "hover:bg-muted"
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            );
                        })}
                        <div className="h-[1px] bg-border/50 my-2" />
                        <button 
                            onClick={handleLogout}
                            className="flex items-center gap-3 p-4 rounded-2xl font-bold text-destructive hover:bg-destructive/10 transition-colors w-full text-left"
                        >
                            <LogOut className="h-5 w-5" />
                            Sair da Conta
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}
