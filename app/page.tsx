"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Navbar } from "@/components/Navbar";
import AuthInput from "@/components/ui/AuthInput";
import { Button } from "@/components/ui/Button";
import LandingCard1 from "@/components/ui/LandingCard1";
import { EnterDoor } from "@/icons/EnterDoor";
import { FileStack } from "@/icons/FileStack";
import { QuestionMark } from "@/icons/QuestionMark";
import { Save } from "@/icons/Save";
import { Search } from "@/icons/Search";

export default function Home() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Background animation values
    const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Text animation values
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const scaleText = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" ref={ref}>
            {/* Animated Background Elements */}
            <motion.div
                style={{ y: yBg, opacity: opacityBg }}
                className="absolute inset-0 z-0 overflow-hidden"
            >
                <div className="absolute top-20 left-10 w-32 h-32 bg-red-400 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute top-1/3 right-20 w-64 h-64 bg-purple-400 rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-indigo-400 rounded-full filter blur-3xl opacity-20"></div>
            </motion.div>

            <Navbar />

            {/* Hero Section */}
            <section className="relative z-10 min-h-[80vh] flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 lg:px-8 gap-12">
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
                        <Button
                            variant="blue_variant"
                            endIcon={<EnterDoor />}
                            text="Get Started"
                            onClick={() => window.location.href = "/signup"}
                        />
                        <Button
                            variant="general_2"
                            endIcon={<QuestionMark />}
                            text="See how it works"
                        />
                    </motion.div>
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
            <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
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
                            icon={<FileStack  />}
                            TopTitle="Smarter Organization"
                            description="Auto-tagging and smart folders keep your digital memories organized without effort."
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Additional sections can be added here */}
        </div>
    );
}