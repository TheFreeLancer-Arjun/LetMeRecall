"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Logojayejaye() {
  const containerRef = useRef(null);

  const logos = [
    {
      name: "Google",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Microsoft",
      src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "Apple",
      src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Netflix",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      name: "Facebook",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    },
    {
      name: "Instagram",
      src: "https://upload.wikimedia.org/wikipedia/commons/9/96/Instagram.svg",
    },
    {
      name: "Tesla",
      src: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
    },
    {
      name: "Meta",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
    },
    {
      name: "Amazon",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Oracle",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
    },
    {
      name: "IBM",
      src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      name: "Spotify",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    },
    {
      name: "LinkedIn",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg",
    },
    {
      name: "Slack",
      src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    },
  ];

  const fullLogos = [...logos, logos[0]];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      gsap.to(container, {
        xPercent: -50,
        ease: "linear",
        repeat: -1,
        duration: 20,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative w-full bg-[#FFF7FF] overflow-hidden py-8">
      {/* Fade shadow left */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#FFF7FF] to-transparent z-10" />
      {/* Fade shadow right */}
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#FFF7FF] to-transparent z-10" />

      <div className="relative w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-28 w-max"
          style={{ width: "200%", display: "flex" }}
        >
          {[...fullLogos, ...fullLogos].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-12 w-auto bg-transparent"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
