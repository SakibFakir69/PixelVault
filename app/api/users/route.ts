import { createSupabaseServerClient } from "@/lib/supabase/supabase.server";
import { userServices, type UpdateUserInput } from "@/services/users/users.services";
import { NextResponse, NextRequest } from "next/server";



// GET /api/user — fetch current authenticated
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

// PUT /api/user — update profile 
export async function PUT(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    let body: UpdateUserInput;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { email, fullName, avatar } = body;

    if (!email && !fullName && !avatar) {
      return NextResponse.json(
        { success: false, message: "No fields provided to update." },
        { status: 400 }
      );
    }

    const result = await userServices.updateUser(supabase, {
      email,
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

// PATCH /api/user — update password 
export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createSupabaseServerClient();

    let body: { password?: string };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body." },
        { status: 400 }
      );
    }

    const { password } = body;

    if (!password || password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const result = await userServices.updatePassword(supabase, password);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: result.message },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/user error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}