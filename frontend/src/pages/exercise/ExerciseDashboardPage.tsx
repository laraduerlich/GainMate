import {Exercise} from "../../types/Exercise.tsx";
import List from "../../components/List.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";

type ExerciseDashboardProps = {
    exercises: Exercise[]
}

export default function ExerciseDashboardPage({exercises}: ExerciseDashboardProps) {

    const navigate = useNavigate();

    // button handler
    const handleNewExerciseButtonClick = () => {
        navigate("/exercise/new");
    }

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
