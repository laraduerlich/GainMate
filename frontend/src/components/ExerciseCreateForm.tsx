import {FormEvent, useState} from "react";
import {Exercise} from "../types/Exercise.tsx";


type ExerciseCreateFormProps = {
    createExercise: (newExercise: Exercise) => void
}

export default function ExerciseCreateForm({createExercise}: ExerciseCreateFormProps) {

    const [name, setName] = useState<string>("");
    const [note, setNote] = useState<string>("");

    const handleSubmit = (event: FormEvent)=> {
        event.preventDefault()
        const newExercise: Exercise = {
            name: name,
            note: note
        }
        createExercise(newExercise);
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
                    />
                    <input
                        id={"note"}
                        name={"note"}
                        type={"text"}
                        placeholder={"notes ..."}
                        onChange={(event) => setNote(event.target.value)}
                    />
                </div>
                <button type="submit">Add</button>
            </form>
        </>
    )
}
