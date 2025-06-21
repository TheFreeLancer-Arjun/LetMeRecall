'use client'
import React, { useState, useEffect, useRef } from 'react'
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaStar } from 'react-icons/fa'
import gsap from 'gsap'
import Image from 'next/image'

const reviews = [
  {
    name: 'Brian L.',
    review:
      'It’s about more than just saving time. With Runway, spotting trends is easier—now we can more efficiently tell stakeholders what number',
  },
  {
    name: 'Sarah J.',
    review:
      'Runway has completely changed how we visualize our product pipeline. It’s sleek, fast, and insightful.',
  },
  {
    name: 'Emily R.',
    review:
      'Thanks to Runway, managing product releases is smoother and communication has improved across teams.',
  },
  {
    name: 'John D.',
    review:
      'This tool is a game changer! We’ve seen a huge increase in team productivity and visibility.',
  },
  {
    name: 'Sophia M.',
    review:
      'Absolutely love the UI and performance. Runway delivers what it promises.',
  },
]

export default function Customer() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const cardContainerRef = useRef<HTMLDivElement>(null)

  const handleLeft = () => {
    if (index > 0) {
      setDirection('left')
      setIndex((prev) => prev - 2)
    }
  }

  const handleRight = () => {
    if (index + 2 < reviews.length) {
      setDirection('right')
      setIndex((prev) => prev + 2)
    }
  }

  const visibleReviews = reviews.slice(index, index + 2)

  useEffect(() => {
    if (cardContainerRef.current) {
      gsap.fromTo(
        cardContainerRef.current.children,
        {
          x: direction === 'right' ? 300 : -300,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        }
      )
    }
  }, [index, direction])

  return (
    <div>
      <section className=" w-full h-screen flex justify-center items-center">
        <div className="p-9 w-[34cm] h-[13cm] bg-white rounded-4xl flex gap-2 border">
          {/* Left Side */}
          <div className="w-[70%] h-full">
            {/* Rating Box */}
            <div className="p-2">
              <div className="w-[9.5cm] bg-[#C583FF] flex justify-center items-center text-[#360060] rounded-full px-2 py-2 gap-5">
                <h1 className="px-8 py-8 bg-[#360060] rounded-full"></h1>
                <h1 className="text-3xl font-semibold p-2  text-white ">4.9 out of 5 stars</h1>
              </div>
            </div>

            {/* Heading & Nav */}
            <div className="p-2 flex justify-between items-center">
              <h1 className="text-5xl font-bold  text-[#360060]  pl-5">
                4.9 out of 5 stars What our customers are saying
              </h1>
              <div className="flex gap-5">
                <button
                  onClick={handleLeft}
                  className="px-5 py-5 bg-white rounded-3xl border"
                >
                  <FaArrowLeft/>
                </button>
                <button
                  onClick={handleRight}
                  className="px-5 py-5 bg-white rounded-3xl border"
                >
               <FaArrowRight/>
                </button>
              </div>
            </div>

            {/* Reviews with Animation */}
            <div
              ref={cardContainerRef}
              className="p-2 flex gap-3 pt-10 overflow-hidden"
            >
              {visibleReviews.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[10cm] h-[5cm] bg-white rounded-4xl p-4 flex flex-col justify-between review-card   border"
                >
                  <h1 className="flex text-yellow-500">
                    {[...Array(6)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </h1>
                  <h2 className="text-sm text-gray-700">{item.review}</h2>
                  <h1 className="text-2xl font-bold  text-[#360060] ">{item.name}</h1>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
         <div className="w-[30%]  h-full flex justify-center items-center">
  <Image
    src="https://cdn.prod.website-files.com/66ba51656bf1fb9fa04683d6/67ed7fb55527db22851ef9cc_g2-badges-spring-2025.svg"
    alt="G2 Badge"
    width={400} // adjust size as needed
    height={400}
    className="object-cover"
  />
</div>

        </div>
      </section>
    </div>
  )
}
