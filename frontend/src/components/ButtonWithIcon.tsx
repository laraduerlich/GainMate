import {FormEvent} from "react";

type ButtonWithIconProps = {
    onClick?: () => void;
    onSubmit?: (event: FormEvent) => void;
    icon: string;
    type: "button" | "submit" | "reset";
};

export default function ButtonWithIcon({
                                           onClick,
                                           icon,
                                           type }: ButtonWithIconProps) {
    return (
        <>
            <button
                type={type}
                onClick={onClick}
                className="px-6 py-3 dark:bg-gray-800 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-gray-700 hover:scale-105 focus:outline-none"
            >
                {icon}
            </button>
        </>
    )
}
