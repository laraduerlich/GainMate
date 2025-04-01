import {Exercise} from "../../types/Exercise.tsx";
import ExerciseCard from "../../components/exercise/ExerciseCard.tsx";
import {useParams} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {AxiosResponse} from "axios";

type ExerciseViewProps = {
    exercise: Exercise | undefined,
    getExerciseById: (id: string) => Promise<AxiosResponse>,
    updateExercise: (updatedExercise: Exercise) => void,
    deleteExercise: (id: string) => void
}

export default function ExerciseViewPage ({exercise, getExerciseById, updateExercise, deleteExercise}: ExerciseViewProps) {

    const {id} = useParams<{id: string}>();
    const [isEditing, setIsEditing] = useState(false);
    const [editExercise, setEditExercise] = useState<Exercise>(exercise ? exercise : {id: "", name: ""})

    const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEditExercise({
            ...editExercise,
            // key (name) of the input is dynamically set
            [event.target.name]: event.target.value,
        })
    }

    // button handler
    const handleSaveButtonClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        updateExercise(editExercise)
        setIsEditing(false)
    }

    const handleEditButtonClick = () => {
        setIsEditing(true)
    }

    const handleBackButtonClick = () => {
        if (exercise !== undefined) {
            setEditExercise(exercise)
        }
        setIsEditing(false)
    }

    const handleDeleteButtonClick = () => {
        if (id !== undefined) {
            deleteExercise(id)
        } else {
            console.log("Id is undefined")
        }
    }

    // Load exercise
    useEffect(() => {
        if (id !== undefined) {
            getExerciseById(id)
                .then((response) => {
                    return setEditExercise({
                        id: response.data.id,
                        name: response.data.name,
                        note: response.data.note
                    })
                })
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
                        <input
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
                    <ExerciseCard exercise={exercise ? exercise : {id: "", name: "",}} />
                    <ButtonWithIcon icon={"edit"} type={"button"} onClick={handleEditButtonClick} />
                    <ButtonWithIcon icon={"delete"} type={"button"} onClick={handleDeleteButtonClick}/>
                </div>
            )}
        </>
    )
}
