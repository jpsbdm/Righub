import { db } from "./src/lib/db";
import { sql } from "drizzle-orm";

async function inspect() {
    try {
        console.log("Checking tables...");
        const tables = await db.execute(sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
        console.log("Tables:", tables.rows.map(r => r.table_name));

        console.log("\nInspecting 'users' columns:");
        const columns = await db.execute(sql`SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'users'`);
        columns.rows.forEach(c => console.log(`${c.column_name}: ${c.data_type} (${c.is_nullable})`));

    } catch (e) {
        console.error("Inspection failed:", e);
    }
}

inspect();
