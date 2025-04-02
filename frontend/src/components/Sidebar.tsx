import ButtonWithIcon from "./ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";

type SidebarProps = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

export default function Sidebar({isOpen, setIsOpen}: SidebarProps) {

    const navigate = useNavigate()

    return (
        <>
            <div className={`transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed left-0 top-0 h-full bg-white w-60 shadow-md`}>
            <div className="flex flex-col h-full p-3 w-60 dark:bg-gray-50 dark:text-gray-800">
                <div className="space-y-3">
                    <div className="flex items-center justify-between" onClick={() => isOpen}>
                        <h2>Overview</h2>
                        <button className="p-2" onClick={() => isOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current dark:text-gray-800">
                                <rect width="352" height="32" x="80" y="96"></rect>
                                <rect width="352" height="32" x="80" y="240"></rect>
                                <rect width="352" height="32" x="80" y="384"></rect>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1 text-sm">
                            <li className="rounded-sm">
                                <ButtonWithIcon icon={"Exercises"} type={"button"} onClick={() => {
                                    setIsOpen(!isOpen)
                                    navigate("/exercises")
                                }} />
                            </li>
                            <li className="rounded-sm">
                                <ButtonWithIcon icon={"Workouts"} type={"button"} onClick={() => {
                                    setIsOpen(!isOpen)
                                    navigate("/workouts")
                                }} />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}
