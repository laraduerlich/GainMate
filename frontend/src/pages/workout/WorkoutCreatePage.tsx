import WorkoutCreateForm from "../../components/workout/WorkoutCreateForm.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {Workout} from "../../types/Workout.tsx";
import {useNavigate} from "react-router-dom";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";

type WorkoutCreateProps = {
    createWorkout: (workout: Workout) => void
    exercises: Exercise[]
}

export default function WorkoutCreatePage({createWorkout, exercises}: WorkoutCreateProps) {

    const navigate = useNavigate()

    // button handler
    const handleBackButton = () => {
        navigate("/workouts");
    }

    return (
        <>
            <WorkoutCreateForm createWorkout={createWorkout} exercises={exercises}/>
            <ButtonWithIcon icon={"back"} type={"button"} onClick={handleBackButton}/>
        </>
    )
}
