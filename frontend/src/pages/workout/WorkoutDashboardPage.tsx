import List from "../../components/List.tsx";
import {Workout} from "../../types/Workout.tsx";
import {useNavigate} from "react-router-dom";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";

type WorkoutDashboardProps = {
    workouts: Workout[]
}

export default function WorkoutDashboardPage({workouts}: WorkoutDashboardProps) {

    const navigate = useNavigate();

    // button handler
    const handleNewButtonClick = () => {
        navigate("/workout/new");
    }

    return (
        <>
            <h2>Dashboard Workouts</h2>
            <div>
                <ButtonWithIcon icon={"new"} type={"button"} onClick={handleNewButtonClick} />
                <List elements={workouts} use={"dashboardWorkouts"} />
            </div>

        </>
    )
}
