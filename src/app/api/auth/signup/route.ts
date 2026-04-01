import { NextResponse } from "next/server";
import { createAuthClient } from "@/lib/supabase/auth";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email || "").trim();
  const password = String(body.password || "");
  const confirmPassword = String(body.confirmPassword || "");

  if (!email || !password || !confirmPassword) {
    return NextResponse.json({ error: "Email, password, and confirm password are required." }, { status: 400 });
  }

  if (password !== confirmPassword) {
    return NextResponse.json({ error: "Password and confirm password do not match." }, { status: 400 });
  }

  const supabase = createAuthClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    message: "Sign up successful. You can now sign in.",
    user: data.user,
  });
}
