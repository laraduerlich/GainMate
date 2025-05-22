import {useNavigate} from "react-router-dom";
import {AppUser} from "../types/AppUser.tsx";

type OverviewPageProps = {
    appUser: AppUser | undefined | null
}

export default function OverviewPage({appUser}: OverviewPageProps) {

    const navigate = useNavigate()

    // button handler
    const handleGoToExerciseDashboard = () => {
        navigate("/exercises")
    }

    const handleGoToWorkoutDashboard = () => {
        navigate("/workouts")
    }

    return (
        <>
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                Welcome {appUser? appUser.name : ""}!
            </h2>
            <div className="flex flex-col space-y-4">
                <button
                    type={"button"}
                    onClick={handleGoToExerciseDashboard}
                    className="px-4 py-3 bg-zinc-400 text-black font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                    Exercises
                </button>
                <button
                    type={"button"}
                    onClick={handleGoToWorkoutDashboard}
                    className="px-4 py-3 bg-zinc-400 text-black font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                    Workouts
                </button>
            </div>
        </>
    )
}
