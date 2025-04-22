"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import GithubCorner from "./GithubCorner";

export const Navbar = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center items-center p-2">
            <GithubCorner/>
            <div className="w-full max-w-screen-lg cursor-pointer h-36 border-2 mt-2 border-pink-300 rounded-2xl flex flex-col md:flex-row md:justify-center items-center shadow-sm shadow-blue-200 hover:shadow-lg hover:shadow-amber-200 transition-all duration-500 p-4">
                {/* Logo */}
                <div onClick={() => router.push("/")} className="flex justify-center">
                    <Image
                        src="/letmerecall-logo.png"
                        alt="SWS logo"
                        width={192}
                        height={192}
                        className="w-32 md:w-48"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};