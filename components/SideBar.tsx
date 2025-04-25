import { Brain } from "@/icons/Brain"
import { SiderbarItem } from "./SidebarItem"
import { Twitter } from "@/icons/Twitter"
import { Youtube } from "@/icons/Youtube"
import { Button } from "./ui/Button"
import { EnterDoor } from "@/icons/EnterDoor"
import { BACKEND_URL } from "@/app/config"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import DateTimeCard from "./ui/DateTimeCard"

export const SideBar = () => {

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const handleLogout = async () => {
        try {
            await axios.post(`${BACKEND_URL}/api/v1/auth/user/logout`, {}, { withCredentials: true });
            setIsLoggedIn(false);
            router.push("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className="h-screen bg-white border-r w-72 left-0 top-0 fixed">
            
            <div onClick={() => {router.push("/")}} className="flex justify-center gap-3 mt-3 cursor-pointer hover:text-purple-800 transition-all duration-500">
                <Brain/>
                <h1 className="text-2xl font-bold">LetMeRecall</h1>
            </div>
            <div className="pt-8 pl-4">
                <SiderbarItem itemText="Tweets" itemIcon={<Twitter/>}/>
                <SiderbarItem itemText="Videos" itemIcon={<Youtube/>}/>
            </div>

            <div className="mt-30">
                <DateTimeCard/>
            </div>

            <div className="mt-70 flex justify-center">
                <Button variant="red_variant" text="Logout" endIcon={<EnterDoor/>} onClick={handleLogout}/>
            </div>            
        </div>
    )
}