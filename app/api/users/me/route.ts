
import AuthServices from "@/services/auth/auth.services";
import { NextResponse } from "next/server";


export async function GET() {
  const { data } = await AuthServices.getUser();

  return NextResponse.json(data.user);
}