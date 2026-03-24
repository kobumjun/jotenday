"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  assertAdminSession,
  clearAdminSessionCookie,
  createAdminSessionToken,
  setAdminSessionCookie,
} from "@/lib/admin-session";
import { getAdminPin } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";

const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export async function adminLogin(formData: FormData) {
  const pin = String(formData.get("pin") ?? "");
  const expected = getAdminPin();
  if (!expected || pin !== expected) {
    redirect("/admin?error=1");
  }
  await setAdminSessionCookie(createAdminSessionToken());
  redirect("/admin/reviews");
}

export async function adminLogout() {
  await clearAdminSessionCookie();
  redirect("/admin");
}

export async function adminUpsertReview(formData: FormData) {
  await assertAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const summary = String(formData.get("summary") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const author_name = String(formData.get("author_name") ?? "").trim();
  const is_published = formData.get("is_published") === "on";
  const existingImageUrl = String(formData.get("existing_image_url") ?? "").trim();
  const existingImagePath = String(formData.get("existing_image_path") ?? "").trim();

  if (!title || !content || !author_name) {
    redirect("/admin/reviews?error=invalid");
  }

  const admin = createAdminClient();
  const file = formData.get("image");
  let image_url: string | null = existingImageUrl || null;
  let image_path: string | null = existingImagePath || null;

  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_IMAGE_BYTES) {
      redirect("/admin/reviews?error=toobig");
    }
    if (!file.type.startsWith("image/")) {
      redirect("/admin/reviews?error=type");
    }
    const ext =
      file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const path = `public/${randomUUID()}.${ext}`;
    const buf = Buffer.from(await file.arrayBuffer());
    const { error: upErr } = await admin.storage.from("reviews").upload(path, buf, {
      contentType: file.type,
      upsert: false,
    });
    if (upErr) redirect("/admin/reviews?error=upload");

    if (existingImagePath) {
      await admin.storage.from("reviews").remove([existingImagePath]);
    }

    const {
      data: { publicUrl },
    } = admin.storage.from("reviews").getPublicUrl(path);
    image_url = publicUrl;
    image_path = path;
  }

  if (id) {
    const { error } = await admin
      .from("reviews")
      .update({
        title,
        summary: summary || null,
        content,
        author_name,
        image_url,
        image_path,
        is_published,
      })
      .eq("id", id);
    if (error) redirect(`/admin/reviews/${id}?error=save`);
    revalidatePath("/reviews");
    revalidatePath("/admin/reviews");
    redirect(`/admin/reviews/${id}?saved=1`);
  }

  const { data: inserted, error } = await admin
    .from("reviews")
    .insert({
      title,
      summary: summary || null,
      content,
      author_name,
      image_url,
      image_path,
      is_published,
    })
    .select("id")
    .single();

  if (error || !inserted) redirect("/admin/reviews?error=save");

  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  redirect(`/admin/reviews/${inserted.id}?saved=1`);
}

export async function adminDeleteReview(reviewId: string, _formData: FormData) {
  void _formData;
  await assertAdminSession();
  const admin = createAdminClient();
  const { data } = await admin.from("reviews").select("image_path").eq("id", reviewId).maybeSingle();
  if (data?.image_path) {
    await admin.storage.from("reviews").remove([data.image_path]);
  }
  await admin.from("reviews").delete().eq("id", reviewId);
  revalidatePath("/reviews");
  revalidatePath("/admin/reviews");
  redirect("/admin/reviews");
}

export async function adminDeleteInquiry(inquiryId: string, _formData: FormData) {
  void _formData;
  await assertAdminSession();
  const admin = createAdminClient();
  await admin.from("inquiries").delete().eq("id", inquiryId);
  revalidatePath("/admin/inquiries");
  redirect("/admin/inquiries");
}

export async function adminUpsertExternalLink(formData: FormData) {
  await assertAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const href = String(formData.get("href") ?? "").trim();
  const sort_order = Number(formData.get("sort_order") ?? "0") || 0;

  if (!title) redirect("/admin/links?error=invalid");

  const admin = createAdminClient();
  if (id) {
    await admin
      .from("external_links")
      .update({ title, description: description || null, href, sort_order })
      .eq("id", id);
  } else {
    await admin.from("external_links").insert({ title, description: description || null, href, sort_order });
  }
  revalidatePath("/spotlight");
  revalidatePath("/admin/links");
  redirect("/admin/links?saved=1");
}

export async function adminDeleteExternalLink(linkId: string, _formData: FormData) {
  void _formData;
  await assertAdminSession();
  const admin = createAdminClient();
  await admin.from("external_links").delete().eq("id", linkId);
  revalidatePath("/spotlight");
  revalidatePath("/admin/links");
  redirect("/admin/links");
}
