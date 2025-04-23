"use client";

import { AddContent } from "@/components/modals/AddContent";
import { SideBar } from "@/components/SideBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/ContentCard";
import { Plus } from "@/icons/Plus";
import { Share } from "@/icons/Share";
import { useState } from "react";

export default function Dashboard() {
    const [modalOpen , setModalOpen] = useState(false);

    // The app has two parts left right: the sidebar and the main content!      

    return(
        
        <>

            <SideBar/>

            {/* this is the main content */}

            {/* the amount of width the sidebar taking will be the margin left for the main content */}
            <div className="p-4 ml-72 bg-blue-100 min-h-screen">
                <AddContent open={modalOpen} onClose={() => {
                    setModalOpen(false)
                }}/>

                <div className="flex justify-end gap-4">
                    <Button variant="general_1" text="Share Brain" endIcon={<Share/>} onClick={() => {}}/>
                    <Button variant="general_2" text="Add Content" endIcon={<Plus/>} onClick={() => {setModalOpen(true)}}/>
                </div>

                <div className="flex gap-5">
                    <Card title="This is Tate!!" link="https://x.com/__Shubhashish__/status/1914984127821992129" type="twitter"/>
                    <Card title="Gonna Read these!!" link="https://x.com/librarymindset/status/1872519924440342728" type="twitter"/>
                </div>
            </div>
        </>
    )
}