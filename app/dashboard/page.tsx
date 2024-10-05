"use client"

import Sidebar from '@/components/Sidebar';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import React, { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';

const Dashboard = () => {
    const categories = [
        { name: "Accounts", percentage: 25, color: "#3d84f7" },
        { name: "Stocks", percentage: 15, color: "#3d84f7"},
        { name: "Crypto", percentage: 20, color: "#3d84f7" },
        { name: "Real Estate", percentage: 10, color: "#3d84f7" },
        { name: "Cars", percentage: 5, color: "#3d84f7"},
        { name: "Liabilites", percentage: 15, color: "#3d84f7" },
        { name: "Other", percentage: 10, color: "#3d84f7"},
    ]

    const chartData = [
        { month: "January", net_worth: 186, assets: 80 },
        { month: "February", net_worth: 305, assets: 200 },
        { month: "March", net_worth: 237, assets: 120 },
        { month: "April", net_worth: 73, assets: 190 },
        { month: "May", net_worth: 209, assets: 130 },
        { month: "June", net_worth: 214, assets: 140 },
        { month: "July", net_worth: 186, assets: 80 },
        { month: "August", net_worth: 305, assets: 200 },
        { month: "September", net_worth: 237, assets: 120 },
        { month: "October", net_worth: 73, assets: 190 },
        { month: "November", net_worth: 209, assets: 130 },
        { month: "December", net_worth: 214, assets: 140 },
    ]

    const assets = [
        { account: 'Barclays 1948', change: 500.0, cost: 1000.0, value: 1500.0 },
        { account: 'Santander 1511', change: -300.0, cost: 800.0, value: 500.0 },
        { account: 'AAPL 2 shares', change: 200.0, cost: 400.0, value: 600.0 },
      ];

    const transactions = [
        { amount: 500.0, detail: 'Account Barclays 1948', date: '3 Jan', time: '15:41' },
        { amount: 4300.0, detail: 'Account Barclays 1948', date: '2 Jan', time: '20:53' },
        { amount: -500.0, detail: 'Account Santander 1511', date: '1 Jan', time: '11:09' },
        { amount: 435.41, detail: 'AAPL 2 shares', date: '30 Dec', time: '19:31' },
        { amount: 500.0, detail: 'Barclays 1948 to Santander 1511', date: '23 Dec', time: '16:41' },
        { amount: 500.0, detail: 'Account Barclays 1948', date: '13 Dec', time: '18:03' },
    ];

    const chartConfig = {
        net_worth: {
            label: "Net Worth",
            color: "#2563eb",
        },
        assets: {
            label: "Assets",
            color: "#60a5fa",
        },
    } satisfies ChartConfig

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className='bg-main-background-color min-h-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} toggleSideBar={toggleSidebar}/>

            {/* Main Content */}
            <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <h1 className='text-5xl ml-4 p-6'>Dashboard</h1>

                {/* Net Worth & Categories */}
                <div className="grid grid-cols-3 gap-6 ml-10 bg-main-card-color">
                    <div className="col-span-2 bg-dark p-6 rounded-lg">
                        <h2 className='text-xl'>Total Net Worth</h2>
                        <p className='text-4xl font-bold'>$728,510</p>
                        <p className='text-green-400'>+543.42 (0.18%)</p>

                        {/* Graph */}
                        <div className="mt-4 h-64 w-full rounded-lg">
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false}/>
                                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)}/>
                                    <Tooltip content={<ChartTooltipContent/>}/>
                                    <ChartLegend content={<ChartLegendContent/>}/>
                                    <Bar dataKey="net_worth" fill='var(--color-net_worth)' radius={4}/>
                                    <Bar dataKey="assets" fill='var(--color-assets)' radius={4}/>
                                </BarChart>
                            </ChartContainer>
                        </div>
                    </div>

                    {/* Cateogries */}
                    <div className="bg-dark p-6 rounded-lg m-5">
                        <h2 className="text-xl">Categories</h2>

                        <ul className="mt-4 space-y-4">
                            {categories.map((category, index) => {
                                return (
                                    <li className="flex items-center justify-between space-x-2" key={index}>
                                        {/* Category Name and Percentage */}
                                        <div className="flex flex-col space-y-1 w-full">
                                            <div className="flex justify-between">
                                                <span className="text-sm">{category.name}</span>
                                                <span className="text-sm">{category.percentage}%</span>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                                <div
                                                    className="h-2.5 rounded-full"
                                                    style={{
                                                        width: `${category.percentage}%`,
                                                        backgroundColor: category.color,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Assets & Transactions */}
                <div className="grid grid-cols-2 gap-6 mt-8 ml-10 bg-car p-6 rounded-lg">
                    {/* Assets Card */}
                    <div className="bg-dark p-6 rounded-lg border-2 border-gray-500">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className='text-xl font-semibold'>Assets</h2>
                            <button className='text-gray-400 hover:text-white transition-colors'>View All</button>
                        </div>

                        <div className="grid grid-cols-4 gap-4 text-gray-400 font-semibold mb-4">
                            <div className="">Accounts</div>
                            <div className="">Change</div>
                            <div className="">Cost</div>
                            <div className="">Value</div>
                        </div>

                        <ul className='space-y-4'>
                            {assets.map((asset, index) => {
                                return(
                                    <li key={index} className='grid grid-cols-4 gap-4 text-gray-300'>
                                        <div className="">{asset.account}</div>

                                        <div className={`font-medium ${asset.change > 0 ? 'text-green-400' : "text-red-400"}`}>
                                            {asset.change > 0 ? `+${asset.change}` : asset.change}
                                        </div>

                                        <div className="">{`$${asset.cost}`}</div>
                                        <div className="">{`$${asset.value}`}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    {/* Transactions Card */}
                    <div className="bg-dark p-6 rounded-lg border-2 border-gray-500">
                        {/* Card Header */}
                        <div className="flex justify-between items-center mb-4">
                            <h2 className='text-xl font-semibold'>Transactions</h2>
                            <button className='text-gray-400 hover:text-white transition-colors'>View All</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
