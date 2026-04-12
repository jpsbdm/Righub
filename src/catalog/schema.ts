import { pgTable, text, timestamp, uuid, jsonb, integer } from "drizzle-orm/pg-core";
import { users } from "@/core-platform/schema";

export const catalogCategories = pgTable("catalog_categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  icon: text("icon"), // Lucide icon name
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const catalogProducts = pgTable("catalog_products", {
  id: uuid("id").primaryKey().defaultRandom(),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => catalogCategories.id, { onDelete: "restrict" }),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  sku: text("sku"),
  imageUrl: text("image_url"),
  specs: jsonb("specs").default({}).notNull(), // Dynamic technical specs
  status: text("status", { enum: ["active", "draft", "discontinued"] }).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const catalogSubmissions = pgTable("catalog_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => catalogCategories.id),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  specs: jsonb("specs").default({}).notNull(),
  status: text("status", { enum: ["pending", "approved", "rejected"] }).default("pending").notNull(),
  moderationNotes: text("moderation_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
