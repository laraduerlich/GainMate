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

    const [workout, setWorkout] = useState<WorkoutDTO>({
        name: "",
        icon: "LEGS",
        exerciseIdList: [],
        dateList: []
    })
    const exerciseIds: (string | undefined)[] = exercises.map(exercise => exercise.id)
    const [addedIdList, setAddedIdList] = useState<string[]>([])
    const [allExerciseIdList, setAllExerciseIdList] = useState<(string | undefined)[]>(exerciseIds)

    // List with added exercises for the workout
    const addedExercises: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && addedIdList.includes(exercise.id)
    )

    // List with all exercises
    const allExercises: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && allExerciseIdList.includes(exercise.id)
    )

    // button handler
    const handleChange = (event: any) => {
        setWorkout({
            ...workout,
            // key (name) of the input is dynamically set
            [event.target.name]: event.target.value,
        })
    }

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
            name: workout.name,
            icon: workout.icon,
            exerciseIdList: addedIdList
        }
        createWorkout(newWorkout)
    }

    const handleBackButtonClick = () => {
        navigate("/workouts");
    }

    return (
        <>
            <form
                onSubmit={handleSaveButtonClick}
                className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6"
            >
                {/* Input-fields */}
                <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-4">
                    <h3 className="text-sm font-semibold text-zinc-100 mb-2">New Workout</h3>

                        <input
                            id={"name"}
                            name={"name"}
                            type={"text"}
                            placeholder={"name of the workout ..."}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />

                        <select
                            id={"icon"}
                            name={"icon"}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value={"LEGS"}>legs</option>
                            <option value={"ARMS"}>arms</option>
                            <option value={"BACK"}>back</option>
                            <option value={"SHOULDERS"}>shoulders</option>
                            <option value={"CHEST"}>chest</option>
                        </select>
                </div>

                {/* Exercises: Added */}
                {addedExercises && addedExercises.length > 0  && (
                    <div>
                        <List elements={addedExercises} use={"removeWorkout"} handelButtonClick={handleRemoveButtonClick}/>
                    </div>
                )}

                {/* Exercises: All */}
                {allExercises && allExercises.length > 0 && (
                    <div>
                        <List elements={allExercises} use={"addWorkout"} handelButtonClick={handleAddButtonClick}/>
                    </div>
                )}

                {/* Buttons */}
                <div className="mt-5 flex justify-center gap-4">
                    <ButtonWithIcon
                        icon={"/goBack-icon.png"}
                        type={"button"}
                        onClick={handleBackButtonClick}
                    />
                    <ButtonWithIcon
                        icon={"/save-icon.png"}
                        type={"submit"}
                    />
                </div>
            </form>
        </>
    )
}
