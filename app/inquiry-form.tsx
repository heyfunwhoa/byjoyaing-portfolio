"use client";

import { PUBLIC_CONTACT_EMAIL } from "@/lib/portfolio/public-contact";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "h-11 rounded-md border border-border bg-background px-3 text-base text-foreground outline-none focus:border-accent";

export function InquiryForm({
  selectedPlaybook,
}: { selectedPlaybook?: string } = {}) {
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
    const note = String(data.get("message") ?? "");

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: note,
          website: data.get("website"),
          startedAt: startedAt.current,
        }),
      });
      const payload = (await response.json()) as { error?: string;
        confirmationAccepted?: boolean;
      };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error ?? "Something went wrong.");
        return;
      }

      form.reset();
      setStatus("sent");
      setMessage("Message sent. I’ll reply if I can help.");
    } catch {
      setStatus("error");
      setMessage(
        `Could not send that message. Email ${PUBLIC_CONTACT_EMAIL} instead.`,
      );
    }
  }

  return (
    <form
      id="write"
      onSubmit={onSubmit}
      data-ph-no-autocapture=""
      className="relative scroll-mt-24 flex max-w-xl flex-col gap-4 lg:max-w-none"
    >
      <h2 id="access" className="scroll-mt-24 text-xl font-semibold">Send a message</h2>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Name</span>
          <input required name="name" autoComplete="name" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-medium text-foreground">Email</span>
          <input required name="email" type="email" autoComplete="email" className={fieldClass} />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Message</span>
        <textarea
          required
          minLength={8}
          name="message"
          key={selectedPlaybook ?? "general"}
          defaultValue={selectedPlaybook ? `I'd like to learn more about ${selectedPlaybook}. ` : ""}
          placeholder="What would you like to discuss?"
          rows={5}
          className="rounded-md border border-border bg-background px-3 py-2 text-base text-foreground outline-none focus:border-accent"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-medium text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
      <p className="text-xs leading-5 text-muted">
        Work-example requests are reviewed individually. Submitting this form does not unlock private files.
      </p>
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
