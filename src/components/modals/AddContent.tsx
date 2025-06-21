// components/modals/AddContent.tsx
import { Cross } from "@/icons/Cross";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Check } from "@/icons/Check";
import { useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/app/config";
import { Notification } from "@/src/components/ui/Notification";
import { ContentType } from "@/utils/ContentType";

interface AddContentProps {
    open: boolean;
    onClose: () => void;
    onContentCreated: () => void;
}

export const AddContent = ({ open, onClose, onContentCreated }: AddContentProps) => {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState<ContentType>("LINK");
    const [notification, setNotification] = useState<{
        message: string;
        type: "success" | "error";
    } | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim()) {
            setNotification({
                message: "Title is required",
                type: "error"
            });
            return;
        }

        setIsLoading(true);
        try {
            await axios.post(
                `${BACKEND_URL}/api/v1/content/create-content`,
                { title, url, description, type },
                { withCredentials: true }
            );

            setNotification({
                message: "Content created successfully!",
                type: "success"
            });
            setTitle("");
            setUrl("");
            setDescription("");
            onContentCreated();
            setTimeout(onClose, 1000);
        } catch (error) {
            console.error("Error creating content:", error);
            setNotification({
                message: "Failed to create content",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {open && (
                <div className="flex justify-center items-center h-screen w-screen bg-slate-950/75 fixed top-0 left-0 z-50">
                    <div className="flex flex-col justify-center">
                        <div className="bg-white p-4 rounded-lg w-96">
                            <div className="flex justify-end cursor-pointer">
                                <div onClick={onClose}>
                                    <Cross />
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center bg-purple-100 rounded-lg hover:bg-cyan-100 transition-all duration-500">
                                <h1 className="font-bold text-2xl">Add Content</h1>
                            </div>

                            <div className="mt-8 space-y-4">
                                <Input
                                    type="text"
                                    placeholder="Enter Title:"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Enter URL (optional):"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                                <Input
                                    type="text"
                                    placeholder="Enter Description (optional):"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="flex flex-col">
                                    <label className="mb-2 font-medium">Content Type:</label>
                                    <select
                                        className="p-2 border rounded"
                                        value={type}
                                        onChange={(e) => setType(e.target.value as ContentType)}
                                    >
                                        <option value="LINK">Link</option>
                                        <option value="YOUTUBE">YouTube</option>
                                        <option value="TWEET">Tweet</option>
                                        <option value="DOCUMENT">Document</option>
                                        <option value="IMAGE">Image</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-center mt-6">
                                <Button
                                    variant="blue_variant"
                                    text={isLoading ? "Creating..." : "Submit"}
                                    onClick={handleSubmit}
                                    endIcon={<Check />}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
        </>
    );
};