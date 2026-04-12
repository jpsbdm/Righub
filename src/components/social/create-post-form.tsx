"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
    ImageIcon, 
    Car, 
    Send, 
    X, 
    Plus,
    Video,
    Tv
} from "lucide-react";
import { createPostAction } from "@/social/actions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export function CreatePostForm({ vehicles = [] }: { vehicles?: any[] }) {
    const [isPending, startTransition] = useTransition();
    const [content, setContent] = useState("");
    const [selectedVehicleId, setSelectedVehicleId] = useState<string | undefined>(undefined);
    const [mediaUrls, setMediaUrls] = useState<string[]>([]);
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [isAddingImage, setIsAddingImage] = useState(false);
    const [imageUrlInput, setImageUrlInput] = useState("");

    const handleAddImage = () => {
        if (imageUrlInput) {
            setMediaUrls([...mediaUrls, imageUrlInput]);
            setImageUrlInput("");
            setIsAddingImage(false);
        }
    };

    const handleRemoveImage = (index: number) => {
        setMediaUrls(mediaUrls.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!content && mediaUrls.length === 0 && !youtubeUrl) return;

        startTransition(async () => {
            const formData = new FormData();
            formData.append("content", content);
            if (selectedVehicleId) formData.append("vehicleId", selectedVehicleId);
            formData.append("mediaUrls", JSON.stringify(mediaUrls));
            if (youtubeUrl) formData.append("youtubeUrl", youtubeUrl);
            formData.append("type", selectedVehicleId ? "build_share" : "status");

            await createPostAction(formData);
            
            // Success reset
            setContent("");
            setSelectedVehicleId(undefined);
            setMediaUrls([]);
            setYoutubeUrl("");
        });
    };

    return (
        <Card className="bg-card/40 backdrop-blur-md border-primary/20 shadow-2xl overflow-hidden mb-8">
            <CardContent className="p-4 space-y-4">
                <Textarea 
                    placeholder="What's new with your rig?" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border-none bg-transparent focus-visible:ring-0 text-lg resize-none p-0 min-h-[100px]"
                />

                {mediaUrls.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {mediaUrls.map((url, i) => (
                            <div key={i} className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden border border-border/50">
                                <img src={url} className="h-full w-full object-cover" />
                                <button 
                                    onClick={() => handleRemoveImage(i)}
                                    className="absolute top-1 right-1 bg-background/80 rounded-full p-0.5"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-border/30">
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-primary h-8 px-2"
                            onClick={() => setIsAddingImage(!isAddingImage)}
                        >
                            <ImageIcon className="h-4 w-4 mr-2" /> Photo
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`h-8 px-2 transition-colors ${youtubeUrl ? 'text-accent' : 'text-muted-foreground hover:text-accent'}`}
                            onClick={() => setYoutubeUrl(youtubeUrl ? "" : " ")}
                        >
                            <Video className="h-4 w-4 mr-2" /> Video
                        </Button>
                        <Select value={selectedVehicleId} onValueChange={(val) => setSelectedVehicleId(val || undefined)}>
                            <SelectTrigger className="h-8 border-none bg-transparent hover:bg-primary/5 text-muted-foreground gap-2 w-auto">
                                <Car className="h-4 w-4" />
                                <span className="text-xs truncate max-w-[100px]">
                                    {selectedVehicleId ? "Attached Build" : "Attach Build"}
                                </span>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                {vehicles.map((v) => (
                                    <SelectItem key={v.id} value={v.id}>
                                        {v.year} {v.make} {v.model}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button 
                        size="sm" 
                        onClick={handleSubmit} 
                        disabled={isPending || (!content && mediaUrls.length === 0)}
                        className="rounded-full px-6 shadow-lg shadow-primary/20 cursor-pointer"
                    >
                        {isPending ? "Posting..." : <><Send className="h-4 w-4 mr-2" /> Post</>}
                    </Button>
                </div>

                {isAddingImage && (
                    <div className="flex gap-2 animate-in slide-in-from-top-2">
                        <Input 
                            placeholder="Image URL (R2 Simulation)" 
                            value={imageUrlInput}
                            onChange={(e) => setImageUrlInput(e.target.value)}
                            className="h-8 text-xs"
                            onKeyDown={(e) => e.key === "Enter" && handleAddImage()}
                        />
                        <Button size="sm" variant="outline" className="h-8" onClick={handleAddImage}>
                            <Plus className="h-3 w-3" />
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
