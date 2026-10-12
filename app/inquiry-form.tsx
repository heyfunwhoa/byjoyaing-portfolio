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

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function modeFromHash(): Mode {
  return window.location.hash === "#access" ? "access" : "message";
}

export function InquiryForm() {
  const hashMode = useSyncExternalStore(
    subscribeToHash,
    modeFromHash,
    () => "message" as const,
  );
  const [chosen, setChosen] = useState<Mode | null>(null);
  const mode = chosen ?? hashMode;
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

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
          message: mode === "access" ? `Selected Work inquiry: ${String(data.get("message") ?? "")}` : data.get("message"),
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
          ? "Inquiry sent. This is not an access approval; I’ll follow up about any appropriate materials."
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
      <div className="flex gap-1" role="tablist" aria-label="Contact type">
        {(
          [
            ["message", "Message"],
            ["access", "Selected Work"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            role="tab"
            aria-selected={mode === value}
            onClick={() => {
              setChosen(value);
              setStatus("idle");
              setMessage("");
            }}
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
      <p className="text-base leading-7 text-muted">
        {mode === "access"
          ? "Ask about deeper, sanitized case-study materials. This sends an inquiry, not an access grant or login. Never include confidential company or customer details."
          : "This emails me your note and sends you a confirmation. Reply to that email if you want to add more."}
      </p>
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
          <span className="font-medium text-foreground">Work email</span>
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
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">{mode === "access" ? "What would you like to explore?" : "Message"}</span>
        <textarea
          required
          minLength={8}
          name="message"
          rows={5}
          className="rounded-md border border-border bg-background px-3 py-2 text-base text-foreground outline-none focus:border-accent"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : mode === "access" ? "Send access inquiry" : "Send message"}
      </button>
      {message ? (
        <p
          className={`text-sm leading-6 ${status === "error" ? "text-red-700" : "text-muted"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
