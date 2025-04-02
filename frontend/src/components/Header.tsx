import ButtonWithIcon from "./ButtonWithIcon.tsx";

type HeaderProps = {
    toggleSidebar: () => void
}

export default function Header({toggleSidebar}: HeaderProps) {

    return (
        <>
            <div className="w-full max-w-md px-4 py-2 bg-white shadow-md dark:bg-gray-800 fixed top-0">
                <ButtonWithIcon icon={"GainMate"} type={"button"} onClick={toggleSidebar} />
            </div>
        </>
    )
}
