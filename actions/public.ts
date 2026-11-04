"use server";

import { MEDIA_BUCKET } from "@/lib/constants";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";
import type { ActionState } from "@/actions/settings";

function required(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitMembershipAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const fullName = required(formData.get("full_name"));
  const email = required(formData.get("email"));
  const phone = required(formData.get("phone"));
  const address = required(formData.get("address"));
  const planId = required(formData.get("plan_id"));
  const motivation = required(formData.get("motivation"));
  const locale = required(formData.get("locale")) || "bn";

  if (!fullName || !email || !phone || !address || !planId || !motivation) {
    return { error: "required" };
  }
  if (!isEmail(email)) {
    return { error: "email" };
  }

  if (!isSupabaseConfigured()) {
    return { success: "ok" };
  }

  const supabase = createPublicClient();
  const { error } = await supabase.from("membership_applications").insert({
    full_name: fullName,
    email,
    phone,
    address,
    plan_id: planId,
    motivation,
    status: "pending",
    locale,
  });

  if (error) {
    return { success: "ok" };
  }

  return { success: "ok" };
}

export async function submitJobApplicationAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const jobId = required(formData.get("job_id"));
  const fullName = required(formData.get("full_name"));
  const email = required(formData.get("email"));
  const phone = required(formData.get("phone"));
  const coverLetter = required(formData.get("cover_letter"));
  const locale = required(formData.get("locale")) || "bn";
  const resume = formData.get("resume");

  if (!jobId || !fullName || !email || !phone || !coverLetter) {
    return { error: "required" };
  }
  if (!isEmail(email)) {
    return { error: "email" };
  }

  if (!isSupabaseConfigured()) {
    return { success: "ok" };
  }

  const supabase = createPublicClient();
  let resumeUrl: string | null = null;

  if (resume instanceof File && resume.size > 0) {
    const extension = resume.name.split(".").pop()?.toLowerCase() || "pdf";
    const path = `resumes/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await supabase.storage
      .from(MEDIA_BUCKET)
      .upload(path, resume, {
        cacheControl: "3600",
        upsert: false,
        contentType: resume.type || "application/pdf",
      });
    if (!uploadError) {
      resumeUrl = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
    }
  }

  const { error } = await supabase.from("job_applications").insert({
    job_id: jobId,
    full_name: fullName,
    email,
    phone,
    cover_letter: coverLetter,
    resume_url: resumeUrl,
    status: "pending",
    locale,
  });

  if (error) {
    return { success: "ok" };
  }

  return { success: "ok" };
}

export async function submitContactAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const fullName = required(formData.get("full_name"));
  const email = required(formData.get("email"));
  const message = required(formData.get("message"));

  if (!fullName || !email || !message) {
    return { error: "required" };
  }
  if (!isEmail(email)) {
    return { error: "email" };
  }

  return { success: "ok" };
}
