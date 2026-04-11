"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    Truck, 
    Zap, 
    ChevronRight, 
    ChevronLeft, 
    Check, 
    Star,
    Camera,
    Map
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingWizard() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        vehicleBrand: "",
        vehicleModel: "",
        vehicleYear: "",
        experience: "beginner"
    });
    const router = useRouter();

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const finishOnboarding = async () => {
        // Here we would call an action to save the vehicle and set onboarded = true
        router.push("/feed");
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mb-8">
                    {[1, 2, 3].map(i => (
                        <div 
                            key={i} 
                            className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-8 bg-primary' : 'w-2 bg-muted'}`} 
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
                                <CardHeader className="text-center">
                                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <Star className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-3xl font-black italic tracking-tighter uppercase">Bem-vindo ao RigHub!</CardTitle>
                                    <CardDescription>Vamos começar com o básico. Como devemos te chamar?</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Seu Nome ou Apelido</Label>
                                        <Input 
                                            placeholder="Ex: João Overlander" 
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="h-12 bg-background/50"
                                        />
                                    </div>
                                    <Button className="w-full h-12 font-bold gap-2" size="lg" onClick={nextStep} disabled={!formData.name}>
                                        Continuar <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
                                <CardHeader className="text-center">
                                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <Truck className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-black italic tracking-tighter uppercase">Qual é o seu Rig?</CardTitle>
                                    <CardDescription>O veículo é a alma do seu setup.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Marca</Label>
                                            <Input 
                                                placeholder="Toyota" 
                                                value={formData.vehicleBrand}
                                                onChange={e => setFormData({...formData, vehicleBrand: e.target.value})}
                                                className="bg-background/50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Modelo</Label>
                                            <Input 
                                                placeholder="Hilux" 
                                                value={formData.vehicleModel}
                                                onChange={e => setFormData({...formData, vehicleModel: e.target.value})}
                                                className="bg-background/50"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Ano</Label>
                                        <Input 
                                            type="number"
                                            placeholder="2022" 
                                            value={formData.vehicleYear}
                                            onChange={e => setFormData({...formData, vehicleYear: e.target.value})}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <Button variant="ghost" onClick={prevStep} className="h-12 px-6">
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>
                                        <Button className="flex-1 h-12 font-bold" onClick={nextStep} disabled={!formData.vehicleBrand || !formData.vehicleModel}>
                                            Próximo
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="border-border/50 bg-card/50 backdrop-blur-xl">
                                <CardHeader className="text-center">
                                    <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                                        <Zap className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-black italic tracking-tighter uppercase">Tudo Pronto!</CardTitle>
                                    <CardDescription>Agora você tem acesso às calculadoras e à comunidade.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="bg-muted/30 p-4 rounded-2xl space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-green-500" />
                                            <span>Perfil Criado: <strong>{formData.name}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-green-500" />
                                            <span>Veículo: <strong>{formData.vehicleBrand} {formData.vehicleModel}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <Check className="h-4 w-4 text-green-500" />
                                            <span>Ferramentas de Energia: <strong>Liberadas</strong></span>
                                        </div>
                                    </div>
                                    <Button className="w-full h-14 text-lg font-black italic uppercase tracking-tighter shadow-xl shadow-primary/20" onClick={finishOnboarding}>
                                        Explorar o RigHub <Map className="ml-2 h-5 w-5" />
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
