"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createMatchOrder(formData: FormData) {
  const product_code = String(formData.get("product_code") ?? "").trim();
  const product_name = String(formData.get("product_name") ?? "").trim();
  const applicant_name = String(formData.get("applicant_name") ?? "").trim();
  const ageRaw = String(formData.get("age") ?? "").trim();
  const gender = String(formData.get("gender") ?? "").trim() || null;
  const phone = String(formData.get("phone") ?? "").trim();
  const job = String(formData.get("job") ?? "").trim() || null;
  const region = String(formData.get("region") ?? "").trim() || null;
  const bio = String(formData.get("bio") ?? "").trim() || null;
  const preferred_style = String(formData.get("preferred_style") ?? "").trim() || null;
  const available_time = String(formData.get("available_time") ?? "").trim() || null;
  const note = String(formData.get("note") ?? "").trim() || null;
  const smoking = String(formData.get("smoking") ?? "").trim() || null;
  const drinking = String(formData.get("drinking") ?? "").trim() || null;
  const preferred_mood = String(formData.get("preferred_mood") ?? "").trim() || null;

  if (!product_code || !product_name || !applicant_name || !phone) {
    redirect(`/products/${encodeURIComponent(product_code)}/request?error=invalid`);
  }

  const age = ageRaw ? Number.parseInt(ageRaw, 10) || null : null;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase.from("match_orders").insert({
    user_id: user?.id ?? null,
    product_code,
    product_name,
    applicant_name,
    age,
    gender,
    phone,
    job,
    region,
    bio,
    preferred_style,
    available_time,
    note,
    smoking,
    drinking,
    preferred_mood,
  });

  if (error) {
    redirect(`/products/${encodeURIComponent(product_code)}/request?error=save`);
  }

  revalidatePath("/admin/orders");
  redirect("/products?requested=1");
}

