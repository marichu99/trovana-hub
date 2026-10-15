import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  name?: string;
  email?: string;
  service?: string;
  details?: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body: Body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {};
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const service = (body.service ?? "Not sure yet").trim();
  const details = (body.details ?? "").trim();

  if (!name || !email || !details) {
    return res.status(400).json({ error: "Name, email and project details are required." });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "That email address doesn't look valid." });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("Missing SMTP configuration environment variables");
    return res.status(500).json({ error: "Email is not configured. Please try again later." });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Trovana Hub website" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: `"${name}" <${email}>`,
      subject: `New project inquiry — ${service}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\n${details}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Service:</strong> ${escapeHtml(service)}</p>
        <p><strong>Details:</strong></p>
        <p>${escapeHtml(details).replace(/\n/g, "<br />")}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return res.status(502).json({ error: "Couldn't send your message. Please try again." });
  }

  try {
    const firstName = name.split(" ")[0];
    await transporter.sendMail({
      from: `"Trovana Hub" <${SMTP_USER}>`,
      to: `"${name}" <${email}>`,
      subject: "We've got your message — Trovana Hub",
      text: `Hi ${firstName},\n\nThanks for reaching out to Trovana Hub about ${service}. We've received your message and someone from our team will be in touch within one business day.\n\nFor reference, here's what you sent us:\n\n${details}\n\nTalk soon,\nTrovana Hub\nWe build websites and demand.`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #1E1B19;">
          <p style="font-size: 20px; font-weight: 700; margin-bottom: 4px;">
            Trovana <span style="color:#FF6A2B;">Hub</span>
          </p>
          <p style="color: #8A8580; font-size: 13px; margin-top: 0;">We build websites and demand.</p>
          <p>Hi ${escapeHtml(firstName)},</p>
          <p>Thanks for reaching out about <strong>${escapeHtml(service)}</strong>. We've received your message and someone from our team will be in touch within one business day.</p>
          <p style="color: #8A8580; font-size: 13px;">For reference, here's what you sent us:</p>
          <blockquote style="border-left: 3px solid #FF6A2B; margin: 0; padding-left: 12px; color: #4A3326;">
            ${escapeHtml(details).replace(/\n/g, "<br />")}
          </blockquote>
          <p>Talk soon,<br />Trovana Hub</p>
        </div>
      `,
    });
  } catch (error) {
    // The studio was already notified above; a failed auto-reply shouldn't fail the whole request.
    console.error("Failed to send auto-reply email", error);
  }

  return res.status(200).json({ ok: true });
}
