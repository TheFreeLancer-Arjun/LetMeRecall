"use client";

import {  useState, useEffect } from "react";


import { Navbar } from "@/app/landing/components/Navbar";
import Footer from "@/app/landing/components/Footer";
import RunwayScroll from "@/app/landing/components/runfan";
import FounderSection from "@/app/landing/components/founder";
import { HeroSection } from "@/app/landing/components/herosection";
import AwwwardsLoader from "@/components/ui/LandingLoader";
import Image from "next/image";
import Dashboard from "../dashboard/page";

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // if (showLoader) {
  //   return (
  //     // <div className="h-screen bg-slate-500 flex items-center justify-center">
  //     //   <AwwwardsLoader />
  //     // </div>
  //   );
  // }

  return (
    <div className="min-h-screen">
      <div className="border-white border-[20px]">
        <div className="relative z-50">
          <Navbar />
        </div>

        <section>
          <HeroSection />
        </section>

        <div className="p-10 rounded-4xl">
          <div className="flex justify-center items-center overflow-hidden bg-[#192227] rounded-4xl p-10">
            <Image
            width={100}
            height={100}
              className="h-[16cm] w-[35cm] border-[3px] border-white rounded-2xl"
              src="https://cdn.prod.website-files.com/66ba51656bf1fb9fa04683d6/675866b9eb3258ba1fc7bc8a_runway-screenshot.webp"
              alt="Runway Screenshot"
            />
          </div>
        </div>

        <section>
          <RunwayScroll />
        </section>

        <section className="p-10 rounded-2xl">
          <FounderSection />
        </section>

        <section>
          <Footer />
        </section>



      </div>

     

      <div>
        <video
          autoPlay
          loop
          muted
          className="h-[6cm] w-full object-cover"
          src="/aCJfjSdWJ-7kR-ES_footerV2.mp4"
        />
      </div>
    </div>
  );
}
