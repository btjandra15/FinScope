import { createPlaidClient } from "@/lib/plaidClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const {access_token} = await req.json();
    const client = createPlaidClient();

    try{
        const accountResponse = await client.accountsGet({access_token});

        return NextResponse.json(accountResponse.data.accounts);
    }catch(error){
        console.error("Error fetching accounts: ", error);
        return NextResponse.json({ error: "Unable to fetch accounts" }, { status: 500 });
    }
}