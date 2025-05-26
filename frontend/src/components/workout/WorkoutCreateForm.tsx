import List from "../List.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {FormEvent, useState} from "react";
import ButtonWithIcon from "../ButtonWithIcon.tsx";
import {WorkoutDTO} from "../../types/Workout.tsx";
import {useNavigate} from "react-router-dom";

type WorkoutCreateFormProps = {
    exercises: Exercise[]
    createWorkout: (workout: WorkoutDTO) => void
}

export default function WorkoutCreateForm({exercises, createWorkout}: WorkoutCreateFormProps) {

    const navigate = useNavigate()

    const exerciseIds: (string | undefined)[] = exercises.map(exercise => exercise.id)
    const [addedIdList, setAddedIdList] = useState<string[]>([])
    const [allExerciseIdList, setAllExerciseIdList] = useState<(string | undefined)[]>(exerciseIds)
    const [name, setName] = useState<string>("")

    // List with added exercises for the workout
    const addedExercises: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && addedIdList.includes(exercise.id)
    )

    // List with all exercises
    const allExercises: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && allExerciseIdList.includes(exercise.id)
    )

    // button handler
    const handleAddButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            setAddedIdList([...addedIdList, id])
            setAllExerciseIdList(idExercise => idExercise.filter(idExercise => idExercise !== id))
        } else {
            console.error("Invalid ID for adding exercise.");
        }
    }

    const handleRemoveButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            setAddedIdList(addedIdList.filter(idExercise => idExercise !== id))
            setAllExerciseIdList([...allExerciseIdList, id])
        } else {
            console.error("Invalid ID for removing exercise.");
        }
    }

    const handleSaveButtonClick = (event: FormEvent) => {
        event.preventDefault();
        const newWorkout: WorkoutDTO = {
            name: name,
            exerciseIdList: addedIdList
        }
        createWorkout(newWorkout)
    }

    const handleBackButtonClick = () => {
        navigate("/workouts");
    }

    return (
        <>
            <form onSubmit={handleSaveButtonClick}>
                  <div>
                      <input
                        id={"name"}
                        name={"name"}
                        type={"text"}
                        placeholder={"name of the workout ..."}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                      />
                  </div>
                {/* List of all exercises for creating workouts with remove button*/}
                <div>
                    <List elements={addedExercises} use={"removeWorkout"} handelButtonClick={handleRemoveButtonClick}/>
                </div>
                {/* List of all exercises for creating workouts with add button*/}
                <div>
                    <List elements={allExercises} use={"addWorkout"} handelButtonClick={handleAddButtonClick}/>
                </div>
                <div className="mt-5 flex justify-center gap-4">
                    <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={handleBackButtonClick}/>
                    <ButtonWithIcon icon={"/save-icon.png"} type={"submit"} />
                </div>
            </form>
        </>
    )
}
