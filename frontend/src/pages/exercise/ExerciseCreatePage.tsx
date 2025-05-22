import ExerciseCreateForm from "../../components/exercise/ExerciseCreateForm.tsx";
import {Exercise} from "../../types/Exercise.tsx";

type ExerciseCreateProps = {
    createExercise: (newExercise: Exercise) => void
}

export default function ExerciseCreatePage({createExercise}: ExerciseCreateProps) {

    return (
        <>
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                Create a exercise
            </h2>
            <ExerciseCreateForm createExercise={createExercise} />
        </>
    )
}
