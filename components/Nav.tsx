"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Logo from "../public/images/logo.png";
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUserSession = async() => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if(user){
                setIsLoggedIn(true);
            }
        }

        checkUserSession();
    }, [router]);

    return (
        <nav className='bg-black text-white p-4'>
            <div className="container mx-auto flex justify-center items-center">
                {/* Logo Section */}
                <div className="flex items-center mr-auto">
                    <Image src={Logo} alt='Logo' width={40} height={40}/>

                    <span className='ml-2 text-xl font-semibold'>FinScope</span>
                </div>

                {/* Navigation */}
                <div className="hidden md:flex space-x-8 pr-5">
                    <Link href="/features" className='hover:text-gray-400'>
                        Features
                    </Link>

                    <Link href="/pricing" className='hover:text-gray-400'>
                        Pricing
                    </Link>

                    <Link href="/about" className='hover:text-gray-400'>
                        About
                    </Link>
                </div>

                {/* Login & Signup */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <Link href="/dashboard" className='bg-gray-600 text-white py-2 px-4 rounded-lg hover:text-gray-400'>
                            Dashboard
                        </Link>
                    ) : (
                        <div className=''>
                            <Link href="/login" className='bg-gray-600 text-white py-2 px-4 rounded-lg hover:text-gray-400 mr-3'>
                                Login
                            </Link>

                            <Link href="/signup" className='bg-gray-600 text-white py-2 px-4 rounded-lg hover:text-gray-400'>
                                Signup
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Nav;
