"use client"

import Sidebar from '@/components/Sidebar';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, Pie, PieChart, PolarAngleAxis, RadarChart, Tooltip, XAxis, YAxis } from 'recharts';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import { createClient } from '@/utils/supabase/client';
import Accounts from '@/components/Accounts';
import LineChartTemplate from '@/components/charts/LineChartTemplate';
import BarChartTemplate from '@/components/charts/BarChartTemplate';

const Dashboard = () => {
    const [linkToken, setLinkToken] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();

    // Dummy
    const netWorthChartData = [
        { month: "January", net_worth: 1000, },
        { month: "February", net_worth: 1200 },
        { month: "March", net_worth: 5000 },
        { month: "April", net_worth: 7000 },
        { month: "May", net_worth: 10000 },
        { month: "June", net_worth: 15000},
        { month: "July", net_worth: 18000},
        { month: "August", net_worth: 20000},
        { month: "September", net_worth: 25000},
        { month: "October", net_worth: 40000},
        { month: "November", net_worth: 50000},
        { month: "December", net_worth: 60000 },
    ]

    const netWorthChartConfig = {
        net_worth: {
            label: "Net Worth",
            color: "#2563eb",
        },
    } satisfies ChartConfig

    const categoryChartConfig = {
        categories: {
            label: "Category",
            color: "#2563eb",
        },
        label: {
            color: "hsl(var(--background))",
        },
    } satisfies ChartConfig

    const categoriesData = [
        { category: "Accounts", percentage: 25},
        { category: "Stocks", percentage: 15},
        { category: "Crypto", percentage: 20},
        { category: "Real Estate", percentage: 10},
        { category: "Cars", percentage: 5},
        { category: "Liabilites", percentage: 15},
        { category: "Other", percentage: 10},
    ]

    const transactions = [
        { amount: 500.0, detail: 'Account Barclays 1948', date: '3 Jan', time: '15:41' },
        { amount: 4300.0, detail: 'Account Barclays 1948', date: '2 Jan', time: '20:53' },
        { amount: -500.0, detail: 'Account Santander 1511', date: '1 Jan', time: '11:09' },
        { amount: 435.41, detail: 'AAPL 2 shares', date: '30 Dec', time: '19:31' },
        { amount: 500.0, detail: 'Barclays 1948 to Santander 1511', date: '23 Dec', time: '16:41' },
        { amount: 500.0, detail: 'Account Barclays 1948', date: '13 Dec', time: '18:03' },
    ];

    const onSuccess = async(public_token: string) => {
        try{
            if(!user.id){
                console.log("User is not authenticated! Redirecting...");
                router.push('/login');
                return;
            }

            const res = await axios.post('/api/plaid/exchange_public_token', {
                public_token,
            });

            const accessToken = res.data.access_token;

            await axios.post('/api/plaid/add_accounts', {
                userID: user.id,
                access_token: accessToken,
            });
        }catch(error){
            console.log("Error exchanging public token or fetching accounts: ", error);
        };
    };

    const { open, ready } = usePlaidLink({
        token: linkToken!,
        onSuccess
    });

    useEffect(() => {
        const checkUserSession = async() => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if(!user){
                router.push('/login');
            }else{
                setLoading(false);
                setUser(user);
            }
        }

        const createLinkToken = async() => {
            try{
                const res = await axios.post('/api/plaid/create_link_token', {
                    client_user_id: process.env.PLAID_CLIENT_ID,
                });

                const linkToken = res.data.link_token;

                setLinkToken(linkToken);
            }catch(error){
                console.log("Error creating link token: ", error);
            };
        };

        // checkUserSession();
        // createLinkToken();
    }, []);

    // if(loading){
    //     return <div>Loading...</div>
    // }

    return (
        <div className='bg-main-background-color min-h-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

            {/* Main Content */}
            <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Header  */}
                <div className="flex items-center justify-between">
                    <h1 className='text-5xl ml-4 p-6'>Dashboard</h1>

                    {linkToken && (
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto cursor-pointer' onClick={() => open()} disabled={!ready}>
                            Connect
                        </button>
                    )}
                </div>

                {/* Net Worth & Categories */}
                <div className="grid grid-cols-3 gap-6 ml-10 bg-main-card-color">
                    {/* Main Content */}
                    <div className="col-span-2 bg-dark p-6 rounded-lg">
                        <h2 className='text-xl'>Total Net Worth</h2>
                        <p className='text-4xl font-bold'>$728,510</p>
                        <p className='text-green-400'>+543.42 (0.18%)</p>

                        <div className="mt-4 h-64 w-full rounded-lg">
                            <LineChartTemplate data={netWorthChartData} config={netWorthChartConfig} dataKey1="month" dataKey2="net_worth"/>
                        </div>
                    </div>

                    {/* Cateogries */}
                    <div className="bg-dark p-6 rounded-lg m-5">
                        <h2 className="text-xl">Categories Breakdown</h2>

                        <div className="mt-4 h-auto w-full rounded-lg">
                            <BarChartTemplate data={categoriesData} config={categoryChartConfig} dataKey1="category" dataKey2="percentage"/>
                        </div>
                    </div>
                </div>

                {/* Plan & Transactions */}
                <div className="grid grid-cols-2 gap-6 mt-8 ml-4 bg-car p-6 rounded-lg">
                    {/* Assets Card */}
                    <div className="bg-card-color-2 p-6 rounded-lg shadow-md w-full max-w-full border-2 border-gray-500">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-lg font-bold">Plan</h2>
                            <button className="text-gray-300 hover:text-gray-400 flex items-center" onClick={() => router.push('/plan')}>
                                View All

                                <span className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Plan Card */}
                        </div>
                    </div>

                    {/* Transactions Card */}
                    <div className="bg-card-color-2 p-6 rounded-lg shadow-md w-full max-w-full border-2 border-gray-500">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-lg font-bold">Transactions</h2>
                            <button className="text-gray-300 hover:text-gray-400 flex items-center" onClick={() => router.push('/transactions')}>
                                View All

                                <span className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Transaction Card */}
                            <div className="flex items-center justify-between bg-card-color-2 p-4 rounded-lg border-2 border-gray-500">
                                <div className="flex items-center">
                                    <div className="bg-green-500 p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-green-400 font-bold">+500.00</p>
                                        <p className="text-gray-400 text-sm">Account Barclays 1948</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 text-sm">3 Jan</p>
                                    <p className="text-gray-400 text-sm">15:41</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between bg-card-color-2 p-4 rounded-lg border-2 border-gray-500">
                                <div className="flex items-center">
                                    <div className="bg-red-500 p-2 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m7 7-7-7 7-7"/>
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-red-400 font-bold">-500.00</p>
                                        <p className="text-gray-400 text-sm">Account Santander 1511</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-400 text-sm">1 Jan</p>
                                    <p className="text-gray-400 text-sm">10:09</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;