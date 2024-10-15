"use client"

import Sidebar from '@/components/Sidebar';
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from 'recharts';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

const Dashboard = () => {
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

    const categories = [
        { name: "Accounts", percentage: 25, color: "#3d84f7" },
        { name: "Stocks", percentage: 15, color: "#3d84f7"},
        { name: "Crypto", percentage: 20, color: "#3d84f7" },
        { name: "Real Estate", percentage: 10, color: "#3d84f7" },
        { name: "Cars", percentage: 5, color: "#3d84f7"},
        { name: "Liabilites", percentage: 15, color: "#3d84f7" },
        { name: "Other", percentage: 10, color: "#3d84f7"},
    ]

    // All Dummy Data to make Frontend
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

    const banks = [
        { account: 'Bank of America', change: 500.0, cost: 1000.0, value: 1500.0, logo: "" },
        { account: 'Capital One', change: -300.0, cost: 800.0, value: 500.0, logo: ""},
        { account: 'America Express', change: 200.0, cost: 400.0, value: 600.0, logo: "" },
    ];

    const brokerages = [
        { account: 'Robinhood', change: 500.0, cost: 1000.0, value: 1500.0, logo: "" },
        { account: 'Fidelity', change: -300.0, cost: 800.0, value: 500.0, logo: ""},
        { account: 'Vanguard', change: 200.0, cost: 400.0, value: 600.0, logo: "" },
    ];

    const liabilities = [
        { account: 'Bank of America', change: 500.0, cost: 1000.0, value: 1500.0, logo: "" },
        { account: 'Capital One', change: -300.0, cost: 800.0, value: 500.0, logo: ""},
        { account: 'America Express', change: 200.0, cost: 400.0, value: 600.0, logo: "" },
    ];

    const transactions = [
        { amount: 500.0, detail: 'Account Barclays 1948', date: '3 Jan', time: '15:41' },
        { amount: 4300.0, detail: 'Account Barclays 1948', date: '2 Jan', time: '20:53' },
        { amount: -500.0, detail: 'Account Santander 1511', date: '1 Jan', time: '11:09' },
        { amount: 435.41, detail: 'AAPL 2 shares', date: '30 Dec', time: '19:31' },
        { amount: 500.0, detail: 'Barclays 1948 to Santander 1511', date: '23 Dec', time: '16:41' },
        { amount: 500.0, detail: 'Account Barclays 1948', date: '13 Dec', time: '18:03' },
    ];

    const [linkToken, setLinkToken] = useState<string | null>(null);
    const [accounts, setAccounts] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    const toggleSidebar = () => setIsOpen(!isOpen);

    const onSuccess = async(public_token: string) => {
        try{
            const res = await axios.post('/api/plaid/exchange_public_token', {
                public_token,
            });

            const accessToken = res.data.access_token;
            console.log("Access Token: ", accessToken);

            const accountsRes = await axios.post('/api/plaid/get_accounts', {
                access_token: accessToken,
            });

            setAccounts(accountsRes.data);
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

        checkUserSession();
        createLinkToken();
    }, [router]);

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <div className='bg-main-background-color min-h-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} toggleSideBar={toggleSidebar}/>

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
                            <h2 className='text-xl font-semibold'>Accounts</h2>
                            <button className='text-gray-400 hover:text-white transition-colors'>View All</button>
                        </div>

                        {accounts.length > 0 ? (
                            accounts.map((account) => (
                                <div className="" key={account.account_id}>
                                    <h3>{account.name}</h3>
                                    <p>{account.subtype} - {account.mask}</p>
                                    <p>Balance: ${account.balances.current}</p>
                                </div>
                            ))
                        ): (
                            <p>No accounts connected</p>
                        )}

                        {/* <div className="grid grid-cols-3 gap-3 text-gray-400 font-semibold mb-4">
                            <div className="">Banks</div>
                            <div className="">Change</div>
                            <div className="">Value</div>
                        </div>

                        <ul className='space-y-5'>
                            {banks.map((bank, index) => {
                                return(
                                    <li key={index} className='grid grid-cols-3 gap-3 text-gray-300'>
                                        <div className="">{bank.account}</div>

                                        <div className={`font-medium ${bank.change > 0 ? 'text-green-400' : "text-red-400"}`}>
                                            {bank.change > 0 ? `+$${bank.change}` : `$${bank.change}`}
                                        </div>

                                        <div className="">{`$${bank.value}`}</div>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className="grid grid-cols-3 gap-3 text-gray-400 font-semibold mb-4 mt-5">
                            <div className="">Brokerages</div>
                            <div className="">Change</div>
                            <div className="">Value</div>
                        </div>

                         <ul className='space-y-5'>
                            {brokerages.map((brokerage, index) => {
                                return(
                                    <li key={index} className='grid grid-cols-3 gap-3 text-gray-300'>
                                        <div className="">{brokerage.account}</div>

                                        <div className={`font-medium ${brokerage.change > 0 ? 'text-green-400' : "text-red-400"}`}>
                                            {brokerage.change > 0 ? `+$${brokerage.change}` : `$${brokerage.change}`}
                                        </div>

                                        <div className="">{`$${brokerage.value}`}</div>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className="grid grid-cols-3 gap-3 text-gray-400 font-semibold mb-4 mt-5">
                            <div className="">Liabilities</div>
                            <div className="">Change</div>
                            <div className="">Value</div>
                        </div>

                        <ul className='space-y-5'>
                            {liabilities.map((liability, index) => {
                                return(
                                    <li key={index} className='grid grid-cols-3 gap-3 text-gray-300'>
                                        <div className="">{liability.account}</div>

                                        <div className={`font-medium ${liability.change > 0 ? 'text-green-400' : "text-red-400"}`}>
                                            {liability.change > 0 ? `+$${liability.change}` : `$${liability.change}`}
                                        </div>

                                        <div className="">{`$${liability.value}`}</div>
                                    </li>
                                )
                            })}
                        </ul> */}
                    </div>

                    {/* Transactions Card */}
                    <div className="bg-card-color-2 p-6 rounded-lg shadow-md w-full max-w-full border-2 border-gray-500">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-white text-lg font-bold">Transactions</h2>
                            <button className="text-gray-300 hover:text-gray-400 flex items-center">
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
