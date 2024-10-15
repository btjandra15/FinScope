import { createPlaidClient } from '@/lib/plaidClient';
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';

const client = createPlaidClient();

export async function POST(req: NextRequest){
    try{
        const res = await client.linkTokenCreate({
            user: {client_user_id: 'user-id',},
            client_name: "FinScope",
            products: [Products.Auth, Products.Transactions],
            country_codes: [CountryCode.Us],
            language: 'en'
        });

        return NextResponse.json({link_token: res.data.link_token});
    }catch(error){
        console.log("Error creating Link Token: ", error);
        return NextResponse.error();
    }
}