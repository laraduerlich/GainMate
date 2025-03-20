import {useState} from "react";
import {Exercise} from "../types/Exercise.tsx";
import Searchbar from "./Searchbar.tsx";

type ExerciseListProps = {
    exercises: Exercise[]
}

export default function ExerciseList({exercises}: ExerciseListProps) {

    const [searchInput, setSearchInput] = useState('');

    // Filtered exercises based on search input
    const filteredExercises: Exercise[] = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchInput.toLowerCase()))

    return (
        <>
            <div>
                <div>
                    <Searchbar value={searchInput} onChange={setSearchInput} />
                </div>
                <div>
                    {/* List of all exercises */}
                    <ul>
                        {filteredExercises.map((exercise) => (
                            <li
                                key={exercise.id}>
                                <span>
                                    {exercise.name}
                                </span>
                                <div>
                                    {/* Button for view */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
