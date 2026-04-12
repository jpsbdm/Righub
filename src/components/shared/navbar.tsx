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
    User,
    ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { logoutAction } from "@/core-platform/actions/auth.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const NAV_ITEMS = [
    { label: "Feed", href: "/feed", icon: MessageSquare },
    { label: "Garage", href: "/garage", icon: Car },
    { label: "Catalog", href: "/catalog", icon: BookOpen },
    { label: "Forum", href: "/forum", icon: LayoutDashboard },
    { label: "Tools", href: "/tools", icon: Zap },
];

export function Navbar({ user }: { user: any }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                                        "h-9 px-4 rounded-full font-medium transition-all text-xs",
                                        isActive 
                                            ? "bg-primary/10 text-primary hover:bg-primary/15 font-bold" 
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
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
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="relative" ref={userMenuRef}>
                            <button 
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-2 p-1 pl-1 pr-2 rounded-full hover:bg-muted transition-colors border border-border/20"
                            >
                                <Avatar className="h-7 w-7 border border-primary/20">
                                    <AvatarImage src={user.avatarUrl} />
                                    <AvatarFallback className="bg-primary/10 text-[10px] font-bold text-primary italic">
                                        {user.name?.substring(0, 2).toUpperCase() || "RH"}
                                    </AvatarFallback>
                                </Avatar>
                                <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", isUserMenuOpen && "rotate-180")} />
                            </button>

                            {/* User Dropdown */}
                            {isUserMenuOpen && (
                                <div className="absolute top-10 right-0 w-56 p-2 bg-background border border-border shadow-2xl rounded-2xl animate-in fade-in zoom-in duration-200">
                                    <div className="px-3 py-2 border-b border-border/50 mb-1">
                                        <p className="text-xs font-black uppercase text-muted-foreground tracking-widest mb-0.5">Logged in as</p>
                                        <p className="text-sm font-bold truncate">{user.name || "RigHub Member"}</p>
                                    </div>
                                    <div className="space-y-0.5">
                                        <Link href={`/user/${user.id}`} onClick={() => setIsUserMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start text-xs rounded-xl h-10 font-medium">
                                                <User className="mr-2 h-4 w-4" /> View Profile
                                            </Button>
                                        </Link>
                                        <Link href="/garage" onClick={() => setIsUserMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start text-xs rounded-xl h-10 font-medium">
                                                <Car className="mr-2 h-4 w-4" /> My Garage
                                            </Button>
                                        </Link>
                                        <Link href="/settings" onClick={() => setIsUserMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full justify-start text-xs rounded-xl h-10 font-medium">
                                                <Settings className="mr-2 h-4 w-4" /> Settings
                                            </Button>
                                        </Link>
                                        <div className="h-px bg-border/50 my-1 mx-2" />
                                        <Button 
                                            variant="ghost" 
                                            className="w-full justify-start text-xs rounded-xl h-10 font-bold text-destructive hover:bg-destructive/10 hover:text-destructive"
                                            onClick={handleLogout}
                                        >
                                            <LogOut className="mr-2 h-4 w-4" /> Log out
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button size="sm" className="rounded-full font-bold px-6">Login</Button>
                        </Link>
                    )}

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
                        {user && (
                            <>
                                <div className="h-[1px] bg-border/50 my-2" />
                                <Link 
                                    href={`/user/${user.id}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 p-4 rounded-2xl font-bold hover:bg-muted"
                                >
                                    <User className="h-5 w-5" /> View Profile
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 p-4 rounded-2xl font-bold text-destructive hover:bg-destructive/10 transition-colors w-full text-left cursor-pointer"
                                >
                                    <LogOut className="h-5 w-5" />
                                    Log out
                                </button>
                            </>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
