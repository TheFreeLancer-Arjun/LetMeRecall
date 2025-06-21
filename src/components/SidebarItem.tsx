import { ReactElement } from "react"

interface SiderbarItemProps {
    itemIcon: ReactElement;
    itemText: string
}

export const SiderbarItem = ({itemIcon , itemText}: SiderbarItemProps) => {
    return (
        <div className="flex items-center cursor-pointer text-gray-600 hover:bg-cyan-50 rounded transition-all duration-300">

            <div className="p-2">
                {itemIcon}
            </div>

            <div className="p-2">
                {itemText}
            </div>
            
        </div>
    )
}