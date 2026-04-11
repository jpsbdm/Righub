"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Upload, X, FileImage, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
    onUploadComplete?: (urls: string[]) => void;
    maxFiles?: number;
}

export default function UploadZone({ onUploadComplete, maxFiles = 3 }: UploadZoneProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prev => [...prev, ...acceptedFiles].slice(0, maxFiles));
        setSuccess(false);
    }, [maxFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles
    });

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        setUploading(true);
        // SIMULATION: In a real app, this would be a Server Action or API call to R2/S3
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const fakeUrls = files.map(f => `/uploads/${f.name}`);
        if (onUploadComplete) onUploadComplete(fakeUrls);
        
        setUploading(false);
        setSuccess(true);
        setFiles([]);
    };

    return (
        <div className="space-y-4">
            <div 
                {...getRootProps()} 
                className={`
                    border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3
                    ${isDragActive ? 'border-primary bg-primary/5 scale-[0.99]' : 'border-border hover:border-primary/50 bg-muted/20'}
                `}
            >
                <input {...getInputProps()} />
                <div className="h-12 w-12 rounded-full bg-background border border-border flex items-center justify-center shadow-sm">
                    {uploading ? <Upload className="h-6 w-6 text-primary animate-bounce" /> : <Camera className="h-6 w-6 text-muted-foreground" />}
                </div>
                <div>
                    <p className="font-bold text-sm">Arraste fotos ou clique para selecionar</p>
                    <p className="text-[10px] text-muted-foreground mt-1">PNG, JPG ou WEBP até 5MB (Max {maxFiles} fotos)</p>
                </div>
            </div>

            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3"
                    >
                        <div className="flex flex-wrap gap-3">
                            {files.map((file, idx) => (
                                <div key={idx} className="relative group h-20 w-20 rounded-xl overflow-hidden border border-border">
                                    <img 
                                        src={URL.createObjectURL(file)} 
                                        alt="preview" 
                                        className="h-full w-full object-cover"
                                    />
                                    <button 
                                        onClick={() => removeFile(idx)}
                                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <Button 
                            className="w-full font-bold h-10" 
                            onClick={handleUpload}
                            disabled={uploading}
                        >
                            {uploading ? "Subindo..." : `Enviar ${files.length} Foto(s)`}
                        </Button>
                    </motion.div>
                )}

                {success && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 p-3 bg-green-500/10 text-green-500 rounded-xl border border-green-500/20 text-xs font-bold"
                    >
                        <CheckCircle2 className="h-4 w-4" /> Upload concluído com sucesso!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
