import {Exercise} from "../types/Exercise.tsx";
import ExerciseCard from "../components/ExerciseCard.tsx";
import {useParams} from "react-router-dom";

type ExerciseViewProps = {
    exercises: Exercise[];
}

export default function ExerciseViewPage({exercises}: ExerciseViewProps) {

    const {id} = useParams<{ id: string }>();

    const getExerciseById: Exercise | undefined = exercises.find((exercise: Exercise) => exercise.id === id)

    if (getExerciseById === undefined) {
        return console.log("Loading error!")
    }

    return (
        <>
            <ExerciseCard exercise={getExerciseById}/>
        </>
    )
}
