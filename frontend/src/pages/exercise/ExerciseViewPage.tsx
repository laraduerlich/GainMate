import {Exercise} from "../../types/Exercise.tsx";
import ExerciseCard from "../../components/exercise/ExerciseCard.tsx";
import {useNavigate, useParams} from "react-router-dom";
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

    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
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
        console.log("test")
        setIsEditing(false)
    }

    const handleEditButtonClick = () => {
        setIsEditing(true)
    }

    const handleBackButtonClick = () => {
        navigate("/exercises")
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
                            className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                        />
                        <input
                            name={"note"}
                            value={editExercise.note}
                            onChange={handleEditChange}
                            className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                        />
                    </div>
                    <div className="mt-5 flex justify-center gap-4">
                        <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={() => setIsEditing(false)} />
                        <ButtonWithIcon icon={"/save-icon.png"} type={"submit"} />
                    </div>
                </form>
            ) : (
                <div>
                    <ExerciseCard exercise={exercise ? exercise : {id: "", name: "",}} />
                    <div className="mt-5 flex justify-center gap-4">
                        <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={handleBackButtonClick} />
                        <ButtonWithIcon icon={"/edit-icon.png"} type={"button"} onClick={handleEditButtonClick} />
                        <ButtonWithIcon icon={"/delete-icon.png"} type={"button"} onClick={handleDeleteButtonClick}/>
                    </div>
                </div>
            )}
        </>
    )
}
