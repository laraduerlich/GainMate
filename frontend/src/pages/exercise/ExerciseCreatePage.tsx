import ExerciseCreateForm from "../../components/exercise/ExerciseCreateForm.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";

type ExerciseCreateProps = {
    createExercise: (newExercise: Exercise) => void
}

export default function ExerciseCreatePage({createExercise}: ExerciseCreateProps) {

    const navigate = useNavigate()

    // button handler
    const handleBackButtonClick = () => {
        navigate("/exercises")
    }

    return (
        <>
            <h2>Create a Exercise</h2>
            <ExerciseCreateForm createExercise={createExercise} />
            <ButtonWithIcon icon={"back"} type={"button"} onClick={handleBackButtonClick} />

        </>
    )
}
