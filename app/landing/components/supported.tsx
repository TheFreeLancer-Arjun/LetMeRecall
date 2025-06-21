"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";

// 20 real big tech logos using public CDN URLs
const logos = [
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478e8100a63992bf6896c6_tinder.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478deaec0dd14f8e4ce56c_stability.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478ec3787cfd71c28f3f28_playground.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478eb3efafda963e0afbe3_adobe.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478f039dee5b3881b7d130_carta.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478f227306e5742c836f25_loom.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478f1645c27d47d425a989_color.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478e9cb431199ed24f59a3_mercury.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478e90b91e3c3350ad47e3_twitch.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478f0c37bc06ee99ee024e_rippling.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478e88787cfd71c28f0120_notion.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478dda126d0b8e9ab2a412_figma.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478da20fc5b74b8b246f25_shrug.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478dd1ddfa4181a447b899_zillow.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478dc83d3a534cfabb58cf_initialized.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478db2b91e3c3350ac70a7_andreessen.svg",
  "https://cdn.prod.website-files.com/66c8de55c88c8d9cb1c944cc/67478ea8e36a65f4492016b8_front.svg",
];

export default function Supported() {
  const marqueeRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const speeds = [60, 30, 15]; // duration (lower = faster): [0.5x, 1x, 2x]
    marqueeRefs.current.forEach((ref, idx) => {
      if (ref) {
        gsap.to(ref, {
          xPercent: -100,
          repeat: -1,
          duration: speeds[idx],
          ease: "linear",
        });
      }
    });
  }, []);

  return (
    <div>
      <section className="bg-[#360060] w-full p-8 ">
        <div className="w-full h-[8cm] flex justify-center items-center gap-4">
          {/* LEFT SIDE */}
          <div className="w-[30%] h-full bg-[#DEFF96] rounded-3xl flex justify-center items-center flex-col gap-2 overflow-hidden border-[3px]  border-[#360060] ">
            <div className="w-full h-[3cm] flex justify-start items-center p-4   ">
              <h1 className="w-[2cm] h-[2cm] rounded-4xl bg-[#3A0111]  flex justify-center items-center text-6xl border text-white">
                <FaArrowRight />
              </h1>
            </div>
            <div className="flex justify-start items-center flex-col  w-full p-2  ">
              <h1 className="text-6xl font-bold  text-[#3A0111] ">
                Supported by
              </h1>
              <h2 className="text-xl  font-medium p-1 mt-10   text-[#3A0111] ">
                Investors and founders we admire
              </h2>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="w-[70%] bg-[#360060] rounded-3xl h-full flex justify-center items-center flex-col gap-2 overflow-hidden border border-white">
            {[0, 1, 2].map((row, idx) => (
              <div
                key={idx}
                className="h-[5cm] flex items-center gap-10 whitespace-nowrap border-t border-white"
                style={{ overflow: "hidden", width: "100%" }}
              >
                <div
                  className="flex gap-10"
                  ref={(el) => {
                    if (el) marqueeRefs.current[idx] = el;
                  }}
                >
                  {logos.map((logo, i) => (
                    <Image
                      key={`${idx}-${i}`}
                      src={logo}
                      alt={`Logo ${i}`}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="pl-[12cm] pt-[2cm]">
          <div className="p-10">
            <button className="px-8 py-8 bg-[#DEFF96] rounded-4xl rotate-[-20deg] text-5xl font-extrabold text-[#3A0111] border-white border-[4px]">
              <FaArrowRight />
            </button>
            <h1 className="text-9xl w-[22cm] font-bold text-[#C583FF] font-headline ">
              <div>Ready to</div>

              <div>take control?</div>
            </h1>
            <h2 className="text-3xl font-light text-white w-[14cm] pt-[2cm]">
              Let Me Recall helps you and your team plan smarter, stay focused,
              and get more done—every day.
            </h2>
          </div>
        </div>
      </section>
    </div>
  );
}
