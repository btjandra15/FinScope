"use client"

import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react'
import { Calendar } from 'antd';

const RecurringPage = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className='bg-main-background-color min-h-screen'>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

        <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
            <div className="flex items-center justify-between">
                <h1 className='text-5xl ml-4 p-6'>Recurring</h1>

                <div className="text-right text-2xl">
                    <button >
                        Add
                    </button>
                </div>
            </div>

            <div className="">
                <Calendar className='bg-black'/>
            </div>
        </div>
      </div>
    )
}

export default RecurringPage;
