import List from "../../components/List.tsx";
import {Workout} from "../../types/Workout.tsx";
import {useNavigate} from "react-router-dom";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {useEffect} from "react";

type WorkoutDashboardProps = {
    workouts: Workout[]
    getAllWorkouts: () => void
}

export default function WorkoutDashboardPage({workouts, getAllWorkouts}: WorkoutDashboardProps) {

    const navigate = useNavigate();

    // button handler
    const handleNewButtonClick = () => {
        navigate("/workout/new");
    }

    // fetch all workouts
    useEffect(() => {
        getAllWorkouts()
    }, []);

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
