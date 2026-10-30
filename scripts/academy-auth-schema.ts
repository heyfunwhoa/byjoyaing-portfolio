/** READ ONLY. Generate an auth migration for review against the explicitly selected dev DB. */
import { getMigrations } from "better-auth/db/migration";
import { Pool } from "pg";
import { learnerAuthOptions } from "../lib/academy-account/auth-options.ts";
if (
  process.env.ACADEMY_SCHEMA_TARGET !== "development" ||
  !process.env.ACADEMY_DATABASE_URL ||
  !process.env.ACADEMY_AUTH_SECRET ||
  !process.env.ACADEMY_AUTH_URL
) {
  throw new Error(
    "Select a dedicated development database and set ACADEMY_SCHEMA_TARGET=development plus the Academy auth environment first.",
  );
}
const pool = new Pool({
  connectionString: process.env.ACADEMY_DATABASE_URL,
  connectionTimeoutMillis: 5000,
});
try {
  const plan = await getMigrations(
    learnerAuthOptions({
      database: pool,
      origin: process.env.ACADEMY_AUTH_URL,
      secret: process.env.ACADEMY_AUTH_SECRET,
      sendCode: async () => {
        throw new Error("Schema generation never sends email");
      },
    }),
  );
  if (plan.unsafeChanges.length || plan.schemaProblems.length)
    throw new Error("Schema needs manual review; migration not generated.");
  process.stdout.write(await plan.compileMigrations());
} finally {
  await pool.end();
}
