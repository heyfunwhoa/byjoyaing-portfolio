import {
  EMAIL_MAX,
  createResend,
  escapeHtml,
  getMailConfig,
  isEmail,
  missingMailConfigResponse,
  rejectIfBot,
  rejectIfRateLimited,
} from "@/lib/email";

export const runtime = "nodejs";

export async function POST(request: Request) {
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
  const blocked = rejectIfBot(request, record);
  if (blocked) return blocked;

  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const company =
    typeof record.company === "string" ? record.company.trim() : "";
  const message =
    typeof record.message === "string" ? record.message.trim() : "";

  if (name.length < 2 || name.length > EMAIL_MAX.name) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!isEmail(email) || email.length > EMAIL_MAX.email) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (company.length > EMAIL_MAX.company) {
    return Response.json({ error: "That company name is too long." }, { status: 400 });
  }
  if (message.length < 8 || message.length > EMAIL_MAX.message) {
    return Response.json(
      { error: "Please write a short message." },
      { status: 400 },
    );
  }

  const limited = rejectIfRateLimited(request, email);
  if (limited) return limited;

  const { apiKey, inbox, from } = getMailConfig();
  if (!apiKey || !inbox) {
    return missingMailConfigResponse();
  }

  const resend = createResend(apiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || "Not provided");
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const { error } = await resend.emails.send({
    from,
    to: inbox,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    html: `
      <p>Someone sent a message from the portfolio contact form.</p>
      <p><strong>Name:</strong> ${safeName}<br />
      <strong>Email:</strong> ${safeEmail}<br />
      <strong>Company / team:</strong> ${safeCompany}</p>
      <p><strong>Message:</strong><br />${safeMessage}</p>
    `,
  });

  if (error) {
    return Response.json(
      { error: "Could not send that message. Try email instead." },
      { status: 502 },
    );
  }

  await resend.emails.send({
    from,
    to: email,
    replyTo: inbox,
    subject: "I received your message",
    html: `
      <p>Hi ${safeName},</p>
      <p>Thanks for writing from the portfolio site. I got your note and will reply if I can help.</p>
      <p>If you want to add context in the meantime, just reply to this email.</p>
      <p>— Kristen Joy Aing</p>
    `,
  });

  return Response.json({ ok: true });
}
