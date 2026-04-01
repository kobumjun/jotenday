"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertAdminSession } from "@/lib/admin-session";
import { createAdminClient } from "@/lib/supabase/admin";

export async function adminUpdateOrder(formData: FormData) {
  await assertAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const admin_memo = String(formData.get("admin_memo") ?? "").trim() || null;
  const contacted_at_raw = String(formData.get("contacted_at") ?? "").trim();

  if (!id || !status) {
    redirect("/admin/orders");
  }

  const contacted_at = contacted_at_raw ? new Date(contacted_at_raw).toISOString() : null;

  const admin = createAdminClient();
  await admin
    .from("match_orders")
    .update({
      status,
      admin_memo,
      contacted_at,
    })
    .eq("id", id);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
  redirect(`/admin/orders/${id}?saved=1`);
}

