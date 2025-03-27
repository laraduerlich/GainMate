import {useState} from "react";
import {Exercise} from "../types/Exercise.tsx";
import Searchbar from "./Searchbar.tsx";
import ButtonWithIcon from "./ButtonWithIcon.tsx";
import {Workout} from "../types/Workout.tsx";

type ExerciseListProps = {
    elements: Exercise[] | Workout[],
    use: "dashboard" | "workout",
    handelButtonClick: (id: string | undefined) => void
}

export default function List({elements, use, handelButtonClick}: ExerciseListProps) {

    const [searchInput, setSearchInput] = useState('');

    // Filtered exercises based on search input
    const filteredElements: Exercise[] | Workout[] = elements.filter(element =>
    element.name.toLowerCase().includes(searchInput.toLowerCase()))


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
                        {filteredElements.map((element) => (
                            <li
                                key={element.id}>
                                <span>
                                    {element.name}
                                </span>
                                <div>
                                    {(use === "dashboard") ? (
                                        <ButtonWithIcon icon={"view"} type={"button"} onClick={() => {handleViewButtonClick(element.id)}} />)

                                    :(use === "workout") ? (
                                        <ButtonWithIcon icon={"add"} type={"button"} onClick={() => {handleAddButtonClick(element.id)}} />)

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
