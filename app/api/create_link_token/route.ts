import { NextResponse } from "next/server";
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

const config = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '',
            'PLAID-SECRET': process.env.PLAID_SECRET || '',
        },
    },
});

const plaidClient = new PlaidApi(config);

export async function POST(){
    try{
        const res = await plaidClient.linkTokenCreate({
            user: { client_user_id: 'user-id' },
            client_name: 'Net worth App',
            products: ['auth', 'transactions'],
            country_codes: ['US'],
            language: 'en',
        });

        return NextResponse.json(res.data)
    }catch(error: any){
        console.error('Error creating link token: ', error);

        return NextResponse.json({ error: error.message }, {status: 500})
    }
}