import { FALLBACK_SITE_SETTINGS } from "@/lib/cache";
import type { EmailPayload } from "@/lib/email/templates";
import { getSiteUrl } from "@/lib/payments/site-url";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/env";

type EmailjsCredentials = {
  serviceId: string;
  templateId: string;
  publicKey: string;
  privateKey: string | null;
  contactEmail: string | null;
  foundationName: string;
  foundationNameEn: string | null;
};

const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";
const SEND_GAP_MS = 1100;

function envCredentials(): EmailjsCredentials | null {
  const serviceId = process.env.EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.EMAILJS_PUBLIC_KEY?.trim();
  if (!serviceId || !templateId || !publicKey) {
    return null;
  }

  return {
    serviceId,
    templateId,
    publicKey,
    privateKey: process.env.EMAILJS_PRIVATE_KEY?.trim() || null,
    contactEmail:
      process.env.EMAILJS_CONTACT_EMAIL?.trim() ||
      FALLBACK_SITE_SETTINGS.contact_email,
    foundationName: FALLBACK_SITE_SETTINGS.foundation_name,
    foundationNameEn: FALLBACK_SITE_SETTINGS.foundation_name_en ?? null,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function toHtmlMessage(message: string) {
  return message
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loadEmailjsCredentials(): Promise<EmailjsCredentials | null> {
  const fallback = envCredentials();

  if (!isSupabaseConfigured() || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return fallback;
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select(
      "emailjs_service_id, emailjs_template_id, emailjs_public_key, emailjs_private_key, contact_email, foundation_name, foundation_name_en",
    )
    .eq("id", 1)
    .maybeSingle();

  if (
    error ||
    !data?.emailjs_service_id ||
    !data.emailjs_template_id ||
    !data.emailjs_public_key
  ) {
    return fallback
      ? {
          ...fallback,
          contactEmail: data?.contact_email || fallback.contactEmail,
          foundationName:
            data?.foundation_name || FALLBACK_SITE_SETTINGS.foundation_name,
          foundationNameEn:
            data?.foundation_name_en ||
            FALLBACK_SITE_SETTINGS.foundation_name_en ||
            null,
        }
      : null;
  }

  return {
    serviceId: data.emailjs_service_id,
    templateId: data.emailjs_template_id,
    publicKey: data.emailjs_public_key,
    privateKey: data.emailjs_private_key,
    contactEmail: data.contact_email,
    foundationName: data.foundation_name || FALLBACK_SITE_SETTINGS.foundation_name,
    foundationNameEn:
      data.foundation_name_en || FALLBACK_SITE_SETTINGS.foundation_name_en || null,
  };
}

export async function sendEmailjsMessage(
  payload: EmailPayload,
  credentials?: EmailjsCredentials | null,
): Promise<boolean> {
  const creds = credentials === undefined ? await loadEmailjsCredentials() : credentials;
  if (!creds || !payload.to_email) {
    return false;
  }

  const siteUrl = getSiteUrl();
  const body: Record<string, unknown> = {
    service_id: creds.serviceId,
    template_id: creds.templateId,
    user_id: creds.publicKey,
    template_params: {
      to_email: payload.to_email,
      to_name: payload.to_name,
      subject: payload.subject,
      title: payload.title,
      message: payload.message,
      html_message: toHtmlMessage(payload.message),
      reply_to: payload.reply_to || creds.contactEmail || payload.to_email,
      from_name: creds.foundationName,
      foundation_name: creds.foundationName,
      site_url: siteUrl,
      year: String(new Date().getFullYear()),
    },
  };

  if (creds.privateKey) {
    body.accessToken = creds.privateKey;
  }

  try {
    const response = await fetch(EMAILJS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: siteUrl,
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      console.error("EmailJS send failed", response.status, await response.text());
    }
    return response.ok;
  } catch (error) {
    console.error("EmailJS send error", error);
    return false;
  }
}

export async function notifyQuietly(
  payloads: Array<EmailPayload | null | undefined>,
) {
  try {
    const credentials = await loadEmailjsCredentials();
    if (!credentials) {
      return;
    }

    const messages = payloads.filter(
      (item): item is EmailPayload => Boolean(item?.to_email),
    );

    for (let index = 0; index < messages.length; index += 1) {
      await sendEmailjsMessage(messages[index], credentials);
      if (index < messages.length - 1) {
        await sleep(SEND_GAP_MS);
      }
    }
  } catch {
    return;
  }
}
