import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { users } from "@/core-platform/schema";

export const garages = pgTable("garages", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const vehicles = pgTable("vehicles", {
  id: uuid("id").primaryKey().defaultRandom(),
  garageId: uuid("garage_id")
    .notNull()
    .references(() => garages.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  make: text("make").notNull(),
  model: text("model").notNull(),
  year: integer("year").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const vehicleMods = pgTable("vehicle_mods", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleId: uuid("vehicle_id")
    .notNull()
    .references(() => vehicles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  category: text("category").notNull(),
  brand: text("brand"),
  url: text("url"),
  price: integer("price"), // Price in cents
  catalogProductId: uuid("catalog_product_id"), // Optional link to offical catalog
  accessoryId: text("accessory_id"),
  installDate: timestamp("install_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleId: uuid("vehicle_id")
    .notNull()
    .references(() => vehicles.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  type: text("type", { enum: ["image", "video"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const setupSnapshots = pgTable("setup_snapshots", {
  id: uuid("id").primaryKey().defaultRandom(),
  vehicleId: uuid("vehicle_id")
    .notNull()
    .references(() => vehicles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  data: text("data"), // JSON snapshot of the setup
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
