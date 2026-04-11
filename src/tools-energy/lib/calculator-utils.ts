export interface LoadItem {
    name: string;
    watts: number;
    hoursPerDay: number;
    dutyCycle: number;
    quantity: number;
    isAC: boolean;
}

export interface SystemSettings {
    voltage: number;
    inverterEfficiency: number; // e.g. 0.85
    inverterIdleCurrent: number; // Amps
    batteryCapacityAh: number;
    batteryChemistry: 'lead-acid' | 'lifepo4';
}

export function calculateLoad(items: LoadItem[], settings: SystemSettings) {
    let totalWh = 0;
    const INVERTER_LOSS_FACTOR = 1 / settings.inverterEfficiency;

    items.forEach(item => {
        let wh = item.watts * item.hoursPerDay * (item.dutyCycle / 100) * item.quantity;
        
        // Add inverter losses for AC items
        if (item.isAC) {
            wh = wh * INVERTER_LOSS_FACTOR;
        }
        
        totalWh += wh;
    });

    // Add Inverter Idle Current (24h consumption)
    const idleCurrentWh = settings.inverterIdleCurrent * settings.voltage * 24;
    totalWh += idleCurrentWh;

    const totalAh = totalWh / settings.voltage;

    // Battery Autonomy (Reais)
    const dod = settings.batteryChemistry === 'lifepo4' ? 0.9 : 0.5;
    const usableCapacityAh = settings.batteryCapacityAh * dod;
    const autonomyDays = totalAh > 0 ? usableCapacityAh / totalAh : 0;

    return {
        totalWh,
        totalAh,
        autonomyDays,
        usableCapacityAh,
        items
    };
}
