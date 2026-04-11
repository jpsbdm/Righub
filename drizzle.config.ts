import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: [
    "./src/core-platform/schema.ts",
    "./src/garage/schema.ts",
    "./src/social/schema.ts",
    "./src/catalog/schema.ts"
  ],
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    // Usando a URL do .env
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
