export interface SolarSettings {
    peakSunHours: number; // e.g. 4.5
    panelEfficiencyFactor: number; // e.g. 0.8 (20% loss)
    controllerType: 'mppt' | 'pwm';
    rechargeTargetPercent: number; // e.g. 100 (recharge daily consumption)
}

export function calculateSolarRequirement(dailyConsumptionWh: number, settings: SolarSettings) {
    // MPPT is ~98% efficient, PWM is ~70-80% efficient (in terms of power transfer)
    const controllerEfficiency = settings.controllerType === 'mppt' ? 0.98 : 0.75;
    
    // Total system conversion efficiency
    const totalEfficiency = settings.panelEfficiencyFactor * controllerEfficiency;
    
    // Required Watts from panels to cover consumption in peak sun hours
    // Formula: Watts = Wh / (Hours * Efficiency)
    const requiredPanelWatts = dailyConsumptionWh / (settings.peakSunHours * totalEfficiency);
    
    // Safety Margin / Recharge Target (if user wants to recharge more than they spend)
    const targetPanelWatts = requiredPanelWatts * (settings.rechargeTargetPercent / 100);

    return {
        requiredPanelWatts,
        targetPanelWatts,
        totalEfficiency,
        peakSunHours: settings.peakSunHours
    };
}

export function estimateDailyProduction(panelWatts: number, settings: SolarSettings) {
    const controllerEfficiency = settings.controllerType === 'mppt' ? 0.98 : 0.75;
    const totalEfficiency = settings.panelEfficiencyFactor * controllerEfficiency;
    
    const dailyProductionWh = panelWatts * settings.peakSunHours * totalEfficiency;
    
    return dailyProductionWh;
}
