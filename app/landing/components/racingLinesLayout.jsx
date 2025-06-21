"use client";

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RacingLinesLayout = () => {
  useEffect(() => {
    const loadDrawSVGPlugin = () => {
      const script = document.createElement("script");
      script.src = "https://assets.codepen.io/16327/DrawSVGPlugin3.min.js";
      script.onload = () => {
        gsap.registerPlugin(window.DrawSVGPlugin);
        animateSVG();
      };
      document.body.appendChild(script);
    };

    const animateSVG = () => {
      const path1 = document.querySelector("#path27");
      const path2 = document.querySelector("#path25");
      const path3 = document.querySelector("#path19");

      if (!path1 || !path2 || !path3) return;

      gsap.set([path1, path2, path3], { drawSVG: "0%" });

      ScrollTrigger.create({
        trigger: "#my-svg",
        start: "top 70%",
        end: "bottom 30%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const tl = gsap.timeline();

          if (p < 0.2) {
            tl.to(path3, { drawSVG: "0% 100%" });
          } else if (p >= 0.2 && p < 0.5) {
            tl.to(path3, { drawSVG: "100% 100%" }).to(path2, { drawSVG: "0% 100%" });
          } else if (p >= 0.5 && p < 0.8) {
            tl.to(path1, { drawSVG: "0% 100%" });
          } else if (p >= 0.8) {
            tl.to(path1, { drawSVG: "100% 100%" });
          }
        },
      });
    };

    loadDrawSVGPlugin();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden text-white">
      {/* SVG Animation Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <svg viewBox="0 0 210 297" id="my-svg" className="w-full h-full">
          <g>
            <path
              id="path27"
              d="M104.23512,181.74328 c0.81143,0.27048 6.82559,0.14906 8.01808,0..."
              style={{
                fill: "none",
                stroke: "#ffffff",
                strokeWidth: 3,
              }}
            />
            <path
              id="path25"
              d="M59.868373,175.32881 c3.466036,0.13801 6.673181,-1.63534..."
              style={{
                fill: "none",
                stroke: "#00FF00",
                strokeWidth: 3,
              }}
            />
            <path
              id="path19"
              d="M10.95805,86.862596 c1.770217,1.451443 3.711317,2.642238..."
              style={{
                fill: "none",
                stroke: "#ff00ff",
                strokeWidth: 3,
              }}
            />
          </g>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 py-32 text-center">
        <h1 className="text-5xl font-bold mb-6">Runway is a better way</h1>
        <p className="text-lg mb-8">Scroll to see SVG path animations in action.</p>
        <button className="bg-blue-600 px-6 py-3 rounded-full hover:bg-blue-700 transition">
          Book a demo
        </button>
      </div>

      {/* Dummy Content for Scroll */}
      <div className="h-[200vh] bg-gradient-to-b from-gray-900 via-gray-800 to-black"></div>
    </div>
  );
};

export default RacingLinesLayout;
