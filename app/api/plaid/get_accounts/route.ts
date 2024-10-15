import { createPlaidClient } from "@/lib/plaidClient";
import { NextRequest, NextResponse } from "next/server";

export async function handler(req, res){
    const client = createPlaidClient();

    try{
        const { access_token } = req.body;

        const accountResponse = await client.accountsGet({access_token});

        res.status(200).json(accountResponse.data.accounts);
    }catch(error){
        console.log("Error fetching accounts: ", error);
        res.status(500).json({error: "Unable to fetch accounts"});
    }
}