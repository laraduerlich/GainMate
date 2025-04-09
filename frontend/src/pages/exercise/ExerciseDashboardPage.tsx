import {Exercise} from "../../types/Exercise.tsx";
import List from "../../components/List.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

type ExerciseDashboardProps = {
    exercises: Exercise[]
    getAllExercises: () => void
}

export default function ExerciseDashboardPage({exercises, getAllExercises}: ExerciseDashboardProps) {

    const navigate = useNavigate()

    // button handler
    const handleNewExerciseButtonClick = () => {
        navigate("/exercise/new")
    }


    // fetch all exercises
    useEffect(() => {
        getAllExercises()
    }, []);

    return (
        <>
            <h2>Dashboard Exercise</h2>
            <div>
                <ButtonWithIcon onClick={handleNewExerciseButtonClick} icon={"new"} type={"button"} />
                <List elements={exercises} use={"dashboardExercise"} />
            </div>
        </>
    )
}
