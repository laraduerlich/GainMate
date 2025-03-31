import {useState} from "react";
import {Exercise} from "../types/Exercise.tsx";
import Searchbar from "./Searchbar.tsx";
import ButtonWithIcon from "./ButtonWithIcon.tsx";
import {Workout} from "../types/Workout.tsx";
import {useNavigate} from "react-router-dom";

type ExerciseListProps = {
    elements: Exercise[] | Workout[],
    use: "dashboardExercise" | "dashboardWorkouts" | "addWorkout" | "removeWorkout" | "startWorkout",
    handelButtonClick?: (id: string | undefined) => void
}

export default function List({elements, use, handelButtonClick}: ExerciseListProps) {

    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');

    // Filtered elements based on search input
    const filteredElements: Exercise[] | Workout[] = elements.filter(element =>
    element.name.toLowerCase().includes(searchInput.toLowerCase()))


    // button handler
    const handleViewExerciseButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            navigate("/exercise/" + id)
        } else {
            console.error("Invalid ID for viewing exercise.");
        }
    }

    const handleViewWorkoutButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            navigate("/workout/" + id)
        } else {
            console.error("Invalid ID for viewing workout.");
        }
    }

    const handleStartWorkoutButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            navigate("/start-workout/" + id)
        } else {
            console.error("Invalid ID for starting workout.");
        }
    }

    // to add exercise id to a workout
    const handleAddButtonClick = (id: string | undefined) => {
        if (handelButtonClick) {
            handelButtonClick(id)
        }
    }

    // to remove exercise id to a workout
    const handleRemoveButtonClick = (id: string | undefined) => {
        if (handelButtonClick) {
            handelButtonClick(id)
        }
    }

    // to start an exercise
    const handleStartButtonClick = (id: string | undefined) => {
        if (handelButtonClick) {
            handelButtonClick(id)
        }
    }

    return (
        <>
            <div>
                <div>
                    <Searchbar value={searchInput} onChange={setSearchInput} />
                </div>
                <div>
                    {/* List of all exercises with view and add button */}
                    <ul>
                        {filteredElements.map((element) => (
                            <li
                                key={element.id}>
                                <span>
                                    {element.name}
                                </span>
                                <div>
                                    {(use === "dashboardExercise") ? (
                                                <ButtonWithIcon icon={"view"} type={"button"} onClick={() => {handleViewExerciseButtonClick(element.id)}} />)

                                        :(use === "dashboardWorkouts") ? (
                                            <div>
                                                <ButtonWithIcon icon={"start"} type={"button"} onClick={() => {handleStartWorkoutButtonClick(element.id)}} />
                                                <ButtonWithIcon icon={"view"} type={"button"} onClick={() => {handleViewWorkoutButtonClick(element.id)}} />
                                            </div>)

                                        :(use === "addWorkout") ? (
                                                <ButtonWithIcon icon={"add"} type={"button"} onClick={() => {handleAddButtonClick(element.id)}} />)

                                        :(use === "removeWorkout") ? (
                                                <ButtonWithIcon icon={"remove"} type={"button"} onClick={() => {handleRemoveButtonClick(element.id)}} />)

                                        :(use === "startWorkout") ? (
                                                <ButtonWithIcon icon={"start"} type={"button"} onClick={() => {handleStartButtonClick(element.id)}} />)
                                        : null }
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
