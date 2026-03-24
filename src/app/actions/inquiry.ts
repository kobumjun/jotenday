"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function submitInquiry(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!name || !phone || !content) {
    redirect("/inquiry?error=empty");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("inquiries").insert({ name, phone, content });

  if (error) {
    redirect("/inquiry?error=save");
  }

  redirect("/inquiry?sent=1");
}
