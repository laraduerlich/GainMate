import WorkoutCreateForm from "../../components/workout/WorkoutCreateForm.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {Workout} from "../../types/Workout.tsx";
import {useNavigate} from "react-router-dom";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {useEffect} from "react";

type WorkoutCreateProps = {
    createWorkout: (workout: Workout) => void
    exercises: Exercise[]
    getAllExercises: () => void
}

export default function WorkoutCreatePage({createWorkout, exercises, getAllExercises}: WorkoutCreateProps) {

    const navigate = useNavigate()

    // button handler
    const handleBackButtonClick = () => {
        navigate("/workouts");
    }

    useEffect(() => {
        getAllExercises()
    }, []);

    return (
        <>
            <WorkoutCreateForm createWorkout={createWorkout} exercises={exercises}/>
            <ButtonWithIcon icon={"back"} type={"button"} onClick={handleBackButtonClick}/>
        </>
    )
}
