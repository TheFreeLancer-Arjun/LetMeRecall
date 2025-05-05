import { RefObject, ChangeEventHandler } from "react";

interface InputProps {
    type: string;
    placeholder: string;
    reference?: RefObject<HTMLInputElement>;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
    disabled?: boolean;
}

export const Input = ({
    type,
    placeholder,
    reference,
    value,
    onChange,
    className = "",
    disabled = false
}: InputProps) => {
    return (
        <div className={`bg-blue-200 py-3 w-96 border-2 border-gray-100 rounded-xl ${className}`}>
            <input
                ref={reference}
                className="w-64 px-3 placeholder-black bg-blue-200 text-black outline-none"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
            />
        </div>
    );
};