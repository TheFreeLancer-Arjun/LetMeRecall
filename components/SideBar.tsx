import { Brain } from "@/icons/Brain"
import { SiderbarItem } from "./SidebarItem"
import { Twitter } from "@/icons/Twitter"
import { Youtube } from "@/icons/Youtube"
import { useRouter } from "next/navigation"
import DateTimeCard from "./ui/DateTimeCard"

export const SideBar = () => {

    const router = useRouter();


    return (
        <div className="h-screen bg-white border-r w-72 left-0 top-0 fixed">
            
            <div onClick={() => {router.push("/")}} className="flex justify-center gap-3 mt-3 cursor-pointer hover:text-purple-800 transition-all duration-500">
                <Brain/>
                <h1 className="text-2xl font-bold">LetMeRecall</h1>
            </div>

            <div className="mt-10 flex justify-center">
                <DateTimeCard/>
            </div>

            <div className="pt-8 pl-4">
                <SiderbarItem itemText="Tweets" itemIcon={<Twitter/>}/>
                <SiderbarItem itemText="Videos" itemIcon={<Youtube/>}/>
            </div>         
        </div>
    )
}