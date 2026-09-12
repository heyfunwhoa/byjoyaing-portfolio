"use client";

import { useRef, useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const startedAt = useRef(Date.now());

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
          message: data.get("message"),
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
        "Message sent. You should get a confirmation email. I’ll reply if I can help.",
      );
    } catch {
      setStatus("error");
      setMessage("Could not send that message. Email kristen.aing@gmail.com instead.");
    }
  }

  return (
    <form
      id="write"
      onSubmit={onSubmit}
      className="relative mt-8 flex max-w-xl flex-col gap-4 rounded-lg border border-border bg-card p-6"
    >
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Send a message
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          This form emails me your note and sends you a confirmation. Reply to
          that email if you want to add more.
        </p>
      </div>
      <div className="absolute -left-[10000px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Name</span>
        <input
          required
          name="name"
          autoComplete="name"
          className="h-11 rounded-md border border-border bg-background px-3 text-foreground outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Work email</span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="h-11 rounded-md border border-border bg-background px-3 text-foreground outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">
          Company or team <span className="font-normal text-muted">(optional)</span>
        </span>
        <input
          name="company"
          autoComplete="organization"
          className="h-11 rounded-md border border-border bg-background px-3 text-foreground outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Message</span>
        <textarea
          required
          minLength={8}
          name="message"
          rows={5}
          className="rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-accent"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
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
