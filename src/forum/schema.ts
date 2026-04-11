import { pgTable, text, timestamp, uuid, integer, boolean } from "drizzle-orm/pg-core";
import { users } from "@/core-platform/schema";

export const forumCategories = pgTable("forum_categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug").notNull().unique(),
    description: text("description"),
    icon: text("icon"), // Lucide icon name
    order: integer("order").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const forumTopics = pgTable("forum_topics", {
    id: uuid("id").primaryKey().defaultRandom(),
    categoryId: uuid("category_id")
        .notNull()
        .references(() => forumCategories.id, { onDelete: "cascade" }),
    authorId: uuid("author_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    slug: text("slug").notNull().unique(),
    isPinned: boolean("is_pinned").default(false),
    isLocked: boolean("is_locked").default(false),
    viewCount: integer("view_count").default(0),
    replyCount: integer("reply_count").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const forumReplies = pgTable("forum_replies", {
    id: uuid("id").primaryKey().defaultRandom(),
    topicId: uuid("topic_id")
        .notNull()
        .references(() => forumTopics.id, { onDelete: "cascade" }),
    authorId: uuid("author_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
