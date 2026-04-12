"use client";

import { Button } from "@/components/ui/button";
import { Share2, Settings, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AddModDialog } from "@/components/garage/add-mod-dialog";

export function VehicleHeaderActions({ vehicleId, isOwner }: { vehicleId: string, isOwner: boolean }) {
    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard! 📋");
    };

    return (
        <div className="border-b border-border/50 bg-card/20 backdrop-blur-md sticky top-16 z-30">
            <div className="container mx-auto px-4 max-w-6xl h-14 flex items-center justify-between">
                <Link href="/garage">
                    <Button variant="ghost" size="sm" className="gap-2 font-bold text-muted-foreground hover:text-foreground cursor-pointer">
                        <ChevronLeft className="h-4 w-4" /> Back to Garage
                    </Button>
                </Link>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-9 w-9 rounded-xl cursor-pointer"
                        onClick={handleShare}
                    >
                        <Share2 className="h-4 w-4" />
                    </Button>
                    {isOwner && (
                        <Button variant="secondary" size="sm" className="gap-2 font-bold rounded-xl px-4 cursor-pointer">
                            <Settings className="h-4 w-4" /> Edit Rig
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export function AddModActionWrapper({ vehicleId }: { vehicleId: string }) {
    return <AddModDialog vehicleId={vehicleId} />;
}
