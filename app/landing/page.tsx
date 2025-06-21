// app/landing/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/app/landing/components/Navbar";
import Footer from "@/app/landing/components/Footer";
import RunwayScroll from "@/app/landing/components/runfan";
import FounderSection from "@/app/landing/components/founder";
import { HeroSection } from "@/app/landing/components/herosection";
import AwwwardsLoader from "@/src/components/ui/LandingLoader";
import Image from "next/image";
import RacingLinesLayout from "./components/RacingLinesLayout";

import Task from "./components/today";
import Dashboard from "./components/section";
import Logojayejaye from "./components/logojayejaye";
import BlueSection from "./components/blue-section";
import { FaCalendarAlt } from "react-icons/fa";
import Runway from "@/app/landing/components/runfan";
import RunwayScrollS from "./components/chief-section";
import Customer from "./components/customer";
import Supported from "./components/supported";
import ToDoApp from "./components/getintouch";

export default function Home() {
  const currentDate = new Date().toISOString().split("T")[0]; // e.g., 2025-06-14

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return (
      <div className="h-screen bg-slate-500 flex items-center justify-center">
        <AwwwardsLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white ">
      <div className="">
        <div className="relative z-50">
          <Navbar />
        </div>

        <section className="mt-[0.5cm] ">
          <HeroSection />
        </section>

        <section className="mt-7 mb-7">
          <Logojayejaye />
        </section>

        <section className="w-full h-screen flex justify-center items-center   ">
          <Dashboard />
        </section>

        <section className="bg-[#FFF7FF] mt-10">
          <Runway />
        </section>

        <section>
          <BlueSection />
        </section>

        <section>
          <Customer />
        </section>

        <section>
          <Supported />
        </section>

        <section>
          <ToDoApp />
        </section>

        <section>
          <Footer />
        </section>
      </div>
    </div>
  );
}
