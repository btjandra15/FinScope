import { createClient } from "@/utils/supabase/client";  
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const userID = req.headers.get("user-id");

        if (!userID) {
            return NextResponse.json({ error: "Missing userID" }, { status: 400 });
        }

        const supabase = createClient();
        const { data, error } = await supabase.from('profiles').select('accounts').eq('id', userID);
        
        if (error) {
            return NextResponse.json({ error: "Failed to fetch accounts" }, { status: 500 });
        }

        return NextResponse.json({ accounts: data || [] });
    } catch (error) {
        console.error("Error fetching accounts:", error);
        return NextResponse.json({ error: "Unable to fetch accounts" }, { status: 500 });
    }
}
