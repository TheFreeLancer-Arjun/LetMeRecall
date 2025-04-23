"use client";

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
    return (
        <div className="min-h-screen">
            <Navbar />
            <div className="flex justify-around"> 
                <div className="flex flex-col justify-center items-center">
                    <div className="mt-5 text-xl md:text-6xl font-extrabold">
                        Never Lose a Thought Again
                    </div>
                    <div className="text-xl">
                        Your digital second brain for capturing, organizing, and rediscovering everything that matters.
                    </div>

                    <div>
                        <Button variant="blue_variant" endIcon={<EnterDoor/>} text="Get Started"/>
                        <Button variant="general_2" endIcon={<QuestionMark  />} text="See how it works"/>
                    </div>
                </div>
                <div className="mt-60">
                    <AuthInput/>
                </div>
            </div>

            <div className="mt-60">
                <div className="text-4xl font-bold text-center">
                    Your Digital Second Brain
                </div>

                <div className="flex justify-center space-x-6 mt-5">
                    <div>
                        <LandingCard1 icon={<Save/>} TopTitle="Capture Anything" description="Save YouTube videos, tweets, screenshots, or random thoughts in seconds. We support various content types."/>
                    </div>

                    <div>
                        <LandingCard1 icon={<Search/>} TopTitle="Instant Recall" description="Find anything you've saved. No more endless scrolling or forgotten bookmarks."/>
                    </div>

                    <div>
                        <LandingCard1 icon={<FileStack/>} TopTitle="Smarter Organization" description="Auto-tagging and smart folders keep your digital memories organized without effort"/>
                    </div>
                </div>
            </div>
        </div>
    )
}