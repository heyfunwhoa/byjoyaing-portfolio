"use client";

import { PUBLIC_CONTACT_EMAIL } from "@/lib/portfolio/public-contact";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

type Status = "idle" | "sending" | "sent" | "error";
type Mode = "message" | "access";

const fieldClass =
  "h-11 rounded-md border border-border bg-background px-3 text-base text-foreground outline-none focus:border-accent";

const focusOptions = [
  "Enterprise selling and deal strategy",
  "Coaching, onboarding and enablement",
  "Competitive intelligence and GTM systems",
  "Broader leadership fit",
] as const;

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  window.addEventListener("popstate", onStoreChange);
  return () => {
    window.removeEventListener("hashchange", onStoreChange);
    window.removeEventListener("popstate", onStoreChange);
  };
}

function modeFromHash(): Mode {
  return window.location.hash === "#access" ? "access" : "message";
}

export function InquiryForm() {
  const mode = useSyncExternalStore(
    subscribeToHash,
    modeFromHash,
    () => "message" as const,
  );
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  function chooseMode(next: Mode) {
    const hash = next === "access" ? "#access" : "#write";
    if (window.location.hash !== hash) {
      const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
      window.history.pushState(null, "", nextUrl);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    setStatus("idle");
    setMessage("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const note = String(data.get("message") ?? "");
    const focus = String(data.get("sampleFocus") ?? "General");

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: mode === "access" ? `Selected Work inquiry — ${focus}: ${note}` : note,
          website: data.get("website"),
          startedAt: startedAt.current,
        }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error ?? "Something went wrong.");
        return;
      }

      form.reset();
      setStatus("sent");
      setMessage(
        mode === "access"
          ? "Request sent. I’ll review it and follow up if I can share an appropriate example. This does not unlock private files."
          : "Message sent. You should get a confirmation email. I’ll reply if I can help.",
      );
    } catch {
      setStatus("error");
      setMessage(`Could not send that message. Email ${PUBLIC_CONTACT_EMAIL} instead.`);
    }
  }

  return (
    <form
      id="write"
      onSubmit={onSubmit}
      className="relative flex max-w-xl flex-col gap-4 lg:max-w-none"
    >
      <div id="access" className="flex scroll-mt-24 flex-wrap gap-1" role="group" aria-label="Contact type">
        {(
          [
            ["message", "Message"],
            ["access", "Request work examples"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            aria-pressed={mode === value}
            onClick={() => chooseMode(value)}
            className={
              mode === value
                ? "inline-flex min-h-11 items-center rounded-md bg-accent px-3 text-sm font-medium text-accent-foreground"
                : "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium text-muted hover:text-foreground"
            }
          >
            {label}
          </button>
        ))}
      </div>
      {mode === "access" ? (
        <p className="text-base leading-7 text-muted">
          Tell me what you’re evaluating and which examples would help. I’ll review your request and follow up with appropriate, sanitized materials where available. Please leave out confidential company or customer information.
        </p>
      ) : null}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Name</span>
          <input
            required
            name="name"
            autoComplete="name"
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Email (work preferred)</span>
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">
          Company or team{" "}
          <span className="font-normal text-muted">(optional)</span>
        </span>
        <input
          name="company"
          autoComplete="organization"
          className={fieldClass}
        />
      </label>
      {mode === "access" ? (
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Which work would help you evaluate fit?</span>
          <select name="sampleFocus" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select a focus
            </option>
            {focusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      ) : null}
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">{mode === "access" ? "What are you evaluating?" : "Message"}</span>
        <textarea
          required
          minLength={8}
          name="message"
          placeholder={
            mode === "access"
              ? "For example: We’re hiring a sales leader and would like to understand your approach to coaching and onboarding. A sanitized example or walkthrough would help."
              : "What would you like to discuss?"
          }
          rows={5}
          className="rounded-md border border-border bg-background px-3 py-2 text-base text-foreground outline-none focus:border-accent"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : mode === "access" ? "Request work examples" : "Send message"}
      </button>
      {mode === "access" ? (
        <p className="text-xs leading-5 text-muted">
          I review each request before deciding what to share. Submitting this form does not unlock private files or guarantee that a particular sample is available.
        </p>
      ) : null}
      {message ? (
        <p
          className={`text-sm leading-6 ${status === "error" ? "font-medium text-foreground" : "text-muted"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
