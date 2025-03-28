import {Exercise} from "../../types/Exercise.tsx";
import ButtonWithIcon from "../ButtonWithIcon.tsx";

type WorkoutExerciseListProps = {
    exerciseList: Exercise[],
    handleRemoveButtonClick?: (id: string | undefined) => void
}

export default function WorkoutExerciseList({exerciseList, handleRemoveButtonClick}: WorkoutExerciseListProps) {

    return (
        <>
            <div>
                <ul>
                    {exerciseList.map((exercise: Exercise) => (
                        <li
                            key={exercise.id}>
                                    <span>
                                        {exercise.name}
                                    </span>
                            <div>
                                <ButtonWithIcon icon={"remove"} type={"button"} onClick={() => {
                                    if (handleRemoveButtonClick) {
                                        handleRemoveButtonClick(exercise.id)
                                    }}} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
