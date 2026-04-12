"use client";

import { useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
    Heart, 
    MessageSquare, 
    Share2, 
    MoreHorizontal, 
    Car,
    Clock 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { likePostAction } from "@/social/actions";
import Link from "next/link";
// ... (outros imports ja existentes no arquivo)

interface PostCardProps {
    post: any;
    currentUserId?: string;
}

export function PostCard({ post }: PostCardProps) {
    const [isLiking, startTransition] = useTransition();

    const handleLike = () => {
        startTransition(async () => {
            await likePostAction(post.id);
        });
    };

    return (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden hover:border-primary/30 transition-all shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <Link href={`/user/${post.user?.id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Avatar className="h-10 w-10 border border-primary/20">
                        <AvatarImage src={post.user?.avatarUrl || undefined} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {post.user?.name?.substring(0, 2).toUpperCase() || "RH"}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="text-sm font-bold tracking-tight">{post.user?.name || "Aventureiro"}</h3>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {new Date(post.createdAt).toLocaleDateString()}
                            <Badge variant="outline" className="text-[8px] h-3 px-1 ml-1 bg-primary/5 capitalize">
                                {post.type}
                            </Badge>
                        </div>
                    </div>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>

            <CardContent className="p-4 pt-2">
                {post.content && (
                    <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap mb-4">
                        {post.content}
                    </p>
                )}

                {/* YouTube Video Embed */}
                {post.youtubeUrl && (
                    <div className="rounded-xl overflow-hidden aspect-video bg-black mb-4 border border-border/30">
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${getYouTubeID(post.youtubeUrl)}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                )}

                {/* Media Carousel Simulation */}
                {post.mediaUrls && post.mediaUrls.length > 0 && (
                    <div className="rounded-xl overflow-hidden aspect-video relative group bg-black/20">
                         {/* For now we show the first image or a placeholder */}
                         <img 
                            src={post.mediaUrls[0]} 
                            alt="Post content" 
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                         />
                         {post.mediaUrls.length > 1 && (
                            <Badge className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-md border-none text-[10px]">
                                +{post.mediaUrls.length - 1} fotos
                            </Badge>
                         )}
                    </div>
                )}

                {/* Vehicle Pin - Premium Card Integration */}
                {post.vehicle && (
                    <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-between group/build cursor-pointer hover:bg-primary/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-background/50 flex items-center justify-center text-primary border border-primary/10 shadow-inner">
                                <Car className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase font-black text-primary/60 tracking-widest">Build Anexada</p>
                                <h4 className="text-sm font-bold truncate">
                                    {post.vehicle.year} {post.vehicle.make} {post.vehicle.model}
                                </h4>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover/build:opacity-100 transition-opacity">
                            Ver Specs <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </div>
                )}
            </CardContent>

            <CardFooter className="p-2 px-4 border-t border-border/30 flex justify-between items-center bg-card/10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleLike}
                        disabled={isLiking}
                        className={`flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-primary ${isLiking ? 'opacity-50' : ''}`}
                    >
                        <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-primary text-primary' : ''}`} />
                        <span>{post.likesCount}</span>
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-primary">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.commentsCount}</span>
                    </button>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:text-primary">
                    <Share2 className="h-4 w-4" />
                </button>
            </CardFooter>
        </Card>
    );
}

function getYouTubeID(url: string) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function ChevronRight(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
