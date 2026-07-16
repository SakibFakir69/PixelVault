import { createSupabaseServerClient } from "@/lib/supabase/supabase.server";
import authServices from "@/services/auth/auth.services";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let body: { email?: string; password?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const supabase = await createSupabaseServerClient();
    const result = await authServices.signUp(supabase, email, password);

    return NextResponse.json(result, { status: result.success ? 201 : 400 });
  } catch (error) {
    console.error("POST /api/auth/sign-up error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error", error:error.message },
      { status: 500 }
    );
  }
}