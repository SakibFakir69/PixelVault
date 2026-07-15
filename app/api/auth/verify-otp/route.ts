import { createSupabaseServerClient } from "@/lib/supabase/supabase.server";
import authServices from "@/services/auth/auth.services";
import { NextResponse, NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    let body: { email?: string; token?: string; type?: EmailOtpType };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { email, token, type = "email" } = body;

    if (!email || !token) {
      return NextResponse.json(
        { success: false, message: "Email and token are required." },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();
    const result = await authServices.verifyOtp(supabase, email, token, type);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("POST /api/auth/verify-otp error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}