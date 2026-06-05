import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, country, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required" }, { status: 400 });
    }

    // Save to /tmp as backup (works on Vercel serverless)
    try {
      const fs = await import("fs");
      const nodePath = await import("path");
      const logDir = nodePath.join("/tmp", "bejady-inquiries");
      fs.mkdirSync(logDir, { recursive: true });
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      fs.writeFileSync(
        nodePath.join(logDir, `${timestamp}-${name.replace(/\s+/g, "-")}.json`),
        JSON.stringify({ name, email, company, country, message, submittedAt: new Date().toISOString() }, null, 2)
      );
    } catch (e) {
      // File save is optional - don't block the response
      console.log("Inquiry save skipped (optional)", e);
    }

    // Try to send email if SMTP is configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const notifyEmail = process.env.NOTIFY_EMAIL || "info@bejady.com";

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: smtpUser, pass: smtpPass },
      });

      await transporter.sendMail({
        from: smtpUser,
        to: notifyEmail,
        replyTo: email,
        subject: `BEJADY Inquiry from ${name}${company ? ` (${company})` : ""}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Company: ${company || "N/A"}`,
          `Country: ${country || "N/A"}`,
          ``,
          `Message:`,
          message,
        ].join("\n"),
        html: `
          <h2>New BEJADY Inquiry</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #ddd">${email}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Company</td><td style="padding:8px;border:1px solid #ddd">${company || "N/A"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Country</td><td style="padding:8px;border:1px solid #ddd">${country || "N/A"}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${message}</td></tr>
          </table>
          <p style="color:#888;font-size:12px;margin-top:16px">Submitted at: ${new Date().toLocaleString()}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
