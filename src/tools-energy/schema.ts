import { pgTable, text, timestamp, uuid, real, integer, decimal, boolean } from "drizzle-orm/pg-core";
import { users } from "@/core-platform/schema";
import { vehicles } from "@/garage/schema";

export const calculationRuns = pgTable("calculation_runs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  vehicleId: uuid("vehicle_id")
    .references(() => vehicles.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  totalAh: decimal("total_ah", { precision: 10, scale: 2 }).notNull(),
  totalWh: decimal("total_wh", { precision: 10, scale: 2 }).notNull(),
  voltage: integer("voltage").default(12).notNull(), // 12V or 24V system
  visibility: text("visibility", { enum: ["private", "unlisted", "public"] }).default("private").notNull(),
  shareSlug: text("share_slug").unique(),
  ratingScore: decimal("rating_score", { precision: 3, scale: 1 }),
  solarWatts: integer("solar_watts"),
  batteryAh: integer("battery_ah"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const calculationItems = pgTable("calculation_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  runId: uuid("run_id")
    .notNull()
    .references(() => calculationRuns.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  watts: decimal("watts", { precision: 10, scale: 2 }).notNull(),
  hoursPerDay: decimal("hours_per_day", { precision: 4, scale: 2 }).notNull(),
  dutyCycle: integer("duty_cycle").default(100).notNull(), // percentage (0-100)
  isAC: boolean("is_ac").default(false).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
