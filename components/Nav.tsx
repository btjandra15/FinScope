"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface NavProps{
    isLoggedIn: boolean,
}

const Nav: React.FC<NavProps> = ({isLoggedIn}) => {
    return (
        <header className="flex justify-between items-center w-full max-w-7xl px-8 py-6 mx-auto text-black">
            <div className="flex justify-center items-center">
                <span className='text-3xl font-semibold p-2'>FinScope</span>
            </div>

            {/* Navigation */}
            <nav className="bg-transparent backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-md">
                <ul className="flex space-x-8 text-black font-medium">
                  <li className="p-2 rounded-lg hover:bg-gray-200 hover:text-black transition-colors">
                    <Link href="/home">Home</Link>
                  </li>

                  <li className="p-2 rounded-lg hover:bg-gray-200 hover:text-black transition-colors">
                    <Link href="/features">
                      <DropdownMenu>
                        <DropdownMenuTrigger>Features</DropdownMenuTrigger>

                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <Link href="/features/dashboard">
                              Dashboard
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link href="/features/reports">
                              Reports
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link href="/features/investments">
                              Investments
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link href="/features/plan">
                              Plan
                            </Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link href="/features/debt">
                              Debt Planner
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Link>
                  </li>

                  <li className="p-2 rounded-lg hover:bg-gray-200 hover:text-black transition-colors">
                    <Link href="/pricing">Pricing</Link>
                  </li>

                  <li className="p-2 rounded-lg hover:bg-gray-200 hover:text-black transition-colors">
                    <Link href="/about">About</Link>
                  </li>
                </ul>
            </nav>

            {/* Login & Signup */}
            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <HoverBorderGradient containerClassName='rounded-full' as="button" className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
                        <Link href="/dashboard">
                            Dashboard
                        </Link>
                    </HoverBorderGradient>
                ) : (
                    <HoverBorderGradient containerClassName='rounded-full' as="button" className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2">
                        <Link href="/login">
                            Login
                        </Link>
                    </HoverBorderGradient>
                )}
            </div>
        </header>
    )
}

export default Nav;
