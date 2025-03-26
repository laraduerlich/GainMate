import ButtonWithIcon from "../ButtonWithIcon.tsx";
import {useNavigate} from "react-router-dom";

export default function WorkoutList() {

    const navigate = useNavigate();

    // button handler
    const handleNewWorkoutButtonClick = () => {
        navigate("/workout/new")
    }

    return (
        <>
            <div>

                <ButtonWithIcon onClick={handleNewWorkoutButtonClick} icon={"new"} type={"button"} />
            </div>
        </>
    )
}
