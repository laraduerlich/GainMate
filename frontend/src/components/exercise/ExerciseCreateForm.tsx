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
        navigate("/workouts");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        id={"name"}
                        name={"name"}
                        type={"text"}
                        placeholder={"name of the exercise ..."}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                    />
                    <input
                        id={"note"}
                        name={"note"}
                        type={"text"}
                        placeholder={"notes ..."}
                        onChange={(event) => setNote(event.target.value)}
                        className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                    />
                </div>
                <div className="mt-5 flex justify-center gap-4">
                    <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={handleBackButtonClick} />
                    <ButtonWithIcon onSubmit={handleSubmit} icon={"/save-icon.png"} type={"submit"} />
                </div>
            </form>
        </>
    )
}
