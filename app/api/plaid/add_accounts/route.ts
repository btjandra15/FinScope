import { createPlaidClient } from "@/lib/plaidClient";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res){
    const body = await req.json();
    const {userID, access_token} = body;

    if (!access_token || !userID) {
        return NextResponse.json(
            { error: 'Missing access_token or userID' },
            { status: 400 }
        );
    }

    const client = createPlaidClient();
    const supabase = createClient();

    try{
        const accountResponse = await client.accountsGet({access_token});
        const accounts = accountResponse.data.accounts;

        const { error } = await supabase.from('profiles').upsert({id: userID, accounts: accounts}).eq('id', userID);

        if (error) {
            console.error("Error updating accounts in Supabase:", error);
            return NextResponse.error();
        }

        return NextResponse.json({message: "Account added to database successfully"});
    }catch(error){
        console.error("Error fetching accounts: ", error);
        return NextResponse.json({ error: "Unable to fetch accounts" }, { status: 500 });
    }
}