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
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                my workouts</h2>
            <div className="absolute right-2 top-20">
                <ButtonWithIcon icon={"/new-icon.png"} type={"button"} onClick={handleNewButtonClick} />
            </div>
            <div>
                <List elements={workouts} use={"dashboardWorkouts"} />
            </div>
        </>
    )
}
