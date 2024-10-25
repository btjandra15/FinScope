"use client"

import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react'

const DebtPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className='bg-main-background-color min-h-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

            <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Header  */}
                <div className="flex items-center justify-between">
                    <h1 className='text-5xl ml-4 p-6'>Debt</h1>

                    <div className="text-right text-2xl">
                        
                    </div>
                </div>

                <div className="flex-1  text-white transition-all duration-300">
                    <div className="space-y-6"> 
                        {/* Spending Box */}
                        <div className="bg-card-color p-6 rounded-lg shadow-lg">
                            <h3 className='text-3xl text-white mb-4 font-bold'>Spending</h3>

                            <div className=''>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DebtPage;
