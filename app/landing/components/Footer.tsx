"use client";

import { Fa500Px, FaArrowAltCircleRight, FaArrowDown } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <section className="w-full bg-[#360060] rounded-t-3xl flex flex-col justify-between items-center overflow-hidden">
        {/* Header */}
        <div className="w-full flex justify-center items-center">
          <h1
            style={{ fontFamily: "RacingSansOne" }}
            className="text-[100px] sm:text-[150px] md:text-[200px] text-white font-extrabold uppercase"
          >
            let me recall
          </h1>
        </div>

        {/* Main Footer */}
        <div className="w-full flex flex-col md:flex-row p-5 gap-5 justify-center items-start">
          {/* Left Section */}
          <div className="w-full md:w-[30%] h-[14cm] bg-[#DEFF96] rounded-3xl p-5 flex flex-col justify-around items-start text-[#3A0111] gap-4">

            <div className="text-8xl text-[#3A0111]">
              <FaArrowAltCircleRight/>
            </div>
            <h2 className="text-4xl font-bold leading-tight  pt-[1cm] uppercase font-headline">
              Business planning, for humans.
            </h2>

            <div className="text-sm space-y-2">
              <p className="text-2xl md:text-4xl font-medium font-headline uppercasenpm ">
                © let me recall {currentYear}
              </p>
              <div className="flex flex-wrap gap-3 font-light text-[#001B2E] text-xl md:text-2xl pt-[1cm]">
                <span className="hover:underline cursor-pointer">Terms</span>
                <span className="hover:underline cursor-pointer">Privacy</span>
                <span className="hover:underline cursor-pointer">Security</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[70%] h-[14cm] bg-[#C583FF] rounded-3xl text-white flex flex-col border-2  p-4">
            {[
              "Book a Demo",
              "Login",
              "About",
              "Careers",
              "Contact",
              "Twitter",
              "LinkedIn",
            ].map((item, idx) => (
              <div
                key={idx}
                className="hover:bg-[#360060] text-black hover:text-white cursor-pointer capitalize transition-all duration-200 text-2xl md:text-3xl border-t flex justify-start items-center py-4 px-6 rounded-2xl"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
