import {Exercise} from "../types/Exercise.tsx";
import ExerciseCard from "../components/ExerciseCard.tsx";
import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ButtonWithIcon from "../components/ButtonWithIcon.tsx";

type ExerciseViewProps = {
    exercise: Exercise;
    getExerciseById: (id: string) => void;
    updateExercise: (updatedExercise: Exercise) => void
}

export default function ExerciseViewPage ({exercise, getExerciseById, updateExercise}: ExerciseViewProps) {

    const {id} = useParams<{id: string}>();
    const [isEditing, setIsEditing] = useState(false);
    const [editExercise, setEditExercise] = useState<Exercise>(exercise)

    //
    const handleEditChange = (event) => {
        setEditExercise({
            ...editExercise,
            // key (name) of the input is dynamically set
            [event.target.name]: event.target.value,
        })
    }

    // button handler
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        updateExercise(editExercise)
        setIsEditing(false)
    }

    const handleEditButtonClick = () => {
        setIsEditing(true)
    }

    const handleBackButtonClick = () => {
        setEditExercise(exercise)
        setIsEditing(false)
    }

    // Load exercise
    useEffect(() => {
        if (id !== undefined) {
            getExerciseById(id)
        }
    }, [id]);

    return (
        <>
            {isEditing ? (
                <form onSubmit={handleSaveButtonClick}>
                    <div>
                        <input
                            name={"name"}
                            value={editExercise.name}
                            onChange={handleEditChange}
                            className="bg-white text-black border border-gray-300 p-2 rounded-md"
                        />
                        <textarea
                            name={"note"}
                            value={editExercise.note}
                            onChange={handleEditChange}
                            className="bg-white text-black border border-gray-300 p-2 rounded-md"
                        />
                    </div>
                    <div>
                        <ButtonWithIcon icon={"save"} type={"submit"} />
                        <ButtonWithIcon icon={"back"} type={"button"} onClick={handleBackButtonClick} />
                    </div>
                </form>

            ) : (
                <div>
                    <ExerciseCard exercise={exercise} editButtonClick={handleEditButtonClick}/>
                </div>
            )}
        </>
    )
}
