export interface DcdcSettings {
    chargerAmps: number;
    systemVoltage: number;
    drivingHoursPerDay: number;
    efficiency: number;
}

export interface DcdcResult {
    dailyGenerationWh: number;
    dailyGenerationAh: number;
    totalEfficiency: number;
}

export const DCDC_PRESETS = [
    { id: 'victron-30', brand: 'Victron', model: 'Orion-Tr Smart 12/12-30', amps: 30, voltage: 12 },
    { id: 'renogy-40', brand: 'Renogy', model: 'DCDC Battery Charger 40A', amps: 40, voltage: 12 },
    { id: 'redarc-50', brand: 'Redarc', model: 'BCDC1250D', amps: 50, voltage: 12 },
    { id: 'generic-20', brand: 'Generic', model: 'DCDC Charger 20A', amps: 20, voltage: 12 },
];

export function calculateDcdcGeneration(settings: DcdcSettings): DcdcResult {
    const dailyGenerationAh = settings.chargerAmps * settings.drivingHoursPerDay * settings.efficiency;
    const dailyGenerationWh = dailyGenerationAh * settings.systemVoltage;

    return {
        dailyGenerationWh,
        dailyGenerationAh,
        totalEfficiency: settings.efficiency
    };
}
