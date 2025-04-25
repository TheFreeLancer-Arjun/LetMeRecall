import { RefObject } from "react";

interface InputProps {
    type: string;
    placeholder: string;
    reference?: RefObject<HTMLInputElement>;
}
export const Input = ({ type, placeholder, reference }: InputProps) => {
    return (
        <>
            <div className="bg-blue-200 py-3 w-96 border-2 border-gray-100 rounded-xl">
                <input ref={reference} className="w-64 px-3 placeholder-black bg-blue-200 text-black outline-none" type={type} placeholder={placeholder} />
            </div>
        </>
    )
}