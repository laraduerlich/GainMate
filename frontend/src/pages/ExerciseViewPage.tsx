import {Exercise} from "../types/Exercise.tsx";
import ExerciseCard from "../components/ExerciseCard.tsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

type ExerciseViewProps = {
    exercise: Exercise;
    getExerciseById: (id: string) => void
}

export default function ExerciseViewPage ({exercise, getExerciseById}: ExerciseViewProps) {

    const {id} = useParams<{id: string}>();

    // Load exercise
    useEffect(() => {
        if (id !== undefined) {
            getExerciseById(id)
        }
    }, [id]);

    return (
        <>
            <ExerciseCard exercise={exercise}/>
        </>
    )
}
