import { Bin } from "@/icons/Bin";
import { Document } from "@/icons/Document";
import { Redirect } from "@/icons/Redirect";

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
}


export const Card = ({ title, link, type }: CardProps) => {
    return (
        <div>
            <div className="max-w-80 p-8 bg-white border-2 border-purple-100 shadow-md cursor-pointer hover:border-slate-300 transition-all duration-500 rounded-md">
                <div className="flex justify-between">

                    <div className="flex items-center font-medium">
                        <div className="pr-2 text-gray-500">
                            <Document />
                        </div>

                        {title}

                    </div>

                    <div className="flex items-center text-gray-500">

                        <div className="pr-4">
                            <a href={link} target="_blank">
                                <Redirect />
                            </a>
                        </div>

                        <Bin />
                    </div>

                </div>

                <div className="pt-4">
                    {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                    {type === "twitter" && <blockquote className="twitter-tweet">
                        <a href={link.replace("x", "twitter")}></a>
                    </blockquote>}

                </div>
            </div>
        </div>
    )
}