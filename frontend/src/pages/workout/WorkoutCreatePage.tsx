import WorkoutCreateForm from "../../components/workout/WorkoutCreateForm.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {WorkoutDTO} from "../../types/Workout.tsx";
import {useEffect} from "react";

type WorkoutCreateProps = {
    createWorkout: (workout: WorkoutDTO) => void
    exercises: Exercise[]
    getAllExercises: () => void
}

export default function WorkoutCreatePage({createWorkout, exercises, getAllExercises}: WorkoutCreateProps) {

    useEffect(() => {
        getAllExercises()
    }, []);

    return (
        <>
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                Create a Workout
            </h2>
            <div>
                <WorkoutCreateForm createWorkout={createWorkout} exercises={exercises}/>
            </div>
        </>
    )
}
