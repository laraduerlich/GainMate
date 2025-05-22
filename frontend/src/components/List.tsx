import {useState} from "react";
import {Exercise} from "../types/Exercise.tsx";
import Searchbar from "./Searchbar.tsx";
import ButtonWithIcon from "./ButtonWithIcon.tsx";
import {Workout} from "../types/Workout.tsx";
import {useNavigate} from "react-router-dom";

type ExerciseListProps = {
    elements: Exercise[] | Workout[],
    use: "dashboardExercise" | "dashboardWorkouts" | "addWorkout" | "removeWorkout" | "inWorkout",
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
                <div className="flex flex-col sm:flex-row items-center w-full max-w-3xl mx-auto my-6 space-y-4 sm:space-y-0 sm:space-x-4">
                    {(elements.length != 0) ? (
                        <Searchbar value={searchInput} onChange={setSearchInput} />
                    ) : null}
                </div>
                <div>
                    {/* List of all exercises with view and add button */}
                    <ul className="flex flex-col gap-4 w-full">
                        {filteredElements.map((element) => (
                            <li
                                key={element.id}
                                className="w-full max-w-md px-4 py-3 flex items-center gap-20 bg-zinc-500 rounded-xl shadow-sm backdrop-blur-md hover:bg-zinc-300 transition-colors duration-200">
                                <span className="flex-grow text-zinc-800 text-base font-medium truncate">
                                    {element.name}
                                </span>
                                <div className="ml-auto shrink-0">
                                    {(use === "dashboardExercise") ? (
                                                <ButtonWithIcon icon={"/view-icon.png"} type={"button"} onClick={() => {handleViewExerciseButtonClick(element.id)}} />)

                                        :(use === "dashboardWorkouts") ? (
                                            <div className="flex justify-center gap-2">
                                                <ButtonWithIcon icon={"/start-icon.png"} type={"button"} onClick={() => {handleStartWorkoutButtonClick(element.id)}} />
                                                <ButtonWithIcon icon={"/view-icon.png"} type={"button"} onClick={() => {handleViewWorkoutButtonClick(element.id)}} />
                                            </div>)

                                        :(use === "addWorkout") ? (
                                                <ButtonWithIcon icon={"/add-icon.png"} type={"button"} onClick={() => {handleAddButtonClick(element.id)}} />)

                                        :(use === "removeWorkout") ? (
                                                <ButtonWithIcon icon={"/remove-icon.png"} type={"button"} onClick={() => {handleRemoveButtonClick(element.id)}} />)

                                        :(use === "inWorkout") ? (
                                                <ButtonWithIcon icon={"/start-icon.png"} type={"button"} onClick={() => {handleStartButtonClick(element.id)}} />)
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
