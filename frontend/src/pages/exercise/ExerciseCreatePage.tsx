import ExerciseCreateForm from "../../components/exercise/ExerciseCreateForm.tsx";
import {Exercise} from "../../types/Exercise.tsx";

type ExerciseCreateProps = {
    createExercise: (newExercise: Exercise) => void

}

export default function ExerciseCreatePage({createExercise}: ExerciseCreateProps) {



    return (
        <>
            <h2>Create a Exercise</h2>
            <ExerciseCreateForm createExercise={createExercise} />

        </>
    )
}
