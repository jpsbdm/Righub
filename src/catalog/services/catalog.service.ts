"use server";
import "server-only";
import { db } from "@/lib/db";
import { catalogCategories, catalogProducts, catalogSubmissions } from "@/catalog/schema";
import { eq, like, and, or, sql } from "drizzle-orm";

export async function getCategories() {
    return await db.select().from(catalogCategories).orderBy(catalogCategories.name);
}

export async function searchProducts(params: {
    query?: string;
    categoryId?: string;
    brand?: string;
    limit?: number;
    offset?: number;
}) {
    const filters = [];
    
    if (params.categoryId) {
        filters.push(eq(catalogProducts.categoryId, params.categoryId));
    }
    
    if (params.brand) {
        filters.push(eq(catalogProducts.brand, params.brand));
    }
    
    if (params.query) {
        filters.push(or(
            like(catalogProducts.brand, `%${params.query}%`),
            like(catalogProducts.model, `%${params.query}%`)
        ));
    }

    return await db.select()
        .from(catalogProducts)
        .where(and(...filters, eq(catalogProducts.status, "active")))
        .limit(params.limit || 20)
        .offset(params.offset || 0);
}

export async function getProductById(id: string) {
    const [product] = await db.select().from(catalogProducts).where(eq(catalogProducts.id, id));
    return product;
}

export async function submitProduct(userId: string, data: {
    categoryId: string;
    brand: string;
    model: string;
    specs: any;
}) {
    const [submission] = await db.insert(catalogSubmissions).values({
        userId,
        categoryId: data.categoryId,
        brand: data.brand,
        model: data.model,
        specs: data.specs,
    }).returning();
    return submission;
}
export async function seedCategories() {
    const categories = [
        { name: "Baterias", slug: "baterias", icon: "Battery" },
        { name: "Painéis Solares", slug: "paineis-solares", icon: "Sun" },
        { name: "Inversores & Carregadores", slug: "inversores", icon: "Zap" },
        { name: "Geladeiras & Freezers", slug: "geladeiras", icon: "Refrigerator" },
        { name: "Iluminação", slug: "iluminacao", icon: "Lightbulb" },
    ];

    for (const cat of categories) {
        await db.insert(catalogCategories).values(cat).onConflictDoNothing();
    }
}
