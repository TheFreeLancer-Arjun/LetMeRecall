"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CardData {
  name: string;
  title: string;
  quote: string;
  color: string;
}

const cardData: CardData[] = [
  {
    name: "Ajinkya",
    title: "Frontend Developer",
    quote: "Passionate about creating beautiful and interactive UIs.",
    color: "#FFB703",
  },
  {
    name: "Anjali",
    title: "Backend Developer",
    quote: "Loves solving problems with clean backend logic.",
    color: "#FB8500",
  },
  {
    name: "Sahil",
    title: "Full Stack Engineer",
    quote: "Can handle both frontend flair and backend brain.",
    color: "#219EBC",
  },
  {
    name: "Priya",
    title: "UI/UX Designer",
    quote: "Designs that speak user’s language.",
    color: "#8ECAE6",
  },
  {
    name: "Ravi",
    title: "DevOps Engineer",
    quote: "Makes sure everything runs smoothly everywhere.",
    color: "#023047",
  },
  {
    name: "Simran",
    title: "Data Scientist",
    quote: "Turns data into actionable insights.",
    color: "#FFB4A2",
  },
];

export default function RunwayScrollStacked(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".runway-card");

      gsap.set(cards, { opacity: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: true,
          start: "top top",
          end: () => `+=${cards.length * 100}%`,
          markers: false,
        },
      });

      cards.forEach((card, index) => {
        tl.to(card, { opacity: 1, y: 0, duration: 0.5 })
          .to(card, { opacity: 0, y: -50, duration: 0.5 }, "+=0.5");
      });
    }, containerRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100vh] bg-black flex justify-center items-center overflow-hidden"
    >
      {cardData.map(({ name, title, quote, color }, index) => (
        <div
          key={index}
          className="runway-card absolute w-[90%] md:w-[40%] p-10 rounded-3xl shadow-2xl text-center text-white"
          style={{
            backgroundColor: color,
          }}
        >
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${name}`}
            alt={name}
            className="w-20 h-20 rounded-full mx-auto mb-6 shadow-md bg-white"
          />
          <h2 className="text-3xl font-bold">{name}</h2>
          <h3 className="text-lg font-medium text-gray-200">{title}</h3>
          <p className="italic mt-4 text-white text-xl">{quote}</p>
        </div>
      ))}
    </div>
  );
}
