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

    const handleGoToProgressPage = () => {
        navigate("/progress")
    }

    const handleGoToUserPage = () => {
        navigate("/account")
    }

    return (
        <>
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                Welcome {appUser? appUser.name : ""}!
            </h2>
            <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6">
                <button
                    type={"button"}
                    onClick={handleGoToExerciseDashboard}
                    className="mx-2 px-4 py-3 bg-zinc-700 text-zinc-100 font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                    Exercises
                </button>
                <button
                    type={"button"}
                    onClick={handleGoToProgressPage}
                    className="mx-2 px-4 py-3 bg-zinc-700 text-zinc-100 font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                    Progress
                </button>
                <button
                    type={"button"}
                    onClick={handleGoToWorkoutDashboard}
                    className="mx-2 px-4 py-3 bg-zinc-700 text-zinc-100 font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                    Workouts
                </button>
                <button
                    type={"button"}
                    onClick={handleGoToUserPage}
                    className="mx-2 px-4 py-3 bg-zinc-700 text-zinc-100 font-semibold rounded-lg shadow-lg transform transition duration-300 hover:bg-zinc-200 hover:scale-105 focus:outline-none">
                    Account
                </button>
            </div>
        </>
    )
}
