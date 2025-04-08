import {useNavigate} from "react-router-dom";
import ButtonWithIcon from "../components/ButtonWithIcon.tsx";
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
            <h2>Welcome {appUser? appUser.name : ""}</h2>
            <ButtonWithIcon icon={"exercises"} type={"button"} onClick={handleGoToExerciseDashboard} />
            <ButtonWithIcon icon={"workouts"} type={"button"} onClick={handleGoToWorkoutDashboard} />
        </>
    )
}
