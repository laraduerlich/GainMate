import {Exercise} from "../../types/Exercise.tsx";
import List from "../../components/List.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type ExerciseDashboardProps = {
    exercises: Exercise[]
    getAllExercises: () => void
}

export default function ExerciseDashboardPage({exercises, getAllExercises}: ExerciseDashboardProps) {

    const navigate = useNavigate()

    // button handler
    const handleNewExerciseButtonClick = () => {
        navigate("/exercise/new")
    }


    // fetch all exercises
    useEffect(() => {
        getAllExercises()
    }, []);

    return (
        <>
            <div className="w-full max-w-4xl mx-auto space-y-6">
                {/* Header mit Button */}
                <div className="flex justify-between items-center px-4 pt-4">
                    <h2 className="text-lg font-semibold text-zinc-100">Exercises</h2>
                    <ButtonWithIcon
                        onClick={handleNewExerciseButtonClick}
                        icon="/new-icon.png"
                        type="button"
                    />
                </div>

                {/* Exercises List */}
                <div>
                    <List elements={exercises} use="dashboardExercise" />
                </div>
            </div>
        </>
    )
}
