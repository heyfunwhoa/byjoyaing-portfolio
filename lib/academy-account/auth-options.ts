import type { BetterAuthOptions } from "better-auth";
import { emailOTP } from "better-auth/plugins";

/** Separate learner identity realm: no selected-work grants, roles or CMS access. */
export function learnerAuthOptions(input: {
  database: BetterAuthOptions["database"];
  origin: string;
  secret: string;
  sendCode: (email: string, code: string) => Promise<void>;
}): BetterAuthOptions {
  return {
    appName: "joy. Builder Academy",
    basePath: "/api/academy/auth",
    baseURL: input.origin,
    secret: input.secret,
    database: input.database,
    trustedOrigins: [input.origin],
    emailAndPassword: { enabled: false },
    user: { modelName: "academy_user", deleteUser: { enabled: true } },
    account: { modelName: "academy_account" },
    session: {
      modelName: "academy_session",
      expiresIn: 60 * 60 * 24 * 7,
      freshAge: 60 * 10,
      cookieCache: { enabled: false },
    },
    verification: { modelName: "academy_verification" },
    advanced: {
      cookiePrefix: "joy_academy",
      useSecureCookies: input.origin.startsWith("https:"),
      database: { generateId: "uuid" },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      modelName: "academy_rate_limit",
      window: 60,
      max: 60,
    },
    logger: { disabled: true },
    plugins: [
      emailOTP({
        disableSignUp: false,
        otpLength: 6,
        expiresIn: 300,
        allowedAttempts: 3,
        storeOTP: "hashed",
        rateLimit: { window: 60, max: 3 },
        async sendVerificationOTP({ email, otp, type }) {
          if (type !== "sign-in") throw new Error("Unsupported operation");
          await input.sendCode(email, otp);
        },
      }),
    ],
  };
}
