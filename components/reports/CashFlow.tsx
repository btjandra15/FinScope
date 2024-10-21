"use client"

import React, { useState } from 'react'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts';

const CashFlowPage = () => {
    const cashFlowData = [
        { month: "January", cashflow: 186 },
        { month: "February", cashflow: 205 },
        { month: "March", cashflow: -207 },
        { month: "April", cashflow: 173 },
        { month: "May", cashflow: -209 },
        { month: "June", cashflow: 214 },
        { month: "July", cashflow: 214 },
        { month: "August", cashflow: 600 },
        { month: "September", cashflow: 500 },
        { month: "October", cashflow: 121 },
        { month: "November", cashflow: 433 },
        { month: "December", cashflow: -500 },
    ]

    const cashFlowConfig = {
        cashflow: {
            label: "Cash Flow"
        },
    };

    return (
        <div className='bg-main-background-color min-h-screen'>
            <div className="flex-1  text-white transition-all duration-300">
                <div className="space-y-6"> 
                    {/* Cash Flow Chart */}
                    <div className="bg-card-color p-6 rounded-lg shadow-lg">
                        <h3 className='text-3xl text-white mb-4 font-bold'>Cash Flow</h3>
                        <h2>Jan 1 2024 - Dec 31 2024</h2>
                        
                        <div className='w-full'>
                            <ChartContainer config={cashFlowConfig} className='max-h-[400px] w-full'>
                                <BarChart accessibilityLayer data={cashFlowData}>
                                    <CartesianGrid vertical={false}/>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel hideIndicator/>}/>

                                    <Bar dataKey="cashflow">
                                        <LabelList position="top" dataKey="month" fillOpacity={1}/>

                                        {cashFlowData.map((item) => (
                                            <Cell key={item.month} fill={item.cashflow > 0 ? "hsl(var(--chart-2))" : "hsl(var(--chart-1)"}/>
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
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
