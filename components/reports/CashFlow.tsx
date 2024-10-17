"use client"

import CashFlowNav from '@/components/navbars/CashFlowNav';
import SankeyDiagram from '@/components/charts/SankeyDiagram';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react'

const CashFlowPage = () => {
    return (
        <div className='bg-main-background-color min-h-screen'>
            <div className="flex-1  text-white transition-all duration-300">
                {/* Header  */}
                <div className="flex items-center justify-between">
                    <h2 className='text-2xl'>Cash Flow</h2>

                    <div className="text-right text-md">
                        <button className='mr-7 rounded-lg p-4 shadow-lg bg-card-color cursor-pointer'>Monthy</button>
                        <button className='mr-7 rounded-lg p-4 shadow-lg bg-card-color'>Quartely</button>
                        <button className='mr-7 rounded-lg p-4 shadow-lg bg-card-color'>Year</button>
                    </div>
                </div>

                <div className="">
               
                </div>

            </div>
        </div>
    )
}

export default CashFlowPage;
