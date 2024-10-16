"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import Logo from "../public/images/logo.png"
import Image from 'next/image';
import { MdDashboard, MdInsights } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';
import { PiGearSixFill } from 'react-icons/pi';
import { FaSignOutAlt } from 'react-icons/fa';
import { signout } from '@/lib/auth-actions';

interface SidebarProps{
    isOpen: boolean;
    setIsOpen: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({isOpen, setIsOpen}) => {
    const links = [
        {
            name: "Dashboard",
            icon: <MdDashboard/>,
            alt: "Dashboard Icon",
            route: "/dashboard",
        },
        {
            name: "Insights",
            icon: <MdInsights/>,
            alt: "Insights Icon",
            route: "/insights",
        },
        {
            name: "Reports",
            icon: <TbReportSearch/>,
            alt: "Reports Icon",
            route: "/reports",
        },
        {
            name: "Sign out",
            icon: <FaSignOutAlt/>,
            alt: "Signout Icon",
            route: "/logout",
            onClick: () => signout()
        },
        {
            name: "Settings",
            icon: <PiGearSixFill/>,
            alt: "Settings Icon",
            route: "/settings",
        },
    ]

    return (
        <div className='flex'>
            <div className={`bg-sidebar-color text-white fixed h-screen transition-all duration-300 z-10 ${isOpen ? 'w-64': 'w-0 overflow-hidden'}`}>
                <div className="m-5 flex items-center justify-center">
                    <Image src={Logo} alt='Logo' width={50} height={50}/>
                    <span className='ml-2'>Net Worth App</span>
                </div>

                <div className="flex flex-col items-center">
                    {links.map((link, index) => {
                        return(
                            <div className="mt-10 flex items-center" key={index}>
                                <Link href={link.route} className='text-white hover:text-gray-300 flex items-center' onClick={link.onClick}>
                                    {link.icon}
                                    <span className='ml-2'>{link.name}</span>
                                </Link>
                            </div> 
                        )
                    })}
                </div>
            </div>

            <div className={`flex-1 p-4 ${isOpen ? 'ml-64' : 'ml-0'}`}>
                <div className="ml-auto">
                    <button className='bg-sidebar-color hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        ) : (
                            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
