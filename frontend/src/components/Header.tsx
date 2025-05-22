
type HeaderProps = {
    toggleSidebar: () => void
}

export default function Header({toggleSidebar}: HeaderProps) {

    return (
        <>
            <div className="fixed top-0 bg-zinc-800 shadow-md px-4 py-2 w-full flex justify-center">
                <div className="flex items-center gap-x-2 max-w-md">
                <button
                    type={"button"}
                    onClick={toggleSidebar}
                >
                    <img src={"/Logo.png"} alt="icon" className="w-13 h-13" />
                </button>
                <h2 className="text-white text-lg font-bold"
                    onClick={toggleSidebar}
                >GainMate</h2>
                </div>
            </div>
        </>
    )
}
