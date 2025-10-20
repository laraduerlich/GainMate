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

    const {exerciseId} = useParams<{exerciseId: string}>()
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
        setIsEditing(false)
    }

    const handleEditButtonClick = () => {
        setIsEditing(true)
    }

    const handleBackButtonClick = () => {
        navigate("/exercises")
    }

    const handleDeleteButtonClick = () => {
        if (exerciseId !== undefined) {
            deleteExercise(exerciseId)
        } else {
            console.log("Id is undefined")
        }
    }

    // Load exercise
    useEffect(() => {
        if (exerciseId !== undefined) {
            getExerciseById(exerciseId)
                .then((response) => {
                    return setEditExercise({
                        id: response.data.id,
                        name: response.data.name,
                        note: response.data.note,
                        progressList: response.data.progressList
                    })
                })
        }
    }, [exerciseId]);

    return (
        <>
            {isEditing ? (
                <form
                    onSubmit={handleSaveButtonClick}
                    className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6"
                >
                    {/* Input-fields */}
                    <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-4">
                        <h3 className="text-sm font-semibold text-zinc-100 mb-2">Edit Exercise</h3>

                        <input
                            name="name"
                            value={editExercise.name}
                            onChange={handleEditChange}
                            placeholder="Exercise Name"
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <input
                            name="note"
                            value={editExercise.note}
                            onChange={handleEditChange}
                            placeholder="Notes (optional)"
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4">
                        <ButtonWithIcon
                            icon="/goBack-icon.png"
                            type="button"
                            onClick={() => setIsEditing(false)}
                        />
                        <ButtonWithIcon
                            icon="/save-icon.png"
                            type="submit"
                        />
                    </div>
                </form>

            ) : (
                <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6">
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
