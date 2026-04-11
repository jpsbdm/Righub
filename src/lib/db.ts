import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import pg from 'pg';

// All schemas
import * as coreSchema from '@/core-platform/schema';
import * as garageSchema from '@/garage/schema';
import * as socialSchema from '@/social/schema';
import * as catalogSchema from '@/catalog/schema';
import * as energySchema from '@/tools-energy/schema';
import * as forumSchema from '@/forum/schema';

const schema = {
  ...coreSchema,
  ...garageSchema,
  ...socialSchema,
  ...catalogSchema,
  ...energySchema,
  ...forumSchema
};

/**
 * Intelligent Database Driver
 * - Uses neon-http for serverless/edge (Production)
 * - Uses node-postgres for local development (Docker)
 */

function createDb() {
  const connectionString = process.env.DATABASE_URL!;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined in .env');
  }

  // Use Neon HTTP for remote connection (Production/Vercel)
  if (connectionString.includes('neon.tech') || process.env.NODE_ENV === 'production') {
    const client = neon(connectionString);
    return drizzle(client, { schema });
  }

  // Use Standard PG for local connection (Docker/localhost)
  const pool = new pg.Pool({
    connectionString: connectionString,
  });
  return drizzlePg(pool, { schema });
}

export const db = createDb();
