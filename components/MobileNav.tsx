import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { CiMenuFries } from 'react-icons/ci'
import Link from 'next/link'

interface MobileNavProps{
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

const MobileNav: React.FC<MobileNavProps> = ({isLoggedIn}) => {
  return (
    <Sheet>
        <div className="relative flex items-center justify-between">
            <h1 className='text-4xl ml-8'>FinScope</h1>

            <SheetTrigger className="flex justify-center items-center mr-5">
                <CiMenuFries className="text-[32px] text-white" />
            </SheetTrigger>
        </div>

        <SheetContent className='flex flex-col bg-black'>
            <div className="mt-32 mb-20 text-center text-2xl">
                <Link href="/">
                    <h1 className='text-4xl font-semibold text-white'>FinScope</h1>
                </Link>
            </div>

            <div className='flex flex-col space-y-2 items-center'>
                {links.map((link, index) => {
                    return (
                        <Link href={link.path} key={index} className='block text-3xl text-white hover:underline p-5 rounded-md transition-all, duration-200'>
                            {link.name}
                        </Link> 
                    )
                })}

                {isLoggedIn ? (
                    <Link href="/dashboard" className='block text-3xl text-white hover:underline p-5 rounded-md transition-all, duration-200'>
                        Dashboard
                    </Link> 
                ) : (
                    <Link href="/login" className='block text-3xl text-white hover:underline p-5 rounded-md transition-all, duration-200'>
                        Login
                    </Link> 
                )}
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default MobileNav
