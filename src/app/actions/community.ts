"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createCommunityPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  if (!title || !content) {
    redirect("/community/new?error=empty");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/community/new");

  const { error } = await supabase.from("community_posts").insert({
    user_id: user.id,
    title,
    content,
  });

  if (error) {
    redirect("/community/new?error=save");
  }

  revalidatePath("/community");
  redirect("/community");
}

export async function deleteCommunityPost(postId: string, _formData: FormData) {
  void _formData;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase.from("community_posts").delete().eq("id", postId).eq("user_id", user.id);

  if (error) {
    redirect(`/community/${postId}?error=delete`);
  }

  revalidatePath("/community");
  redirect("/community");
}
