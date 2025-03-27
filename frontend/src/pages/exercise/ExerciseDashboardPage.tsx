import {Exercise} from "../../types/Exercise.tsx";
import ExerciseList from "../../components/exercise/ExerciseList.tsx";
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

    const handleViewButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            navigate("/exercise/" + id)
        } else {
            console.error("Invalid ID for viewing exercise.");
        }
    }

    return (
        <>
            <h2>Dashboard Exercise</h2>
            <div>
                <ButtonWithIcon onClick={handleNewExerciseButtonClick} icon={"new"} type={"button"} />
                <ExerciseList exercises={exercises} use={"dashboard"} handelButtonClick={handleViewButtonClick}/>
            </div>
        </>
    )
}
