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
            { name: "Electrical & Solar", slug: "electrical-solar", description: "Batteries, panels, inverters and system sizing.", icon: "zap", order: 1 },
            { name: "Mechanical & 4WD", slug: "mechanical-4wd", description: "Suspension, tires, engines and off-road maintenance.", icon: "settings", order: 2 },
            { name: "Builds & Layouts", slug: "builds-layouts", description: "Kitchen setups, insulation, storage and van life design.", icon: "tent", order: 3 },
            { name: "Caravans & Campers", slug: "caravans-campers", description: "Off-road trailers, hybrids and motorhomes.", icon: "truck", order: 4 },
            { name: "Tracks & Trips", slug: "tracks-trips", description: "Expedition reports and campsite recommendations.", icon: "map", order: 5 },
            { name: "Classifieds", slug: "classifieds", description: "Buy and sell 4WD accessories and vehicles.", icon: "shopping-cart", order: 6 },
        ];

        for (const cat of categories) {
            await db.insert(forumCategories).values(cat).onConflictDoNothing();
        }
    }
};
