"use server";

import { db } from "@/lib/db";
import { catalogCategories, catalogProducts } from "@/catalog/schema";

export async function seedCatalogAction() {
    // 1. Categories
    const categories = [
        { name: "Refrigeração", slug: "refrigeracao", icon: "Refrigerator" },
        { name: "Baterias", slug: "baterias", icon: "Battery" },
        { name: "Painéis Solares", slug: "solar", icon: "Sun" },
        { name: "Carregadores DCDC", slug: "dcdc", icon: "Zap" },
        { name: "Iluminação", slug: "iluminacao", icon: "Lightbulb" },
    ];

    for (const cat of categories) {
        await db.insert(catalogCategories).values(cat).onConflictDoNothing();
    }

    const allCats = await db.select().from(catalogCategories);
    const fridgeCat = allCats.find(c => c.slug === "refrigeracao");
    const batteryCat = allCats.find(c => c.slug === "baterias");

    // 2. Products
    if (fridgeCat) {
        await db.insert(catalogProducts).values({
            categoryId: fridgeCat.id,
            brand: "Dometic",
            model: "CFX3 45",
            specs: {
                watts: 60,
                voltage: "12V/24V",
                capacity_litres: 45,
                avg_draw_ah: 1.1 // Ah/h at 25C
            }
        }).onConflictDoNothing();
    }

    if (batteryCat) {
        await db.insert(catalogProducts).values({
            categoryId: batteryCat.id,
            brand: "Renogy",
            model: "100Ah Lithium Iron Phosphate",
            specs: {
                ah: 100,
                voltage: 12,
                chemistry: "LFP",
                cycle_life: 4000
            }
        }).onConflictDoNothing();
    }

    return { success: true };
}
