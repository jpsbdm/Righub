import { 
    Wrench, 
    CircleDot, 
    Zap, 
    ShieldAlert, 
    Cpu, 
    Activity, 
    Package 
} from "lucide-react";

export const MOD_CATEGORIES = [
    { value: "suspension", label: "Suspension", icon: Activity },
    { value: "winch", label: "Winch", icon: Wrench },
    { value: "tires", label: "Tires & Wheels", icon: CircleDot },
    { value: "brakes", label: "Brakes", icon: ShieldAlert },
    { value: "engine", label: "Engine & Performance", icon: Cpu },
    { value: "electrical", label: "Electrical", icon: Zap },
    { value: "other", label: "Other", icon: Package },
];
