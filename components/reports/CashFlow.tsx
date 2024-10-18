"use client"

import React, { useState } from 'react'

const CashFlowPage = () => {
    return (
        <div className='bg-main-background-color min-h-screen'>
            <div className="flex-1  text-white transition-all duration-300">
                <div className="space-y-6"> 
                    {/* Cash Flow Chart */}
                    <div className="bg-card-color p-6 rounded-lg shadow-lg">
                        <h3 className='text-3xl text-white mb-4 font-bold'>Cash Flow</h3>
                        <h2>Jan 1 2024 - Dec 31 2024</h2>
                        
                        <div className='h-64'>
                        </div>
                    </div>

                    {/* Total Income */}
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-card-color p-6 rounded-lg shadow-lg text-center">
                            <h3 className='text-lg text-white mb-4'>Total Income</h3>
                            <p className='text-4xl text-green-500'>$29,436.00</p>
                        </div>

                        <div className="bg-card-color p-6 rounded-lg shadow-lg text-center">
                            <h3 className='text-lg text-white mb-4'>Spending</h3>
                            <p className='text-4xl text-red-500'>-$29,436.00</p>
                        </div>
                    </div>

                    {/* Transactions */}
                    <div className="bg-card-color p-6 rounded-lg shadow-lg">
                        <h3 className='text-lg text-white mb-4'>Transactions</h3>
                        <div className=''>
                            {/* Transaction content */}
                            <p className='text-white'>April 11, 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CashFlowPage;
