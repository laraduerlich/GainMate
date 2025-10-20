import {FormEvent, useState} from "react";
import {ExerciseDTO} from "../../types/Exercise.tsx";
import ButtonWithIcon from "../ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";

type ExerciseCreateFormProps = {
    createExercise: (newExercise: ExerciseDTO) => void
}

export default function ExerciseCreateForm({createExercise}: ExerciseCreateFormProps) {

    const navigate = useNavigate()

    const [name, setName] = useState<string>("");
    const [note, setNote] = useState<string>("");

    // button handlers
    const handleSubmit = (event: FormEvent)=> {
        event.preventDefault()
        const newExercise: ExerciseDTO = {
            name: name,
            note: note
        }
        createExercise(newExercise);
    }

    const handleBackButtonClick = () => {
        navigate("/exercises");
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6"
            >
                {/* Input-fields */}
                <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-4">
                    <h3 className="text-sm font-semibold text-zinc-100 mb-2">New Exercise</h3>

                    <input
                        id={"name"}
                        name={"name"}
                        type={"text"}
                        placeholder={"name of the exercise ..."}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        id={"note"}
                        name={"note"}
                        type={"text"}
                        placeholder={"notes ..."}
                        onChange={(event) => setNote(event.target.value)}
                        className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Buttons */}
                <div className="mt-5 flex justify-center gap-4">
                    <ButtonWithIcon
                        icon={"/goBack-icon.png"}
                        type={"button"}
                        onClick={handleBackButtonClick}
                    />
                    <ButtonWithIcon
                        onSubmit={handleSubmit}
                        icon={"/save-icon.png"}
                        type={"submit"}
                    />
                </div>
            </form>
        </>
    )
}
