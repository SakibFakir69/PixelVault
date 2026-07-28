import { createSupabaseServerClient } from "@/lib/supabase/supabase.server";
import authServices from "@/services/auth/auth.services";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = await createSupabaseServerClient();
    const result = await authServices.signOut(supabase);

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
    
  } catch (error) {
    console.error("POST /api/auth/sign-out error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}