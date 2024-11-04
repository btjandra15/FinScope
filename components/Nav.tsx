"use client"

import React from 'react';
import Link from 'next/link';

interface NavProps{
    isLoggedIn: boolean,
}

const links = [
    {
        name: "Home",
        path: "/"
    },
    {
        name: "Features",
        path: "/features"
    },
    {
        name: "Pricing",
        path: "/pricing"
    },
    {
        name: "About",
        path: "/about"
    }
]

const Nav: React.FC<NavProps> = ({isLoggedIn}) => {
    return (
        <header className="flex justify-between items-center w-full max-w-7xl px-8 py-6 mx-auto text-black">
            <div className="flex justify-center items-center">
                <span className='text-3xl font-semibold p-2'>FinScope</span>
            </div>

            {/* Navigation */}
            <nav className="bg-transparent backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-md">
                <ul className="flex space-x-8 text-black font-medium">
                    {links.map((link, index) => {
                        return (
                            <li key={index} className="p-2 rounded-lg hover:bg-gray-200 hover:text-black transition-colors">
                                <Link href={link.path}>
                                {link.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

                {/* Login & Signup */}
            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <Link href="/login" className="bg-gray-200 dark:bg-black dark:text-white text-black font-bold py-2 px-4 rounded-lg hover:bg-indigo-200">
                        Dashboard
                    </Link>
                ) : (
                    <Link href="/login" className="bg-gray-200 dark:bg-black dark:text-white text-black font-bold py-2 px-4 rounded-lg hover:bg-indigo-200">
                        Login
                    </Link>
                )}
            </div>
        </header>
    )
}

export default Nav;
