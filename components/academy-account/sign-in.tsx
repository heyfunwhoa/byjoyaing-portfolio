"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { academyAuthClient } from "@/lib/academy-account/client";
import { lessonHref } from "@/lib/academy-account/policy";
export function AcademySignIn({ lesson }: { lesson: string | null }) {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [retryAt, setRetryAt] = useState(0);
  const [now, setNow] = useState(0);
  const codeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (sent) codeRef.current?.focus();
    else emailRef.current?.focus();
  }, [sent]);
  useEffect(() => {
    if (!retryAt) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [retryAt]);
  async function send() {
    setBusy(true);
    setMessage("");
    try {
      const { error } = await academyAuthClient.emailOtp.sendVerificationOtp({
        email: email.trim().toLowerCase(),
        type: "sign-in",
      });
      if (error) throw new Error("Unavailable");
      setSent(true);
      setCode("");
      setNow(Date.now());
      setRetryAt(Date.now() + 60000);
      setMessage(
        "Check your inbox for a six-digit code. It expires in five minutes. Use the newest code if you requested another.",
      );
    } catch {
      setMessage(
        "We could not send a code. Check your address, wait a minute and try again. Email requests are limited to three per hour.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!sent) {
      await send();
      return;
    }
    setBusy(true);
    setMessage("");
    try {
      const { error } = await academyAuthClient.signIn.emailOtp({
        email: email.trim().toLowerCase(),
        otp: code,
      });
      if (error) throw new Error("Invalid");
      // Only a registry-backed lesson is accepted. No arbitrary return URL.
      window.location.assign(
        lesson ? lessonHref(lesson) : "/ai-academy/my-learning",
      );
    } catch {
      setMessage(
        "That code could not be verified. Try again or request a new code when available.",
      );
      setBusy(false);
    }
  }
  const button =
    "min-h-11 rounded-lg border border-border px-4 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";
  return (
    <div className="max-w-lg">
      <p className="mt-4 leading-7 text-muted">
        Explore freely. Sign in when you want to save a lesson and pick up where
        you left off.
      </p>
      <form className="mt-6 space-y-4" onSubmit={submit}>
        <label className="block font-medium" htmlFor="academy-email">
          Email address
        </label>
        <input
          ref={emailRef}
          id="academy-email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          value={email}
          disabled={busy || sent}
          onChange={(event) => setEmail(event.target.value)}
          className="min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2"
        />
        {sent && (
          <>
            <label className="block font-medium" htmlFor="academy-code">
              Six-digit sign-in code
            </label>
            <input
              ref={codeRef}
              id="academy-code"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="[0-9]{6}"
              minLength={6}
              maxLength={6}
              required
              value={code}
              onChange={(event) =>
                setCode(event.target.value.replace(/\D/g, ""))
              }
              disabled={busy}
              className="min-h-11 w-full rounded-lg border border-border bg-card px-3 py-2 font-mono"
            />
          </>
        )}
        <button
          className={`${button} bg-accent text-accent-foreground`}
          disabled={busy}
          type="submit"
        >
          {busy
            ? "Please wait…"
            : sent
              ? "Sign in and continue"
              : "Email me a sign-in code"}
        </button>
        {sent && (
          <div className="flex flex-wrap gap-3">
            <button
              className={button}
              type="button"
              disabled={busy || now < retryAt}
              onClick={() => void send()}
            >
              {now < retryAt
                ? `Resend in ${Math.ceil((retryAt - now) / 1000)}s`
                : "Send a new code"}
            </button>
            <button
              className={button}
              type="button"
              disabled={busy}
              onClick={() => {
                setSent(false);
                setCode("");
                setMessage("");
              }}
            >
              Use another email
            </button>
          </div>
        )}
        <p role="status" aria-live="polite" className="text-sm leading-6">
          {message}
        </p>
      </form>
      <p className="mt-6 text-sm leading-6 text-muted">
        Your first verified sign-in creates a learner account. We store your
        email, account/session details, saved lesson IDs and reading choices.
        This does not subscribe you to email marketing or grant access to
        private work. Quiz answers and practice submissions are not uploaded by
        this feature.
      </p>
      <p className="mt-3 text-sm leading-6 text-muted">
        You can clear learning records or delete your learner account from My
        learning.{" "}
        <Link
          href="/ai-academy/account-privacy"
          className="text-accent underline"
        >
          Learning account privacy
        </Link>
      </p>
      <Link
        className="mt-6 inline-flex min-h-11 items-center text-accent underline"
        href={lesson ? lessonHref(lesson) : "/ai-academy"}
      >
        Keep reading without signing in
      </Link>
    </div>
  );
}
