import { readFile } from "node:fs/promises";
import path from "node:path";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX = {
  name: 80,
  email: 120,
  company: 120,
  note: 1000,
};

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.RESUME_INBOX;
  const from = process.env.RESEND_FROM ?? "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !inbox) {
    return Response.json(
      {
        error:
          "Resume requests are not configured yet. Email kristen.aing@gmail.com instead.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const company =
    typeof record.company === "string" ? record.company.trim() : "";
  const note = typeof record.note === "string" ? record.note.trim() : "";

  if (name.length < 2 || name.length > MAX.name) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isEmail(email) || email.length > MAX.email) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (company.length > MAX.company || note.length > MAX.note) {
    return Response.json({ error: "That message is too long." }, { status: 400 });
  }

  const resend = new Resend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeNote = escapeHtml(note || "No note").replaceAll("\n", "<br />");

  let attachments:
    | { filename: string; content: Buffer }[]
    | undefined;
  try {
    const pdf = await readFile(
      path.join(process.cwd(), "content/kristen-aing-resume.pdf"),
    );
    attachments = [{ filename: "Kristen Aing Resume.pdf", content: pdf }];
  } catch {
    attachments = undefined;
  }

  const { error } = await resend.emails.send({
    from,
    to: inbox,
    replyTo: email,
    subject: `Resume request from ${name}`,
    attachments,
    html: `
      <p>Someone requested your resume from the portfolio site.</p>
      <p><strong>Name:</strong> ${safeName}<br />
      <strong>Email:</strong> ${safeEmail}<br />
      <strong>Company / team:</strong> ${safeCompany}</p>
      <p><strong>Note:</strong><br />${safeNote}</p>
      <p>${attachments ? "The current resume PDF is attached. Reply to this email to send it." : "No PDF was found on the server. Attach the resume when you reply."}</p>
      <p>The requester also received a confirmation email (no PDF attached).</p>
    `,
  });

  if (error) {
    return Response.json(
      { error: "Could not send that request. Try email instead." },
      { status: 502 },
    );
  }

  await resend.emails.send({
    from,
    to: email,
    replyTo: inbox,
    subject: "I received your resume request",
    html: `
      <p>Hi ${safeName},</p>
      <p>Thanks for requesting my resume from the portfolio site. I got it, and I’ll email the PDF if it’s a good fit.</p>
      <p>If you want to add context in the meantime, just reply to this email.</p>
      <p>— Kristen Joy Aing</p>
    `,
  });

  return Response.json({ ok: true });
}
