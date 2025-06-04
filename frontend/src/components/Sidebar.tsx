import ButtonWithIcon from "./ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.tsx";

type SidebarProps = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
    logoutButtonClick: () => void
    appUser: AppUser | undefined | null
}

export default function Sidebar({isOpen, setIsOpen, logoutButtonClick, appUser}: SidebarProps) {

    const navigate = useNavigate()

    const handleLogoutButtonClick = () => {
        logoutButtonClick()
        navigate("/login")
    }

    return (
        <>
            <div className={`transition-transform duration-300 transform ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed left-0 top-0 h-full w-60 bg-zinc-800 shadow-md z-50`}>
                <div className="flex flex-col h-full p-3 w-60 bg-zinc-800">
                    <div className="space-y-3">
                        <div className="flex flex-col items-start px-4 pt-4 pb-2">
                            <h2>What‘s the plan,</h2>
                            <h2>{appUser ? appUser.name : ""}?</h2>
                        </div>
                        <div className="flex flex-col pt-5 space-y-4">
                            <button
                                type={"button"}
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                    navigate("/exercises")
                                }}
                                className="px-4 py-3 bg-zinc-500 text-black font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                                Exercises
                            </button>
                            <button
                                type={"button"}
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                    navigate("/workouts")
                                }}
                                className="px-4 py-3 bg-zinc-500 text-black font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                                Workouts
                            </button>
                            <button
                                type={"button"}
                                onClick={() => {
                                    setIsOpen(!isOpen)
                                    navigate("/account")
                                }}
                                className="px-4 py-3 bg-zinc-500 text-black font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                                Account
                            </button>
                        </div>
                        <ButtonWithIcon icon={"/logout-icon.png"} type={"button"} onClick={handleLogoutButtonClick} />
                    </div>
                </div>
            </div>
        </>
    )
}
