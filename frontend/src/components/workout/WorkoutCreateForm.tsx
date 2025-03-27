import ExerciseList from "../exercise/ExerciseList.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {FormEvent, useState} from "react";
import ButtonWithIcon from "../ButtonWithIcon.tsx";
import {Workout} from "../../types/Workout.tsx";

type WorkoutCreateFormProps = {
    exercises: Exercise[]
    createWorkout: (workout: Workout) => void
}

export default function WorkoutCreateForm({exercises, createWorkout}: WorkoutCreateFormProps) {

    const [idList, setIdList] = useState<string[]>([])
    const [name, setName] = useState<string>("")

    // added exercises for creating a workout
    const addedExercises: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && idList.includes(exercise.id)
    )

    // button handler
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

    const handleSaveButtonClick = (event: FormEvent) => {
        event.preventDefault();

        const newWorkout: Workout = {
            name: name,
            exerciseIdList: idList
        }

        createWorkout(newWorkout)
    }

    return (
        <>
            <div>
                <form onSubmit={handleSaveButtonClick}>
                    <input
                        id={"name"}
                        name={"name"}
                        type={"text"}
                        placeholder={"name of the workout ..."}
                        onChange={(event) => setName(event.target.value)}
                    />
                </form>
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
                <ButtonWithIcon icon={"save"} type={"submit"} />
                <div>
                    <ExerciseList exercises={exercises} use={"workout"} handelButtonClick={handleAddButtonClick} />
                </div>
            </div>
        </>
    )
}
