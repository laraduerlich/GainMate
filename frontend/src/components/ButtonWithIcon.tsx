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
            >
                {icon}
            </button>
        </>
    )
}
