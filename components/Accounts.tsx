"use client"

import React, { useEffect, useState } from 'react'

const Accounts = () => {
    // const [accounts, setAccounts] = useState<any[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
  
    // useEffect(() => {
    //   const fetchAccounts = async () => {
    //     try {
    //         const response = await fetch(`/api/plaid/get_accounts`, {
    //             method: "GET",
    //             headers: {
    //                 "user-id": user.id,  
    //             },
    //         });

    //         const result = await response.json();

    //         if (response.ok) {
    //             if (result.accounts && result.accounts.length > 0) {
    //                 setAccounts(result.accounts);
    //             } else {
    //                 setError("No accounts found or data is empty");
    //             }
    //         } else {
    //             setError(result.error || "Failed to fetch accounts");
    //         }
    //     } catch (err: any) {
    //       setError(err.message);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  
    //   fetchAccounts();
    // }, []);

    // useEffect(() => {
    //     if (!loading && accounts.length > 0) {
    //         console.log("Accounts Loaded:", accounts);
    //     }
    // }, [accounts, loading]); 

    return (
        <div className="">
            {/* {accounts.length > 0 ? (
                accounts.map((account, index) => (
                    <div className="mb-5" key={index}>
                        <div className="p-5 bg-main-card-color rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                            <h3 className="text-lg font-semibold text-white">{account.name}</h3>

                            <p className="text-md text-white mb-2">
                                {account.subtype} - <span className="font-mono text-gray-500">{account.mask}</span>
                            </p>

                            <p className="font-medium text-lg text-green-600">Balance: ${account.balances}</p>
                        </div>
                    </div>
                ))
            ): (
                <p>No accounts connected.</p>
            )} */}
        </div>
    )
}

export default Accounts
