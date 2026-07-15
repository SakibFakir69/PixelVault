import { createSupabaseServerClient } from "@/lib/supabase/supabase.server";
import { userServices, type UpdateUserInput } from "@/services/users/users.services";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    const body: UpdateUserInput = await req.json();

    const {  password, fullName, avatar } = body;

    if (!password && !fullName && !avatar) {
      return NextResponse.json(
        { success: false, message: "No fields provided to update." },
        { status: 400 }
      );
    }

    const result = await userServices.updateUser(supabase, {
    
      password,
      fullName,
      avatar,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: result.message, data: result.data },
      { status: 200 }
    );
  } catch (error) {
    console.error("PUT /api/user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}