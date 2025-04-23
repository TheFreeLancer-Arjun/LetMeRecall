import { Cross } from "@/icons/Cross";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Check } from "@/icons/Check";

interface AddContentProps {
    open: boolean;
    onClose: () => void
}

export const AddContent = ({open , onClose}:AddContentProps) => {
    return (
        <>
            {open && 
            
                <div className="flex justify-center h-screen w-screen bg-slate-950/75 fixed top-0 left-0">
                    <div className="flex flex-col justify-center">
                        <div className="bg-white p-4 rounded-lg">
                            <div className="flex justify-end cursor-pointer">
                                <div onClick={onClose}>
                                    <Cross/>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center bg-purple-100 rounded-lg hover:bg-cyan-100 transition-all duration-500">
                                <h1 className="font-bold text-2xl">Add Content</h1>
                            </div>

                            <div className="mt-8">
                                <Input type="text" placeholder="Enter Title:"/>
                                <Input type="text" placeholder="Enter Link:"/>
                            </div>
                            
                            <div className="flex justify-center mt-6">
                                <Button variant="blue_variant" text="Submit" onClick={() => {}} endIcon={<Check />}/>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}