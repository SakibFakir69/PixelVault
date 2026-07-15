import { createSupabaseServerClient } from "@/lib/supabase/supabase.server";
import { userServices } from "@/services/users/users.services";
import { NextResponse } from "next/server";

export async function GET() {
    
  const supabase = await createSupabaseServerClient();
  const result = await userServices.getUser(supabase);

  if (!result.success || !result.data) {
    return NextResponse.json(
      { success: false, message: result.message ?? "User not found" },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { success: true, data: result.data },
    { status: 200 }
  );
}