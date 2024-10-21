import React from 'react'
import { ChartConfig, ChartContainer, ChartLegendContent, ChartTooltip } from '../ui/chart'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import RadarChartTemplate from '../charts/RadarChartTemplate';

const Spending = () => {
    const spendingData = [
        { category: "Home & Utilities", amount: 3000 },
        { category: "Transporation", amount: 400 },
        { category: "Groceries", amount: 400 },
        { category: "Restaurants/Dining", amount: 500 },
        { category: "Shopping/Entertainment", amount: 300 },
        { category: "Finance", amount: 2000 },
    ]

    const spendingConfig = {
        amount: {
            label: "Amount",
            color: "#7486e6"
        },
    } satisfies ChartConfig;

    return (
        <div className='bg-main-background-color min-h-screen'>
            <div className="flex-1  text-white transition-all duration-300">
                <div className="space-y-6"> 
                    {/* Spending Box */}
                    <div className="bg-card-color p-6 rounded-lg shadow-lg">
                        <h3 className='text-3xl text-white mb-4 font-bold'>Spending</h3>

                        <div className=''>
                            <RadarChartTemplate data={spendingData} config={spendingConfig} dataKey1='category' dataKey2='amount'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Spending;
