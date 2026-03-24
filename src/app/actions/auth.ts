"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { normalizeUsername, usernameToAuthEmail } from "@/lib/auth-email";
import { createClient } from "@/lib/supabase/server";

export async function signInWithUsername(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!username || !password) {
    redirect("/login?error=empty");
  }

  const supabase = await createClient();
  const normalized = normalizeUsername(username);
  if (!normalized) redirect("/login?error=auth");

  const { error } = await supabase.auth.signInWithPassword({
    email: usernameToAuthEmail(normalized),
    password,
  });

  if (error) {
    redirect("/login?error=auth");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function signUpWithProfile(formData: FormData) {
  const usernameRaw = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const passwordConfirm = String(formData.get("password_confirm") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const gender = String(formData.get("gender") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const birthDate = String(formData.get("birth_date") ?? "");
  const agreement = formData.get("agreement") === "on";

  const normalized = normalizeUsername(usernameRaw);
  if (
    !normalized ||
    password.length < 6 ||
    password !== passwordConfirm ||
    !name ||
    !["male", "female", "other"].includes(gender) ||
    !phone ||
    !birthDate ||
    !agreement
  ) {
    redirect("/signup?error=invalid");
  }

  const supabase = await createClient();
  const { data: available, error: rpcError } = await supabase.rpc("is_username_available", {
    p_username: normalized,
  });

  if (rpcError || !available) {
    redirect("/signup?error=taken");
  }

  const { error } = await supabase.auth.signUp({
    email: usernameToAuthEmail(normalized),
    password,
    options: {
      data: {
        username: normalized,
        name,
        gender,
        phone,
        birth_date: birthDate,
        agreement_checked: true,
      },
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/", "layout");
  redirect("/login?registered=1");
}
