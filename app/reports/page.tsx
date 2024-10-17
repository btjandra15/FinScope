"use client"

import CashFlowNav from '@/components/navbars/CashFlowNav';
import CashFlowPage from '@/components/reports/CashFlow';
import SankeyDiagram from '@/components/charts/SankeyDiagram';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react'

const ReportsPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('income');

    const toggleSidebar = () => setIsOpen(!isOpen);
    const handleTabClick = (tab: string) => setActiveTab(tab);

    return (
        <div className='bg-main-background-color min-h-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

            <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Header  */}
                <div className="flex items-center justify-between">
                    <h1 className='text-5xl ml-4 p-6'>Reports</h1>

                    <div className="text-right text-2xl">
                        {/* Income Button */}
                        <button 
                            className={`mr-7 bg-card-color cursor-pointer hover:bg-gray-500 ${activeTab === 'income' ? 'bg-card-color-2' : 'bg-card-color'}`} 
                            onClick={() => handleTabClick('income')}
                        >
                            Income
                        </button>

                        {/* Spending Button */}
                        <button 
                            className={`mr-7 bg-card-color cursor-pointer hover:bg-gray-500 ${activeTab === 'spending' ? 'bg-card-color-2' : 'bg-card-color'}`} 
                            onClick={() => handleTabClick('spending')}
                        >
                            Spending
                        </button>

                        {/* Cashflow Button */}
                        <button 
                            className={`mr-7 bg-card-color cursor-pointer hover:bg-gray-500 ${activeTab === 'cashFlow' ? 'bg-card-color-2' : 'bg-card-color'}`} 
                            onClick={() => handleTabClick('cashflow')}
                        >
                            Cash Flow
                        </button>

                        {/* Sankey Button */}
                        <button 
                            className={`mr-7 bg-card-color cursor-pointer hover:bg-gray-500 ${activeTab === 'sankey' ? 'bg-card-color-2' : 'bg-card-color'}`} 
                            onClick={() => handleTabClick('sankey')}
                        >
                            Sankey
                        </button>
                    </div>
                </div>

                <div className="ml-4 p-6">
                    {activeTab === "income" && <div>Income</div>}
                    {activeTab === "spending" && <div>Spending</div>}
                    {activeTab === "cashflow" && <CashFlowPage/>}
                    {activeTab === "sankey" && <div>Sankey</div>}
                </div>
            </div>
        </div>
    )
}

export default ReportsPage;
