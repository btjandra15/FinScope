"use client"

import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react'

const PlanPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='bg-main-background-color min-h-screen'>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default PlanPage;
