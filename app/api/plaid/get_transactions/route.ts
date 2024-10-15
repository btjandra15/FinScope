import { createPlaidClient } from "@/lib/plaidClient";
import { NextRequest, NextResponse } from "next/server";
import { TransactionsGetRequest } from "plaid";

interface Transaction{
    transaction_id: String;
    name: string;
    date: string;
    category: string[];
    amount: number;
}

interface TransactionsResponse{
    transactions: Transaction[];
}

export async function POST(req: NextRequest){
    const {accessToken} = await req.json();
    const client = createPlaidClient();

    const request: TransactionsGetRequest = {
        access_token: accessToken,
        start_date: "2020-01-01",
        end_date: "2024-12-31",
    };

    try{
        const res = await client.transactionsGet(request);
        let transactions = res.data.transactions;
        const totalTransactions = res.data.total_transactions;

        while(transactions.length < totalTransactions){
            const paginatedRequest: TransactionsGetRequest = {
                access_token: accessToken,
                start_date: "2020-01-01",
                end_date: "2024-12-31",
                options: {
                    offset: transactions.length
                },
            };

            const paginatedResponse = await client.transactionsGet(paginatedRequest);
            transactions = transactions.concat(paginatedResponse.data.transactions);
        }

        return transactions;
    }catch(error){
        console.log("Error getting transactions: ", error);
    }

}