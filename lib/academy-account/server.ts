import "server-only";
import { createHmac } from "node:crypto";
import { betterAuth } from "better-auth";
import { Pool } from "pg";
import { Resend } from "resend";
import { academyConfig } from "./config";
import { learnerAuthOptions } from "./auth-options";

function createRuntime() {
  const config = academyConfig();
  if (!config) return null;
  const pool = new Pool({
    connectionString: config.databaseURL,
    max: 3,
    connectionTimeoutMillis: 5000,
    idleTimeoutMillis: 10000,
    statement_timeout: 5000,
  });
  const mail = new Resend(config.resendKey);
  const auth = betterAuth(
    learnerAuthOptions({
      database: pool,
      origin: config.origin,
      secret: config.secret,
      async sendCode(email, code) {
        const result = await mail.emails.send({
          from: config.from,
          to: email,
          subject: "Your Builder Academy sign-in code",
          text: `Your Builder Academy sign-in code is ${code}.\n\nEnter it on the sign-in page. It expires in 5 minutes and can only be used once.\n\nIf you did not request this code, ignore this email. This email does not subscribe you to marketing.`,
        });
        if (result.error) throw new Error("Sign-in email unavailable");
      },
    }),
  );
  /** Shared atomic buckets, including an email limit independent of client IP. */
  async function allow(key: string, maximum: number, seconds: number) {
    const hash = createHmac("sha256", config!.secret).update(key).digest("hex");
    const result = await pool.query<{ attempts: number }>(
      `
      INSERT INTO academy_throttle (key, attempts, expires_at) VALUES ($1, 1, now() + $2 * interval '1 second')
      ON CONFLICT (key) DO UPDATE SET
        attempts = CASE WHEN academy_throttle.expires_at <= now() THEN 1 ELSE academy_throttle.attempts + 1 END,
        expires_at = CASE WHEN academy_throttle.expires_at <= now() THEN now() + $2 * interval '1 second' ELSE academy_throttle.expires_at END
      RETURNING attempts`,
      [hash, seconds],
    );
    return result.rows[0].attempts <= maximum;
  }
  return { auth, pool, config, allow };
}
let runtime: ReturnType<typeof createRuntime> | undefined;
export function getAcademyRuntime() {
  if (runtime === undefined) runtime = createRuntime();
  return runtime;
}
