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
            <div className="w-full max-w-4xl mx-auto space-y-6">
                {/* Header mit Button */}
                <div className="flex justify-between items-center px-4 pt-4">
                    <h2 className="text-lg font-semibold text-zinc-100">Workouts</h2>
                    <ButtonWithIcon
                        onClick={handleNewButtonClick}
                        icon="/new-icon.png"
                        type="button"
                    />
                </div>

                {/* Workout List */}
                <div>
                    <List elements={workouts} use="dashboardWorkouts" />
                </div>
            </div>
        </>
    )
}
