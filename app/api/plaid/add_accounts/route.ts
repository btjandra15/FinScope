import { createPlaidClient } from "@/lib/plaidClient";
import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
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

        const accountsToInsert = accounts.map((account) => ({
            account_id: account.account_id,
            user_id: userID,
            name: account.name,
            type: account.type,
            balance: account.balances.current || 0,
            currency: account.balances.iso_currency_code || "USD",
            created_at: new Date().toISOString(),
        }));

        const {error} = await supabase.from("accounts").insert(accountsToInsert);

        if (error) {
            console.error("Error inserting accounts into Supabase:", error);
            
            return NextResponse.json(
              { error: "Error inserting accounts into database" },
              { status: 500 }
            );
        }

        return NextResponse.json({message: "Account added to database successfully"});
    }catch(error){
        console.error("Error fetching accounts: ", error);
        return NextResponse.json({ error: "Unable to fetch accounts" }, { status: 500 });
    }
}