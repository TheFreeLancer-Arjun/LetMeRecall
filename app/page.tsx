"use client";

import AuthInput from "@/components/ui/AuthInput";

export default function Home() {
    return (
        <div className="bg-mainBgColor min-h-screen">
            <div className="flex justify-center">
                <div className="mt-80">
                    <AuthInput/>
                </div>
            </div>
        </div>
    )
}