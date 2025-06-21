"use client";

import Image from "next/image";
import Link from "next/link";
import { FaInfoCircle, FaTwitter, FaUserAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export const Navbar = () => {
  return (
    <div className="w-full z-50 flex justify-center items-center py-4 bg-transparent">
      <div className="rounded-2xl flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
          >
            {/* <Link className="bg-white px-5 py-5" href="/" aria-label="Home">
              <Image
                src="/5e819a5ce865476b73087fd1276e7c3e.jpg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
            </Link> */}
          </motion.div>
        </div>

        {/* Middle: Nav Links */}
        <div className="flex gap-2 items-center text-sm font-medium text-[#5C3609] px-5 py-5">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
          >
            <Link
              href="/about"
              className="flex items-center gap-2  px-5 py-5 bg-[#FCF7B3] rounded-l-full transition-transform duration-300"
            >
              <FaInfoCircle /> <span className="font-plain">About</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
          >
            <Link
              href="/social-media"
              className="flex items-center gap-2  px-5 py-5 bg-[#FCF7B3] rounded-lg transition-transform duration-300 font-plain"
            >
              <FaTwitter /> <span className="font-plain">Social Media</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 17
            }}
          >
            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-5 bg-[#FCF7B3] rounded-r-full transition-transform duration-300 "
            >
              <FaUserAlt /> <span className="font-plain">Contract</span>
            </Link>
          </motion.div>
        </div>

        {/* Right: Contact Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
        >
          <Link href="/contact" aria-label="Contact Us">
            <div className="relative">
              <motion.svg
                className="transition-transform duration-300"
                width="120"
                height="120"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <g clipPath="url(#clip0_103_21)">
                  <motion.path
                    d="M71.5579 16.3347C84.3365 -5.4449 115.825 -5.44489 128.603 16.3347L129.067 17.1257C134.963 27.1733 145.709 33.378 157.358 33.4596L158.276 33.466C183.527 33.6428 199.271 60.9123 186.798 82.8687L186.345 83.6661C180.591 93.7953 180.591 106.205 186.345 116.334L186.798 117.131C199.271 139.088 183.527 166.357 158.276 166.534L157.358 166.54C145.709 166.622 134.963 172.827 129.067 182.874L128.603 183.665C115.825 205.445 84.3365 205.445 71.5579 183.665L71.0938 182.874C65.1986 172.827 54.4517 166.622 42.8027 166.54L41.8856 166.534C16.6346 166.357 0.890585 139.088 13.3629 117.131L13.8159 116.334C19.5698 106.205 19.5698 93.7953 13.8159 83.6661L13.3629 82.8687C0.890585 60.9123 16.6346 33.6428 41.8856 33.466L42.8027 33.4596C54.4518 33.378 65.1986 27.1733 71.0938 17.1257L71.5579 16.3347Z"
                    fill="#5C3609"
                    whileHover={{ fill: "#5C3609" }}
                    transition={{ duration: 0.2 }}
                  />
                </g>
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span style={{ fontFamily: "RacingSansOne" }} className="text-[#FCF7B3] text-3xl font-bold ">Login</span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
