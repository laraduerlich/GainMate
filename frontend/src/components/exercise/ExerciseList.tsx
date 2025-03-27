import {useState} from "react";
import {Exercise} from "../../types/Exercise.tsx";
import Searchbar from "../Searchbar.tsx";
import ButtonWithIcon from "../ButtonWithIcon.tsx";

type ExerciseListProps = {
    exercises: Exercise[],
    use: "dashboard" | "workout",
    handelButtonClick: (id: string | undefined) => void
}

export default function ExerciseList({exercises, use, handelButtonClick}: ExerciseListProps) {

    const [searchInput, setSearchInput] = useState('');

    // Filtered exercises based on search input
    const filteredExercises: Exercise[] = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchInput.toLowerCase()))


    // button handler
    const handleViewButtonClick = (id: string | undefined) => {
        handelButtonClick(id)
    }

    const handleAddButtonClick = (id: string | undefined) => {
        handelButtonClick(id)
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
                        {filteredExercises.map((exercise) => (
                            <li
                                key={exercise.id}>
                                <span>
                                    {exercise.name}
                                </span>
                                <div>
                                    {(use === "dashboard") ? (
                                        <ButtonWithIcon icon={"view"} type={"button"} onClick={() => {handleViewButtonClick(exercise.id)}} />)

                                    :(use === "workout") ? (
                                        <ButtonWithIcon icon={"add"} type={"button"} onClick={() => {handleAddButtonClick(exercise.id)}} />)

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
