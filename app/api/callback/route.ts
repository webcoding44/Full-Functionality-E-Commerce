import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/Server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next");

  // Only allow relative paths inside this website.
  const safeNext =
    next &&
    next.startsWith("/") &&
    !next.startsWith("//") &&
    !next.includes("\\")
      ? next
      : "/";

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_callback_failed", url.origin)
    );
  }

  const supabase = await createClient();

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL("/login?error=oauth_callback_failed", url.origin)
    );
  }

  return NextResponse.redirect(
    new URL(safeNext, url.origin)
  );
}