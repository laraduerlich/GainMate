import WorkoutCreateForm from "../../components/workout/WorkoutCreateForm.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {Workout} from "../../types/Workout.tsx";

type WorkoutCreatePageProps = {
    createWorkout: (workout: Workout) => void
    exercises: Exercise[]
}

export default function WorkoutCreatePage({createWorkout, exercises}: WorkoutCreatePageProps) {

    return (
        <>
            <WorkoutCreateForm createWorkout={createWorkout} exercises={exercises}/>
        </>
    )
}
