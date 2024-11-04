"use client"

import Header from "@/components/Header";
import { useEffect, useState } from "react";
import bankImg from "@/public/images/bankBackground3.jpg";
import { motion } from 'framer-motion';
import Testimonials from "@/components/Testimonials";
import { TypewriterEffect, TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Footer from "@/components/Footer";

const words = [
  {
    text: "What",
    className: "text-white"
  },
  {
    text: "is",
    className: "text-white"
  },
  {
    text: "FinScope?",
    className: "text-blue-500"
  },
]

const features = [
  {
    title: "Overiew",
    description:
      "An application that allows you to view all your finanaces in one place",
    link: "",
  },
  {
    title: "Dashboard",
    description:
      "A quick overview of your overall net worth & transactions",
    link: "",
  },
  {
    title: "Reports",
    description:
      "A way to get deeper insights into your spending habits, cashflow, income, etc",
    link: "",
  },
  {
    title: "Investments",
    description:
      "A place to see all your investments in one place and get insight into the performance of your portfolio",
    link: "",
  },
  {
    title: "Plan",
    description:
      "A place to come up with a plan to build net worth, save up for a goal, gain insight into future spending/income growth, etc",
    link: "",
  },
  {
    title: "Debt",
    description:
      "A place to manage your debt and come up with a plan to become debt free!",
    link: "",
  },
];

export default function Home() {
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const bgImage = bankImg.src;

    setBgImage(bgImage)
  })

  return (
    <div>
      <div className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat" style={{backgroundImage: `url(${bgImage})`}}>
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

      <AuroraBackground className="min-h-screen bg-black">
        <TypewriterEffect words={words}/>

        <div className="max-w-5xl mx-auto px-8">
          <HoverEffect items={features}/>
        </div>
      </AuroraBackground>

      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-4xl text-white ">What people are saying</h1>

        <Testimonials/>
      </div>

      <Footer/>
    </div>
  );
}
