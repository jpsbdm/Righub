import { 
    Refrigerator, 
    Lightbulb, 
    Laptop, 
    Tablet, 
    Phone, 
    Fan, 
    Tv, 
    Music, 
    Coffee, 
    Microwave 
} from "lucide-react";

export const EQUIPMENT_PRESETS = [
    { name: "Fridge (45L Compressor)", watts: 45, hoursPerDay: 24, dutyCycle: 30, isAC: false, icon: Refrigerator },
    { name: "LED Lights (Interior)", watts: 10, hoursPerDay: 5, dutyCycle: 100, isAC: false, icon: Lightbulb },
    { name: "Laptop Charging", watts: 65, hoursPerDay: 4, dutyCycle: 100, isAC: true, icon: Laptop },
    { name: "Phone Charging", watts: 15, hoursPerDay: 2, dutyCycle: 100, isAC: false, icon: Phone },
    { name: "Tablet Charging", watts: 25, hoursPerDay: 2, dutyCycle: 100, isAC: false, icon: Tablet },
    { name: "Ventilation Fan", watts: 20, hoursPerDay: 8, dutyCycle: 100, isAC: false, icon: Fan },
    { name: "Smart TV (32\")", watts: 40, hoursPerDay: 3, dutyCycle: 100, isAC: true, icon: Tv },
    { name: "Sound System", watts: 30, hoursPerDay: 4, dutyCycle: 100, isAC: true, icon: Music },
    { name: "Coffee Machine", watts: 1200, hoursPerDay: 0.1, dutyCycle: 100, isAC: true, icon: Coffee },
    { name: "Microwave", watts: 800, hoursPerDay: 0.2, dutyCycle: 100, isAC: true, icon: Microwave },
];
