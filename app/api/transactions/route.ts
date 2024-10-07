import { NextResponse } from 'next/server';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { addDays, subDays } from 'date-fns';

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
    const { access_token } = await req.json();
    
    const startDate = subDays(new Date(), 30); // Fetch transactions from 30 days ago
    const endDate = new Date(); // Up to today

    const response = await plaidClient.transactionsGet({
      access_token,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      options: { count: 10, offset: 0 },
    });

    return NextResponse.json(response.data.transactions);
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}