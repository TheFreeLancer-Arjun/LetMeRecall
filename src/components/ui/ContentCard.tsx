// components/ContentCard.tsx
import { Bin } from "@/icons/Bin";
import { Document } from "@/icons/Document";
import { Redirect } from "@/icons/Redirect";
import { ContentType } from "@/utils/ContentType";

interface CardProps {
    id: string;
    title: string;
    url?: string | null;
    description?: string | null;
    type: ContentType;
    onDelete: (id: string) => void;
}

export const ContentCard = ({ id, title, url, description, type, onDelete }: CardProps) => {
    const handleDelete = async () => {
        onDelete(id);
    };

    const getTypeIcon = () => {
        switch (type) {
            case "YOUTUBE":
                return <span className="text-red-500">YT</span>;
            case "TWEET":
                return <span className="text-blue-500">TW</span>;
            case "DOCUMENT":
                return <Document />;
            case "IMAGE":
                return <span className="text-green-500">IMG</span>;
            default:
                return <Document />;
        }
    };

    return (
        <div className="max-w-80 p-6 bg-white border-2 border-purple-100 shadow-md hover:border-slate-300 transition-all duration-500 rounded-md">
            <div className="flex justify-between items-start">
                <div className="flex items-center font-medium">
                    <div className="pr-2 text-gray-500">
                        {getTypeIcon()}
                    </div>
                    <h3 className="font-semibold">{title}</h3>
                </div>

                <div className="flex items-center text-gray-500 space-x-2">
                    {url && (
                        <a href={url} target="_blank" rel="noopener noreferrer">
                            <Redirect className="hover:text-blue-500" />
                        </a>
                    )}
                    <button onClick={handleDelete}>
                        <Bin className="hover:text-red-500" />
                    </button>
                </div>
            </div>

            {description && (
                <p className="mt-2 text-sm text-gray-600">{description}</p>
            )}

            {type === "YOUTUBE" && url && (
                <div className="mt-4">
                    <iframe 
                        className="w-full h-48" 
                        src={url.replace("watch", "embed").replace("?v=", "/")} 
                        title="YouTube video player" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                </div>
            )}

            {type === "TWEET" && url && (
                <div className="mt-4">
                    <blockquote className="twitter-tweet">
                        <a href={url.replace("x.com", "twitter.com")}></a>
                    </blockquote>
                </div>
            )}
        </div>
    );
};