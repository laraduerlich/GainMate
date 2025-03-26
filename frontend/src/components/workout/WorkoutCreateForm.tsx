import ExerciseList from "../exercise/ExerciseList.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {useState} from "react";
import ButtonWithIcon from "../ButtonWithIcon.tsx";

type WorkoutCreateFormProps = {
    exercises: Exercise[]
}

export default function WorkoutCreateForm({exercises}: WorkoutCreateFormProps) {

    const [idList, setIdList] = useState<string[]>([])

    // added exercises for creating a workout
    const addedExercises: Exercise[] = exercises.filter(exercise => {
        if (exercise.id !==undefined) {
            idList.includes(exercise.id)
        }
    })

    const handleAddButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            setIdList([...idList, id])
        } else {
            console.error("Invalid ID for adding exercise.");
        }
    }
    const handleRemoveButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            setIdList(idList.filter(idExercise => idExercise !== id))
        } else {
            console.error("Invalid ID for removing exercise.");
        }
    }

    
    return (
        <>
            <div>
                {/* List of all exercises for creating workouts with remove button*/}
                <div>
                    <ul>
                        {addedExercises.map((exercise: Exercise) => (
                            <li
                                key={exercise.id}>
                                <span>
                                    {exercise.name}
                                </span>
                                <div>
                                    <ButtonWithIcon icon={"remove"} type={"button"} onClick={() => {handleRemoveButtonClick(exercise.id)}} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ExerciseList exercises={exercises} use={"workout"} handelButtonClick={handleAddButtonClick} />
                </div>
            </div>
        </>
    )
}
