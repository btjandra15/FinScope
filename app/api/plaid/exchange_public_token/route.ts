import { createPlaidClient } from "@/lib/plaidClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    const { public_token } = await req.json();
    const client = createPlaidClient();

    try{
        const res = await client.itemPublicTokenExchange({public_token});
        const { access_token } = res.data; 

        return NextResponse.json({access_token});
    }catch(error){
        console.log("Error exchanging public token: ", error);
        return NextResponse.error();
    }
}