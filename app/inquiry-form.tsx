"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type FormEvent,
} from "react";

type Status = "idle" | "sending" | "sent" | "error";
type Mode = "message" | "resume";

const fieldClass =
  "h-11 rounded-md border border-border bg-background px-3 text-base text-foreground outline-none focus:border-accent";

function subscribeToHash(onStoreChange: () => void) {
  window.addEventListener("hashchange", onStoreChange);
  return () => window.removeEventListener("hashchange", onStoreChange);
}

function modeFromHash(): Mode {
  return window.location.hash === "#resume" ? "resume" : "message";
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

    const isResume = mode === "resume";

    try {
      const response = await fetch(
        isResume ? "/api/request-resume" : "/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            isResume
              ? {
                  name: data.get("name"),
                  email: data.get("email"),
                  company: data.get("company"),
                  note: data.get("note"),
                  website: data.get("website"),
                  startedAt: startedAt.current,
                }
              : {
                  name: data.get("name"),
                  email: data.get("email"),
                  company: data.get("company"),
                  message: data.get("message"),
                  website: data.get("website"),
                  startedAt: startedAt.current,
                },
          ),
        },
      );
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error ?? "Something went wrong.");
        return;
      }

      form.reset();
      setStatus("sent");
      setMessage(
        isResume
          ? "Request sent. You should get a confirmation email. I’ll follow up with the resume if it’s a fit."
          : "Message sent. You should get a confirmation email. I’ll reply if I can help.",
      );
    } catch {
      setStatus("error");
      setMessage(
        isResume
          ? "Could not send that request. Email kristen.aing@gmail.com instead."
          : "Could not send that message. Email kristen.aing@gmail.com instead.",
      );
    }
  }

  return (
    <form
      id={mode === "resume" ? "resume" : "write"}
      onSubmit={onSubmit}
      className="relative flex max-w-xl flex-col gap-4 lg:max-w-none"
    >
      <div className="flex gap-1" role="tablist" aria-label="Contact type">
        {(
          [
            ["message", "Message"],
            ["resume", "Resume"],
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
                ? "rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-foreground"
                : "rounded-md px-3 py-1.5 text-sm font-medium text-muted hover:text-foreground"
            }
          >
            {label}
          </button>
        ))}
      </div>
      <p className="text-base leading-7 text-muted">
        {mode === "resume"
          ? "I don’t post a public PDF. This emails me the request and sends you a confirmation. I’ll reply with the file if it’s a good fit."
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
      {mode === "message" ? (
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Message</span>
          <textarea
            required
            minLength={8}
            name="message"
            rows={5}
            className="rounded-md border border-border bg-background px-3 py-2 text-base text-foreground outline-none focus:border-accent"
          />
        </label>
      ) : (
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">
            What you’re hiring for{" "}
            <span className="font-normal text-muted">(optional)</span>
          </span>
          <textarea
            name="note"
            rows={4}
            className="rounded-md border border-border bg-background px-3 py-2 text-base text-foreground outline-none focus:border-accent"
          />
        </label>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending"
          ? "Sending…"
          : mode === "resume"
            ? "Request resume"
            : "Send message"}
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
