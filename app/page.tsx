"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import AuthInput from "@/components/ui/AuthInput";
import { Button } from "@/components/ui/Button";
import LandingCard1 from "@/components/ui/LandingCard1";
import { EnterDoor } from "@/icons/EnterDoor";
import { FileStack } from "@/icons/FileStack";
import { QuestionMark } from "@/icons/QuestionMark";
import { Save } from "@/icons/Save";
import { Search } from "@/icons/Search";
import Image from "next/image";
import { ThanksForVisit } from "@/components/ui/ThanksForVisit";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import Footer from "@/components/Footer";
import { LandingLoader } from "@/components/ui/LandingLoader";
import OauthProvider from "@/components/ui/OauthProviderBtn";

export default function Home() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        console.log(loading)
    }, [loading]);

    // Check session on component mount
    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user/session`, {
                    withCredentials: true
                });
                setIsLoggedIn(response.data.message.isAuthenticated);
            } catch (error) {
                console.error("Session check failed:", error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };

        // Start the 4 second timer
        const timer = setTimeout(() => {
            setShowLoader(false);
        }, 1000);

        checkSession();

        return () => clearTimeout(timer);
    }, []);

    // Background animation values
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Text animation values
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const scaleText = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

    if (showLoader) {
        return (
            <div className="h-screen bg-slate-500 flex items-center justify-center">
                <LandingLoader />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" ref={ref}>
            {/* Navbar - Placed outside the animated background container */}
            <div className="relative z-50">
                <Navbar />
            </div>

            {/* Animated Background Elements - Lower z-index */}
            <motion.div
                style={{ y: yBg, opacity: opacityBg }}
                className="absolute inset-0 z-10 overflow-hidden"
            >
                <div className="absolute top-20 left-10 w-40 h-40 bg-red-400 rounded-full filter blur-[100px] opacity-100"></div>
                <div className="absolute top-1/3 right-20 w-64 h-64 bg-purple-400 rounded-full filter blur-[100px] opacity-100"></div>
                <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-indigo-400 rounded-full filter blur-[100px] opacity-100"></div>
            </motion.div>

            {/* Hero Section */}
            <section className="relative z-20 min-h-[80vh] flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 gap-12 pt-16">
                <motion.div
                    style={{ y: yText, scale: scaleText }}
                    className="max-w-2xl text-center lg:text-left"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                    >
                        Never Lose a Thought Again
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-600 mb-8"
                    >
                        Your digital second brain for capturing, organizing, and rediscovering everything that matters.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
                    >
                        {isLoggedIn ? (
                            <Button
                                variant="purple_variant"
                                endIcon={<EnterDoor />}
                                text="Dashboard"
                                onClick={() => window.location.href = "/dashboard"}
                            />
                        ) : (
                            <Button
                                variant="blue_variant"
                                endIcon={<EnterDoor />}
                                text="Get Started"
                                onClick={() => window.location.href = "/"}
                            />
                        )}
                        <Button
                            variant="general_2"
                            endIcon={<QuestionMark />}
                            text="See how it works"
                        />

                    </motion.div>
                    <div className="mr-80 mt-5">
                        <OauthProvider />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    <div className="ml-80">
                        <AuthInput />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="relative z-20 py-20 px-4 sm:px-6 lg:px-8">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-16"
                >
                    Your Digital Second Brain
                </motion.h2>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2 }}
                >
                    <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <LandingCard1
                            icon={<Save />}
                            TopTitle="Capture Anything"
                            description="Save YouTube videos, tweets, screenshots, or random thoughts in seconds. We support various content types."
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <LandingCard1
                            icon={<Search />}
                            TopTitle="Instant Recall"
                            description="Find anything you've saved. No more endless scrolling or forgotten bookmarks."
                        />
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <LandingCard1
                            icon={<FileStack />}
                            TopTitle="Smarter Organization"
                            description="Auto-tagging and smart folders keep your digital memories organized without effort."
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Founder Section */}
            <section className="relative z-20 flex flex-col md:flex-row justify-center mt-12 md:mt-16 items-center gap-6 md:gap-10 lg:gap-20 px-4">
                <div className="hidden md:block">
                    <ThanksForVisit />
                </div>

                <div onClick={() => { window.open("https://imshubh.site") }} className="order-first md:order-none">
                    <Image
                        src="/shubhImg.png"
                        alt="SWS logo"
                        width={100}
                        height={100}
                        className="cursor-pointer w-24 sm:w-32 md:w-64 lg:w-80"
                        priority
                    />
                </div>

                <div className="hidden md:block">
                    <ThanksForVisit />
                </div>
            </section>

            <section className="relative z-20 flex items-center justify-center flex-col mt-6 md:mt-8">
                <span className="tracking-tighter text-sm sm:text-base md:text-xl text-center font-medium text-primary/80">
                    Made By
                </span>
                <h1 className="cursor-pointer tracking-tighter text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold my-1 sm:my-2">
                    <span className="font-bold bg-gradient-to-b from-red-400 to-red-500 bg-clip-text text-transparent">
                        Shubhashish Chakraborty
                    </span>
                </h1>
            </section>

            <section>
                <Footer />
            </section>
        </div>
    );
}