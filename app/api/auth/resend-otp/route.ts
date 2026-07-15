import { createSupabaseServerClient } from "@/lib/supabase/supabase.server";
import authServices from "@/services/auth/auth.services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body: { email?: string; type?: "signup" | "email_change" };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { email, type = "signup" } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required." },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();
    const result = await authServices.resendOtp(supabase, email, type);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error) {
    console.error("POST /api/auth/resend-otp error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}