"use client"

import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React, { useState } from 'react'

const AccountPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Monthly");
    
    return (
        <div className='bg-main-background-color min-h-screen'>
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

            <div className={`flex-1 p-8 text-white transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Header  */}
                <div className="flex items-center justify-between">
                    <h1 className='text-5xl ml-4 p-6'>Accounts</h1>

                    <div className="text-right text-2xl">
                        {/* Income Button */}
                        <button className="mr-7 bg-card-color cursor-pointer hover:bg-gray-500">
                            Refresh All
                        </button>

                        {/* Spending Button */}
                        <button  className="mr-7 bg-card-color cursor-pointer hover:bg-gray-500">
                            Add Accounts
                        </button>
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

                    <div className="ml-5">

                    </div>
                </div>

                <div className="">

                </div>
            </div>
        </div>
    )
}

export default AccountPage;
