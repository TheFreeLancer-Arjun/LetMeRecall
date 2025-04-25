"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SocialCard from "./ui/SocialCards";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    // const socialLinks = [
    //     {
    //         name: "GitHub",
    //         icon: <Github className="w-5 h-5" />,
    //         url: "https://github.com/yourusername",
    //     },
    //     {
    //         name: "Twitter",
    //         icon: <Twitter className="w-5 h-5" />,
    //         url: "https://twitter.com/yourhandle",
    //     },
    //     {
    //         name: "LinkedIn",
    //         icon: <Linkedin className="w-5 h-5" />,
    //         url: "https://linkedin.com/in/yourprofile",
    //     },
    //     {
    //         name: "Email",
    //         icon: <Mail className="w-5 h-5" />,
    //         url: "mailto:your@email.com",
    //     },
    // ];

    // const footerLinks = [
    //     { name: "Home", url: "/" },
    //     { name: "Features", url: "/#features" },
    //     { name: "Pricing", url: "/pricing" },
    //     { name: "Blog", url: "/blog" },
    //     { name: "About", url: "/about" },
    //     { name: "Contact", url: "/contact" },
    //     { name: "Privacy Policy", url: "/privacy" },
    //     { name: "Terms of Service", url: "/terms" },
    // ];

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <Link href="/" className="flex items-center">
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                                LetMeRecall
                            </span>
                        </Link>
                        <p className="text-gray-400">
                            Your digital second brain for capturing, organizing, and rediscovering everything that matters.
                        </p>
                        <div className="flex space-x-4">
                            {/* {socialLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    {link.icon}
                                    <span className="sr-only">{link.name}</span>
                                </motion.a>
                            ))} */}
                        </div>
                    </motion.div>

                    {/* Footer links columns */}
                    {/* {["Product", "Company", "Resources", "Legal"].map((category, colIndex) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: colIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h3 className="text-white font-semibold">{category}</h3>
                            <ul className="space-y-2">
                                {footerLinks
                                    .slice(colIndex * 2, colIndex * 2 + 2)
                                    .map((link, index) => (
                                        <motion.li
                                            key={link.name}
                                            whileHover={{ x: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <Link
                                                href={link.url}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        </motion.li>
                                    ))}
                            </ul>
                        </motion.div>
                    ))} */}
                    <div className="flex ml-100 justify-center">
                        <SocialCard/>
                    </div>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="my-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
                />

                {/* Copyright */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm"
                >
                    <p>© {currentYear} LetMeRecall. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {/* <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">
                            Cookie Policy
                        </Link> */}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;