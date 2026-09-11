"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ResumeRequestForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/request-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          note: data.get("note"),
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
        "Request sent. You should get a confirmation email. I’ll follow up with the resume if it’s a fit.",
      );
    } catch {
      setStatus("error");
      setMessage("Could not send that request. Email kristen.aing@gmail.com instead.");
    }
  }

  return (
    <form
      id="resume"
      onSubmit={onSubmit}
      className="mt-8 flex max-w-xl flex-col gap-4 rounded-lg border border-border bg-card p-6"
    >
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-foreground">
          Request resume
        </h3>
        <p className="mt-2 text-sm leading-6 text-muted">
          I don’t post a public PDF. This form emails me the request (with the
          resume attached for forwarding) and sends you a confirmation. I’ll
          reply with the file if it’s a good fit.
        </p>
      </div>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Name</span>
        <input
          required
          name="name"
          autoComplete="name"
          className="h-11 rounded-md border border-border bg-background px-3 text-foreground outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">Work email</span>
        <input
          required
          name="email"
          type="email"
          autoComplete="email"
          className="h-11 rounded-md border border-border bg-background px-3 text-foreground outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">
          Company or team <span className="font-normal text-muted">(optional)</span>
        </span>
        <input
          name="company"
          autoComplete="organization"
          className="h-11 rounded-md border border-border bg-background px-3 text-foreground outline-none focus:border-foreground"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm">
        <span className="font-medium text-foreground">
          What you’re hiring for{" "}
          <span className="font-normal text-muted">(optional)</span>
        </span>
        <textarea
          name="note"
          rows={4}
          className="rounded-md border border-border bg-background px-3 py-2 text-foreground outline-none focus:border-foreground"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {status === "sending" ? "Sending…" : "Request resume"}
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
