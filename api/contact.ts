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
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return res.status(502).json({ error: "Couldn't send your message. Please try again." });
  }
}
