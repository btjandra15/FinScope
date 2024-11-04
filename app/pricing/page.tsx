"use client"

import Header from '@/components/Header';
import React, { useEffect, useState } from 'react'
import bankImg from "@/public/images/bankBackground3.jpg";

const PricingPage = () => {
    const [bgImage, setBgImage] = useState('');

    useEffect(() => {
      const bgImage = bankImg.src;
  
      setBgImage(bgImage)
    })

    return (
        <div>
            <div className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat" style={{backgroundImage: `url(${bgImage})`}}>
                <Header/>
            </div>
        </div>
    )
}

export default PricingPage;
