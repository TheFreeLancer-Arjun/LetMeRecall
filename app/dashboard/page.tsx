"use client";

import { AddContent } from "@/components/modals/AddContent";
import { SideBar } from "@/components/SideBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/ContentCard";
import { Plus } from "@/icons/Plus";
import { Share } from "@/icons/Share";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Notification } from "@/components/ui/Notification";
import Loader from "@/components/ui/Loader";

export default function Dashboard() {
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkSessionAndFetchData = async () => {
            try {
                setIsLoading(true);

                // First check session
                const sessionResponse = await axios.get(
                    `${BACKEND_URL}/api/v1/auth/user/session`,
                    { withCredentials: true }
                );

                if (!sessionResponse.data.message.isAuthenticated) {
                    setNotification({
                        message: "Please login first",
                        type: "error"
                    });
                    setIsAuthenticated(false);
                    setTimeout(() => router.push("/"), 2000);
                    return;
                }

                setIsAuthenticated(true);

                // If authenticated, fetch user data
                const userResponse = await axios.get(
                    `${BACKEND_URL}/api/v1/auth/user/me`,
                    { withCredentials: true }
                );

                setUsername(userResponse.data.finalUserData.username);

            } catch (error) {
                console.error("Error:", error);
                setNotification({
                    message: "Session expired. Please login again",
                    type: "error"
                });
                setTimeout(() => router.push("/"), 2000);
            } finally {
                setIsLoading(false);
            }
        };

        checkSessionAndFetchData();
    }, [router]);

    if (!isAuthenticated && !isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Loader />
                {notification && (
                    <Notification
                        message={notification.message}
                        type={notification.type}
                        onClose={() => setNotification(null)}
                    />
                )}
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <Loader />
            </div>
        );
    }

    return (
        <>
            <SideBar />

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <div className="p-4 ml-72 bg-blue-100 min-h-screen">
                <AddContent
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />

                <div className="bg-purple-300 flex justify-center p-4 rounded-2xl mb-5">
                    <span className="text-black font-extrabold text-2xl">
                        Welcome, {username || 'User'}!
                    </span>
                </div>

                <div className="flex justify-end gap-4">
                    <Button
                        variant="general_1"
                        text="Share Brain"
                        endIcon={<Share />}
                        onClick={() => { }}
                    />
                    <Button
                        variant="general_2"
                        text="Add Content"
                        endIcon={<Plus />}
                        onClick={() => setModalOpen(true)}
                    />
                </div>

                <div className="flex gap-5">
                    <Card
                        title="This is Tate!!"
                        link="https://x.com/__Shubhashish__/status/1914984127821992129"
                        type="twitter"
                    />
                    <Card
                        title="Gonna Read these!!"
                        link="https://x.com/librarymindset/status/1872519924440342728"
                        type="twitter"
                    />
                </div>
            </div>
        </>
    );
}