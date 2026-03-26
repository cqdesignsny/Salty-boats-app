import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "Salty Boats <noreply@saltyboats.com>";
const ADMIN_EMAILS = [
  "saltyboatsfl@gmail.com",
  "donald@oldsaltmarine.com",
  "sales@saltyboats.com",
];

// ─── New Build Quote Notification ───────────────────────────────────────────

interface BuildQuoteEmailData {
  customerName: string;
  email: string;
  phone?: string;
  brand: string;
  model: string;
  hullColor: string;
  equipment: string;
  motor: string;
  trailer: string;
  deliveryType: string;
  estimatedTotal: string;
}

export async function sendBuildQuoteNotification(data: BuildQuoteEmailData) {
  const { customerName, email, phone, brand, model, hullColor, equipment, motor, trailer, deliveryType, estimatedTotal } = data;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAILS,
    subject: `🛥️ New Build Quote — ${brand} ${model} — ${estimatedTotal}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0f1b2d; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 20px;">New Build Quote Submitted</h1>
          <p style="margin: 4px 0 0; color: #4dd9e8; font-size: 14px;">${brand} ${model}</p>
        </div>
        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
          <h2 style="font-size: 16px; color: #0f1b2d; margin: 0 0 16px;">Customer Information</h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #64748b;">Name</td><td style="padding: 6px 0; font-weight: 600;">${customerName}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #4dd9e8;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 6px 0; color: #64748b;">Phone</td><td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #4dd9e8;">${phone}</a></td></tr>` : ""}
          </table>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />

          <h2 style="font-size: 16px; color: #0f1b2d; margin: 0 0 16px;">Build Details</h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #64748b;">Brand</td><td style="padding: 6px 0; font-weight: 600;">${brand}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Model</td><td style="padding: 6px 0; font-weight: 600;">${model}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Hull Color</td><td style="padding: 6px 0;">${hullColor}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Equipment</td><td style="padding: 6px 0;">${equipment || "None"}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Motor</td><td style="padding: 6px 0;">${motor || "None"}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Trailer</td><td style="padding: 6px 0;">${trailer || "None"}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Delivery</td><td style="padding: 6px 0;">${deliveryType}</td></tr>
          </table>

          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; margin-top: 16px; text-align: center;">
            <p style="margin: 0; color: #64748b; font-size: 13px;">Estimated Total</p>
            <p style="margin: 4px 0 0; font-size: 28px; font-weight: 700; color: #0f1b2d;">${estimatedTotal}</p>
            <p style="margin: 4px 0 0; color: #64748b; font-size: 12px;">$500 deposit pending</p>
          </div>

          <p style="margin: 20px 0 0; font-size: 12px; color: #94a3b8; text-align: center;">
            This notification was sent from saltyboats.com. Check Notion for the full record.
          </p>
        </div>
      </div>
    `,
  });
}

// ─── New Contact Lead Notification ──────────────────────────────────────────

interface ContactLeadEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function sendContactLeadNotification(data: ContactLeadEmailData) {
  const { name, email, phone, message } = data;

  return resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAILS,
    subject: `📩 New Contact Lead — ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #0f1b2d; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 20px;">New Contact Form Submission</h1>
          <p style="margin: 4px 0 0; color: #4dd9e8; font-size: 14px;">From: ${name}</p>
        </div>
        <div style="border: 1px solid #e2e8f0; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #64748b; width: 80px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 6px 0; color: #64748b;">Email</td><td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #4dd9e8;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 6px 0; color: #64748b;">Phone</td><td style="padding: 6px 0;"><a href="tel:${phone}" style="color: #4dd9e8;">${phone}</a></td></tr>` : ""}
          </table>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />

          <h2 style="font-size: 16px; color: #0f1b2d; margin: 0 0 8px;">Message</h2>
          <div style="background: #f8fafc; border-radius: 8px; padding: 16px; font-size: 14px; color: #334155; line-height: 1.6;">
            ${message.replace(/\n/g, "<br>")}
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}?subject=Re: Your inquiry to Salty Boats" style="display: inline-block; background: #4dd9e8; color: #0f1b2d; font-weight: 600; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-size: 14px;">
              Reply to ${name}
            </a>
          </div>

          <p style="margin: 20px 0 0; font-size: 12px; color: #94a3b8; text-align: center;">
            This notification was sent from saltyboats.com. Check Notion for the full record.
          </p>
        </div>
      </div>
    `,
  });
}
