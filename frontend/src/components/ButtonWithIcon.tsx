
type ButtonWithIconProps = {
    onClick?: () => void;
    icon: string;
    type?: "button" | "submit" | "reset";
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
