// app/dashboard/page.tsx
"use client";

import { AddContent } from "@/components/modals/AddContent";
import { SideBar } from "@/components/SideBar";
import { Button } from "@/components/ui/Button";
import { Plus } from "@/icons/Plus";
import { Share } from "@/icons/Share";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Notification } from "@/components/ui/Notification";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { User } from "@/icons/User";
import CodeEditorLoader from "@/components/ui/CodeEditor-Loader";
import { EnterDoor } from "@/icons/EnterDoor";
import { ContentCard } from "@/components/ui/ContentCard";
import { ContentType } from "@/utils/ContentType";

interface Content {
    id: string;
    title: string;
    url?: string | null;
    description?: string | null;
    type: ContentType;
    createdAt: string;
}

// Helper function to get cookies
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export default function Dashboard() {
    const [avatar, setAvatar] = useState<string | null>(null);
    const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [contents, setContents] = useState<Content[]>([]);
    const [isFetchingContents, setIsFetchingContents] = useState(false);
    const avatarMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkSessionAndFetchData = async () => {
            // Get token from URL
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get('token');

            if (urlToken) {
                // Store the token in cookies
                document.cookie = `token=${urlToken}; path=/; max-age=${4 * 24 * 60 * 60}; secure=${process.env.NODE_ENV === 'production'}; sameSite=lax`;

                // Clean the URL
                params.delete('token');
                const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
                router.replace(newUrl);
            }

            // Then verify session
            const sessionResponse = await axios.get(
                `${BACKEND_URL}/api/v1/auth/user/session`,
                {
                    withCredentials: true,
                    headers: {
                        // Include token from cookies explicitly
                        Authorization: `Bearer ${getCookie('token')}`
                    }
                }
            );

            if (!sessionResponse.data.message.isAuthenticated) {
                throw new Error('Not authenticated');
            }

            setIsAuthenticated(true);
            setIsLoading(false);

            // Rest of your data fetching logic...
            const userResponse = await axios.get(
                `${BACKEND_URL}/api/v1/auth/user/me`,
                { withCredentials: true }
            );
            setUsername(userResponse.data.finalUserData.username);
            await fetchContents();
        }
        checkSessionAndFetchData();
    }, [router])

    // useEffect(() => {
    //     const checkSessionAndFetchData = async () => {
    //         try {
    //             setIsLoading(true);

    //             // First check for token in URL (fallback from OAuth)
    //             // const urlToken = router.query.token;


    //             const urlToken = searchParams.get('token');

    //             if (urlToken) {
    //                 // Store the token in cookies
    //                 document.cookie = `token=${urlToken}; path=/; max-age=${4 * 24 * 60 * 60}; secure=${process.env.NODE_ENV === 'production'}; sameSite=lax`;

    //                 // Clean the URL - new way without shallow
    //                 const newUrl = new URL(window.location.href);
    //                 newUrl.searchParams.delete('token');
    //                 router.replace(newUrl.toString());
    //             }

    //             // Then verify session
    //             const sessionResponse = await axios.get(
    //                 `${BACKEND_URL}/api/v1/auth/user/session`,
    //                 {
    //                     withCredentials: true,
    //                     headers: {
    //                         // Include token from cookies explicitly
    //                         Authorization: `Bearer ${getCookie('token')}`
    //                     }
    //                 }
    //             );

    //             if (!sessionResponse.data.message.isAuthenticated) {
    //                 throw new Error('Not authenticated');
    //             }

    //             setIsAuthenticated(true);

    //             // Rest of your data fetching logic...
    //             const userResponse = await axios.get(
    //                 `${BACKEND_URL}/api/v1/auth/user/me`,
    //                 { withCredentials: true }
    //             );
    //             setUsername(userResponse.data.finalUserData.username);
    //             await fetchContents();

    //         } catch (error) {
    //             console.error("Authentication error:", error);
    //             setNotification({
    //                 message: "Session expired. Please login again",
    //                 type: "error"
    //             });
    //             setTimeout(() => router.push("/"), 2000);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     checkSessionAndFetchData();
    // }, [router, searchParams]);

    const fetchContents = async () => {
        try {
            setIsFetchingContents(true);
            const response = await axios.get(`${BACKEND_URL}/api/v1/content/my-content`, {
                withCredentials: true
            });
            setContents(response.data.contents || []);
        } catch (error) {
            console.error("Failed to fetch contents:", error);
            setNotification({
                message: "Failed to load contents",
                type: "error"
            });
        } finally {
            setIsFetchingContents(false);
        }
    };

    const handleDeleteContent = async (contentId: string) => {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/content/${contentId}`, {
                withCredentials: true
            });
            setContents(contents.filter(content => content.id !== contentId));
            setNotification({
                message: "Content deleted successfully",
                type: "success"
            });
        } catch (error) {
            console.error("Failed to delete content:", error);
            setNotification({
                message: "Failed to delete content",
                type: "error"
            });
        }
    };

    const handleContentCreated = () => {
        fetchContents();
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Fetch Avatar:
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/avatar/get-avatar`, {
                    withCredentials: true,
                });
                if (response.data && response.data.url) {
                    setAvatar(response.data.url);
                }
            } catch (err) {
                console.error("Failed to fetch avatar:", err);
            }
        };

        fetchAvatar();
    }, []);

    // Close avatar menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (avatarMenuRef.current && !avatarMenuRef.current.contains(event.target as Node)) {
                setAvatarMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
                <CodeEditorLoader />
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
                    onContentCreated={handleContentCreated}
                />

                <div className="bg-purple-300 flex justify-between items-center p-4 rounded-2xl mb-5">
                    <div>
                        <span className="text-black font-extrabold text-2xl">
                            Welcome, {username || 'User'}!
                        </span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="relative" ref={avatarMenuRef}>
                            <button
                                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
                                className="flex cursor-pointer items-center justify-center w-16 h-16 rounded-full overflow-hidden border-2 border-black hover:border-gray-400 transition-colors"
                            >
                                {avatar ? (
                                    <Image
                                        src={avatar}
                                        alt="User Avatar"
                                        width={64}
                                        height={64}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-emerald-500 flex items-center justify-center">
                                        <User />
                                    </div>
                                )}
                            </button>

                            <AnimatePresence>
                                {avatarMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 w-48 bg-slate-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                                    >
                                        <div className="py-1">
                                            <button
                                                onClick={() => {
                                                    router.push("/upload-avatar");
                                                    setAvatarMenuOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition-colors"
                                            >
                                                Change Profile Image
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Button
                            variant="red_variant"
                            text="Logout"
                            endIcon={<EnterDoor />}
                            onClick={handleLogout}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-4 mb-4">
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

                {isFetchingContents ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {contents.length === 0 ? (
                            <div className="col-span-full text-center py-10">
                                <p className="text-xl font-semibold">No contents yet. Add some content to get started!</p>
                            </div>
                        ) : (
                            contents.map(content => (
                                <ContentCard
                                    key={content.id}
                                    id={content.id}
                                    title={content.title}
                                    url={content.url}
                                    description={content.description}
                                    type={content.type}
                                    onDelete={handleDeleteContent}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </>
    );
}