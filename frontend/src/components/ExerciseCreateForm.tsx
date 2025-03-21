import {FormEvent, useState} from "react";
import {Exercise} from "../types/Exercise.tsx";
import ButtonWithIcon from "./ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";


type ExerciseCreateFormProps = {
    createExercise: (newExercise: Exercise) => void
}

export default function ExerciseCreateForm({createExercise}: ExerciseCreateFormProps) {

    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [note, setNote] = useState<string>("");


    // button handlers
    const handleSubmit = (event: FormEvent)=> {
        event.preventDefault()
        const newExercise: Exercise = {
            name: name,
            note: note
        }
        createExercise(newExercise);
    }

    const handleBackButton = () => {
        navigate("/exercises");
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
                <ButtonWithIcon onSubmit={handleSubmit} icon={"add"} type={"submit"} />
            </form>
            <ButtonWithIcon onClick={handleBackButton} icon={"back"} type={"button"} />
        </>
    )
}
