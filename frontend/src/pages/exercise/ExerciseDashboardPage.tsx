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
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                my exercises
            </h2>
            <div className="absolute right-2 top-20">
                <ButtonWithIcon onClick={handleNewExerciseButtonClick} icon={"/new-icon.png"} type={"button"} />
            </div>
            <div>
                <List elements={exercises} use={"dashboardExercise"} />
            </div>
        </>
    )
}
