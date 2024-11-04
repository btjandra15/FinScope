"use client"

import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import MobileNav from './MobileNav';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

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

const Header = () => {
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
        <header className=' text-white'>
            <div className="hidden lg:flex items-center gap-8">
                <Nav isLoggedIn={isLoggedIn}/>
            </div>

            <div className="xl:hidden">
                <MobileNav isLoggedIn={isLoggedIn}/>
            </div>
        </header>
    )
}

export default Header;
