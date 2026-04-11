import { db } from "@/lib/db";
import { forumCategories, forumTopics, forumReplies } from "./schema";
import { eq, desc, sql } from "drizzle-orm";

export const forumService = {
    // Categories
    async getCategories() {
        return db.select().from(forumCategories).orderBy(forumCategories.order);
    },

    async getCategoryBySlug(slug: string) {
        const [category] = await db
            .select()
            .from(forumCategories)
            .where(eq(forumCategories.slug, slug))
            .limit(1);
        return category;
    },

    // Topics
    async getTopicsByCategoryId(categoryId: string) {
        return db
            .select()
            .from(forumTopics)
            .where(eq(forumTopics.categoryId, categoryId))
            .orderBy(desc(forumTopics.isPinned), desc(forumTopics.createdAt));
    },

    async getTopicBySlug(slug: string) {
        const [topic] = await db
            .select()
            .from(forumTopics)
            .where(eq(forumTopics.slug, slug))
            .limit(1);
        return topic;
    },

    // Replies
    async getRepliesByTopicId(topicId: string) {
        return db
            .select()
            .from(forumReplies)
            .where(eq(forumReplies.topicId, topicId))
            .orderBy(forumReplies.createdAt);
    },

    // Seed Data (for development)
    async seedCategories() {
        const categories = [
            { name: "Elétrica & Solar", slug: "eletrica-solar", description: "Baterias, painéis, inversores e dimensionamento.", icon: "zap", order: 1 },
            { name: "Mecânica 4WD", slug: "mecanica-4wd", description: "Suspensão, pneus, motores e manutenção off-road.", icon: "settings", order: 2 },
            { name: "Vida a Bordo & Camping", slug: "vida-a-bordo", description: "Cozinha, banho, isolamento e organização.", icon: "tent", order: 3 },
            { name: "Caravanismo & Trailers", slug: "caravanismo", description: "Reboques, trailers e motorhomes.", icon: "truck", order: 4 },
            { name: "Roteiros & Destinos", slug: "roteiros", description: "Relatos de viagens e dicas de lugares.", icon: "map", order: 5 },
            { name: "Classificados", slug: "classificados", description: "Compra e venda de acessórios e veículos.", icon: "shopping-cart", order: 6 },
        ];

        for (const cat of categories) {
            await db.insert(forumCategories).values(cat).onConflictDoNothing();
        }
    }
};
