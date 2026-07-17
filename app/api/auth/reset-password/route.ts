import { createSupabaseServerClient } from "@/lib/supabase/supabase.server";
import authServices from "@/services/auth/auth.services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body: { email?: string };

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const redirectTo = `${req.nextUrl.origin}/auth/reset-password`;

    const supabase = await createSupabaseServerClient();
    const result = await authServices.sendResetPasswordEmail(supabase, email, redirectTo);

   
    return NextResponse.json(
      { success: true, message: "If that email exists, a reset link has been sent." },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /api/auth/reset-password error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}