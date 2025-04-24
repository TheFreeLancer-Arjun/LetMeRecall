// components/ui/Notification.tsx
"use client";

import { useEffect } from "react";

export const Notification = ({
    message,
    type,
    onClose,
}: {
    message: string;
    type: "success" | "error";
    onClose: () => void;
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
            type === "success" ? "bg-green-500" : "bg-red-500"
        } text-white`}>
            {message}
        </div>
    );
};