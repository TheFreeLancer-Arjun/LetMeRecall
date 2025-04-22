"use client";

import { Navbar } from "@/components/Navbar";
import AuthInput from "@/components/ui/AuthInput";
import { Button } from "@/components/ui/Button";
import { EnterDoor } from "@/icons/EnterDoor";
import { QuestionMark } from "@/icons/QuestionMark";

export default function Home() {
    return (
        <div className="bg-mainBgColor min-h-screen">
            <Navbar />
            <div className="flex justify-around"> 
                <div className="text-white bg-cover bg-cen">
                    <div className="mt-5 text-xl md:text-6xl font-extrabold">
                        Never Lose a Thought Again
                    </div>
                    <div className="text-xl">
                        Your digital second brain for capturing, organizing, and rediscovering everything that matters.
                    </div>

                    <div>
                        <Button variant="blue_variant" endIcon={<EnterDoor/>} text="Get Started"/>
                        <Button variant="general_1" endIcon={<QuestionMark  />} text="See how it works"/>
                    </div>
                </div>
                <div className="mt-60">
                    <AuthInput/>
                </div>
            </div>
        </div>
    )
}