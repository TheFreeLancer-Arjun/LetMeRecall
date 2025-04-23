import { Brain } from "@/icons/Brain"
import { SiderbarItem } from "./SidebarItem"
import { Twitter } from "@/icons/Twitter"
import { Youtube } from "@/icons/Youtube"

export const SideBar = () => {
    return (
        <div className="h-screen bg-white border-r w-72 left-0 top-0 fixed">
            
            <div onClick={() => {window.open("https://github.com/Shubhashish-Chakraborty/LetMeRecall")}} className="flex justify-center gap-3 mt-3 cursor-pointer hover:text-purple-800 transition-all duration-500">
                <Brain/>
                <h1 className="text-2xl font-bold">LetMeRecall</h1>
            </div>
            <div className="pt-8 pl-4">
                <SiderbarItem itemText="Tweets" itemIcon={<Twitter/>}/>
                <SiderbarItem itemText="Videos" itemIcon={<Youtube/>}/>
            </div>
        </div>
    )
}