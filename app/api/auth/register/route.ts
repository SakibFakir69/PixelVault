import { supabaseConfig } from "@/lib/supabase/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const { email, password } = req.json();

        if (!email || password) {
            return NextResponse.json({
                success: false,
                message: "Please provide all information"
            }, { status: 400 })
        }

        const { data, error } = await supabaseConfig.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            return NextResponse.json(
                { success: false, message: error.message },
                { status: 400 }
            );
        }

        return NextResponse.json({
            success: true,
            data,
        });

    } catch (error) {
        return NextResponse.json(
            {
                success:false,
                message:`${error.name}`
            },{status:500}
        )

    }

}

