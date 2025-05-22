
type HeaderProps = {
    toggleSidebar: () => void
}

export default function Header({toggleSidebar}: HeaderProps) {

    return (
        <>
            <div className="w-full max-w-md px-4 py-2 bg-zinc-800 shadow-md  fixed top-0">
                <button
                    type={"button"}
                    onClick={toggleSidebar}
                >
                    <img src={"/Logo.png"} alt="icon" className="w-13 h-13" />
                </button>
            </div>
        </>
    )
}
