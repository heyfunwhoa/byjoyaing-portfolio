import test from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { betterAuth } from "better-auth";
import { getMigrations } from "better-auth/db/migration";
import { learnerAuthOptions } from "./auth-options.ts";
// Real Better Auth + disposable SQLite. No provider calls or credentials.
// This verifies auth semantics; it is not the required Neon/PostgreSQL integration check.
test("email-code signup, replay rejection, session isolation, revocation and account deletion", async () => {
  const database = new DatabaseSync(":memory:");
  const codes = new Map<string, string>();
  const origin = "https://academy.example";
  const options = learnerAuthOptions({
    database,
    origin,
    secret: "synthetic-tests-only-not-production".repeat(2),
    sendCode: async (email, code) => {
      codes.set(email, code);
    },
  });
  await (await getMigrations(options)).runMigrations();
  const auth = betterAuth(options);
  let ip = 0;
  const call = (path: string, body?: unknown, cookie = "") =>
    auth.handler(
      new Request(`${origin}/api/academy/auth${path}`, {
        method: body === undefined ? "GET" : "POST",
        headers: {
          origin,
          "content-type": "application/json",
          "x-forwarded-for": `192.0.2.${++ip}`,
          ...(cookie ? { cookie } : {}),
        },
        ...(body === undefined ? {} : { body: JSON.stringify(body) }),
      }),
    );
  async function signIn(email: string) {
    assert.equal(
      (
        await call("/email-otp/send-verification-otp", {
          email,
          type: "sign-in",
        })
      ).status,
      200,
    );
    const otp = codes.get(email)!;
    const row = database
      .prepare("SELECT value FROM academy_verification WHERE identifier LIKE ?")
      .get(`%${email}%`) as { value: string };
    assert.ok(row);
    assert.ok(!row.value.includes(otp));
    const response = await call("/sign-in/email-otp", { email, otp });
    assert.equal(response.status, 200, await response.clone().text());
    const cookie = response.headers
      .getSetCookie()
      .map((value) => value.split(";")[0])
      .join("; ");
    assert.match(response.headers.getSetCookie().join(), /HttpOnly/i);
    assert.match(response.headers.getSetCookie().join(), /Secure/i);
    assert.notEqual(
      (await call("/sign-in/email-otp", { email, otp })).status,
      200,
    );
    return cookie;
  }
  try {
    const expiredEmail = "expired@example.invalid";
    await call("/email-otp/send-verification-otp", {
      email: expiredEmail,
      type: "sign-in",
    });
    database
      .prepare(
        'UPDATE academy_verification SET "expiresAt" = ? WHERE identifier LIKE ?',
      )
      .run(Date.now() - 1000, `%${expiredEmail}%`);
    assert.notEqual(
      (
        await call("/sign-in/email-otp", {
          email: expiredEmail,
          otp: codes.get(expiredEmail),
        })
      ).status,
      200,
    );
    const raceEmail = "race@example.invalid";
    await call("/email-otp/send-verification-otp", {
      email: raceEmail,
      type: "sign-in",
    });
    const race = await Promise.all(
      [1, 2].map(() =>
        call("/sign-in/email-otp", {
          email: raceEmail,
          otp: codes.get(raceEmail),
        }),
      ),
    );
    assert.equal(race.filter((response) => response.status === 200).length, 1);
    const alice = await signIn("alice@example.invalid");
    const bob = await signIn("bob@example.invalid");
    const a = await (await call("/get-session", undefined, alice)).json();
    const b = await (await call("/get-session", undefined, bob)).json();
    assert.equal(a.user.emailVerified, true);
    assert.notEqual(a.user.id, b.user.id);
    assert.equal((await call("/sign-out", {}, alice)).status, 200);
    assert.equal(
      await (await call("/get-session", undefined, alice)).json(),
      null,
    );
    database
      .prepare('UPDATE academy_session SET "createdAt" = ? WHERE "userId" = ?')
      .run(Date.now() - 11 * 60 * 1000, b.user.id);
    assert.notEqual((await call("/delete-user", {}, bob)).status, 200);
    const freshBob = await signIn("bob@example.invalid");
    assert.equal((await call("/delete-user", {}, freshBob)).status, 200);
    assert.equal(
      await (await call("/get-session", undefined, bob)).json(),
      null,
    );
    assert.equal(
      database
        .prepare("SELECT id FROM academy_user WHERE email = ?")
        .get("bob@example.invalid"),
      undefined,
    );
  } finally {
    database.close();
  }
});
