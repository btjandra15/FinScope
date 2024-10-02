"use client"

import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react'

const Dashboard = () => {
    const cateogries = [
        { name: "Accounts", percantage: "14%" },
        { name: "Stocks", percantage: "14%" },
        { name: "Crypto", percantage: "14%" },
        { name: "Real Estate", percantage: "14%" },
        { name: "Cars", percantage: "14%" },
        { name: "Liabilites", percantage: "14%" },
        { name: "Other", percantage: "14%" },
    ]

    // Dummy data for Testing
    const transactions = [
        { amount: '+$500.00', account: 'Barclays 1948', date: '3 Jan 15:41' },
        { amount: '+$4300.00', account: 'Barclays 1948', date: '2 Jan 20:53' },
        { amount: '-$500.00', account: 'Santander 1511', date: '1 Jan 11:09' },
    ];

    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className='bg-main-background-color min-h-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} toggleSideBar={toggleSidebar}/>

            {/* Main Content */}
            <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <h1 className='text-5xl ml-10 p-6'>Dashboard</h1>

                {/* Net Worth & Categories */}
                <div className="grid grid-cols-3 gap-6 ml-10">
                    <div className="col-span-2 bg-dark p-6 rounded-lg">
                        <h2 className='text-xl'>Total Net Worth</h2>
                        <p className='text-4xl font-bold'>$728,510</p>
                        <p className='text-green-400'>+543.42 (0.18%)</p>

                        <div className="mt-4 h-32 bg-gray-700 rounded-lg"></div>
                    </div>

                    <div className="bg-dark-p-6 rounded-lg">
                        <h2 className='text-xl'>Cateogires</h2>

                        <ul className='mt-4 space-y-2'>
                            {cateogries.map((cateogry, index) => {
                                return(
                                    <li className='flex justify-between' key={index}>
                                        <span>{cateogry.name}</span>
                                        <span>{cateogry.percantage}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                {/* Assets & Transactions */}
                <div className="grid grid-cols-2 gap-6 mt-8 ml-10 bg-car p-6 rounded-lg">
                    {/* Assets Card */}
                    <div className="bg-dark p-6 rounded-lg border-2 border-gray-500">
                        <h2 className='text-xl'>Assets</h2>

                        <div className="mt-4 space-y-4">
                            <div className="flex justify-between">
                                <span>Barclays</span>
                                <span>$103,752</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Santander</span>
                                <span>$11,920</span>
                            </div>

                            <div className="flex justify-between">
                                <span>APPL</span>
                                <span>$5,019</span>
                            </div>

                            <div className="flex justify-between">
                                <span>MSFT</span>
                                <span>$18,519</span>
                            </div>
                        </div>
                    </div>

                    {/* Transactions Card */}
                    <div className="bg-dark p-6 rounded-lg border-2 border-gray-500">
                      Test
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
