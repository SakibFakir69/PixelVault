import AuthServices from "@/services/auth/auth.services";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const { data, error } = await AuthServices.signIn(email, password);

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}