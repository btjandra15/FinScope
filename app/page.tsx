"use client"

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import bankImg from "@/public/images/bankBackground3.jpg";
import { motion } from 'framer-motion';

export default function Home() {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const bgImage = bankImg.src;

    setBgImage(bgImage)
  })

  return (
    <div className="min-h-screen bg-cover bg-center bg-fixed " style={{backgroundImage: `url(${bgImage})`}}>
      <Header/>

      <div className="flex flex-col items-center justify-center h-[calc(70vh-70px)] px-6">
        <motion.h1 className="text-8xl font-bold text-blue-300" initial={{opacity: 0, y: -50}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>
          Welcome to FinScope
        </motion.h1>
          
        <motion.h2 className="text-5xl text-blue-300" initial={{opacity: 0, x: -50}} animate={{opacity: 1, x: 0}} transition={{duration: 1}}>
          Your space to view all your wealth 
        </motion.h2>
      </div>
    </div>
  );
}
