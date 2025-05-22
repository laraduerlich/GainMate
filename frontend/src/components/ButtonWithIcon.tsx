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
                className="px-4 py-3 bg-zinc-400 text-white font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none"
            >
                <img src={icon} alt="icon" className="w-5 h-5" />
            </button>
        </>
    )
}
