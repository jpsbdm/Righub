export const AUSTRALIAN_VEHICLES = {
    "Toyota": [
        "LandCruiser 79 Series",
        "LandCruiser 200 Series",
        "LandCruiser 300 Series",
        "LandCruiser Prado",
        "Hilux",
        "Fortuner",
        "FJ Cruiser",
        "76 Series Wagon"
    ],
    "Ford": [
        "Ranger",
        "Everest",
        "F-150"
    ],
    "Nissan": [
        "Patrol Y61 (GU)",
        "Patrol Y62",
        "Navara"
    ],
    "Isuzu": [
        "D-MAX",
        "MU-X"
    ],
    "Mitsubishi": [
        "Triton",
        "Pajero Sport",
        "Pajero"
    ],
    "Mazda": [
        "BT-50"
    ],
    "Suzuki": [
        "Jimny",
        "Vitara"
    ],
    "Jeep": [
        "Wrangler",
        "Gladiator",
        "Grand Cherokee"
    ],
    "Land Rover": [
        "Defender (Classic)",
        "Defender (New)",
        "Discovery",
        "Range Rover"
    ],
    "RAM": [
        "1500",
        "2500"
    ],
    "Chevrolet": [
        "Silverado"
    ]
};

export type VehicleMake = keyof typeof AUSTRALIAN_VEHICLES;

export function getModelsForMake(make: string): string[] {
    return AUSTRALIAN_VEHICLES[make as VehicleMake] || [];
}

export function getAllMakes(): string[] {
    return Object.keys(AUSTRALIAN_VEHICLES);
}
