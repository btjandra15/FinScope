import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const config = new Configuration({
  basePath: PlaidEnvironments.sandbox, // or 'development' or 'production'
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID || '',
      'PLAID-SECRET': process.env.PLAID_SECRET || '',
    },
  },
});

const plaidClient = new PlaidApi(config);

export async function POST(req: Request) {
  try {
    const { public_token } = await req.json();
    
    const response = await plaidClient.itemPublicTokenExchange({ public_token });
    const accessToken = response.data.access_token;
    
    return NextResponse.json({ access_token: accessToken });
  } catch (error: any) {
    console.error('Error exchanging public token:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
