"use client"

import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React, { useState } from 'react'
import { FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa';
import { FaArrowDownLong } from "react-icons/fa6";
import { Bar, BarChart, XAxis } from 'recharts';

const AccountPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Monthly");

    const accountsChartData = [
        { month: "January", cash: 5000, creditCards: 5000, investments: 10000 },
        { month: "February", cash: 6000, creditCards: 3000, investments: 20000 },
        { month: "March", cash: 5000, creditCards: 3000, investments: 20000 },
        { month: "April", cash: 5000, creditCards: 3000, investments: 20000 },
        { month: "May", cash: 5000, creditCards: 3000, investments: 20000 },
        { month: "June", cash: 5000, creditCards: 2000, investments: 20000 },
        { month: "August", cash: 5000, creditCards: 3000, investments: 20000 },
        { month: "September", cash: 5000, creditCards: 100, investments: 20000 },
        { month: "October", cash: 5000, creditCards: 500, investments: 20000 },
        { month: "November", cash: 5000, creditCards: 1000, investments: 20000 },
        { month: "December", cash: 5000, creditCards: 80, investments: 20000 },
    ]

    const accountsChartConfig = {
        cash: {
            label: "Cash",
            color: "#7486e6"
        },
        creditCards: {
            label: "Credit Cards",
            color: "#58a8ea"
        },
        investments: {
            label: "Investments",
            color: "#f8d586"
        }
    } satisfies ChartConfig;
    
    return (
        <div className='bg-main-background-color min-h-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

            <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Header  */}
                <div className="flex items-center justify-between">
                    <h1 className='text-5xl ml-4 p-6'>Accounts</h1>

                    <div className="text-right text-2xl mt-5">
                        {/* Income Button */}
                        <Button className="mr-7 bg-black cursor-pointer hover:bg-gray-500">
                            Refresh All
                        </Button>

                        {/* Spending Button */}
                        <Button  className="mr-7 bg-black cursor-pointer hover:bg-gray-500">
                            Add Accounts
                        </Button>
                    </div>
                </div>

                <div className="ml-9 mr-5 bg-card-color">
                    <div className="flex justify-between items-center p-5 rounded-lg shadow-lg">
                        <h3 className='text-3xl text-white font-bold'>Net Worth</h3>

                        <div className=''>
                            {/* <Button className='mr-5 py-5 bg-black hover:bg-gray-500'>Net Worth Breakdown</Button> */}

                            <DropdownMenu>
                                <DropdownMenuTrigger className='bg-black text-white px-5 py-2 rounded-lg hover:bg-gray-500 transition-colors'>{selectedItem}</DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem onClick={() => setSelectedItem("Monthly")}>
                                        Monthly
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={() => setSelectedItem("Quarterly")}>
                                        Quarterly
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={() => setSelectedItem("YTD")}>
                                        YTD
                                    </DropdownMenuItem>

                                    <DropdownMenuItem onClick={() => setSelectedItem("Yearly")}>
                                        Yearly
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="mt-4 rounded-lg">
                        <ChartContainer config={accountsChartConfig} className='h-[400px] w-full'>
                            <BarChart accessibilityLayer data={accountsChartData}>
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickFormatter={(value) => value.slice(0, 3)}/>
                                <ChartTooltip content={<ChartTooltipContent hideLabel/>}/>
                                <ChartLegend content={<ChartLegendContent/>}/>

                                <Bar dataKey="cash" stackId='a' fill='var(--color-cash)' radius={[0, 0, 0, 0]}/>
                                <Bar dataKey="creditCards" stackId='a' fill='var(--color-creditCards)' radius={[0, 0, 0, 0]}/>
                                <Bar dataKey="investments" stackId='a' fill='var(--color-investments)' radius={[4, 4, 0, 0]}/>
                            </BarChart>
                        </ChartContainer>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 ml-10 mt-5">
                    <div className="grid grid-rows-3 gap-6">
                        <div className="bg-card-color p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold">Cash</h3>
                            <p className="text-lg flex">
                                $5,000.00 <span className="text-sm text-green-500 flex items-center ml-2"><FaRegArrowAltCircleUp className='mr-1'/> $2,000 (0.4%)</span>
                            </p>
                        </div>

                        <div className="bg-card-color p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold">Credit</h3>
                            <p className="text-lg flex">
                                $50,00.00 <span className="text-sm text-red-500 flex items-center ml-2"><FaRegArrowAltCircleDown className='mr-1'/> $2,000 (0.4%)</span>
                            </p>
                        </div>

                        <div className="bg-card-color p-6 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold">Investments</h3>
                            <p className="text-lg flex">
                                $50,000.00 <span className="text-sm text-green-500 flex items-center ml-2"><FaRegArrowAltCircleUp className='mr-1'/> $20,000 (0.4%)</span>
                            </p>
                        </div>
                    </div>

                    <div className="bg-card-color p-6 rounded-lg shadow-lg row-span-3">
                        <h3 className="text-lg font-semibold">Summary</h3>
                        <p className="text-4xl font-bold">$100,000.00</p>
                        <span className="text-sm">$900 This month</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;
