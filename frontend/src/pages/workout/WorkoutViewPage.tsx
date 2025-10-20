import {Workout, WorkoutDTO} from "../../types/Workout.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import List from "../../components/List.tsx";
import {AxiosResponse} from "axios";

type WorkoutViewProps = {
    workout: Workout | undefined
    exercises: Exercise[]
    getAllExercises: () => void
    getWorkoutById: (id: string) => Promise<AxiosResponse>
    updateWorkout: (updatedWorkout: WorkoutDTO, id: string) => void
    deleteWorkout: (id: string) => void
}

export default function WorkoutViewPage({workout, exercises, getAllExercises,getWorkoutById, updateWorkout, deleteWorkout}: WorkoutViewProps) {

    const {workoutId} = useParams<{workoutId: string}>()
    const navigate = useNavigate()

    // IdList with all exercise ids, which are not yet saved in the workout
    const exerciseIdsOfWorkout: (string | undefined)[] = exercises
        .filter(exercise => exercise.id && !workout?.exerciseIdList.includes(exercise.id))
        .map(exercise => exercise.id)

    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState<string>(workout ? workout.name : "")
    const [editIcon, setEditIcon] = useState(workout ? workout.icon : "LEGS")
    const [addedIdList, setAddedIdList] = useState<string[]>(workout? workout.exerciseIdList : [])
    const [exerciseIdListNotInWorkout, setExerciseIdListNotInWorkout] = useState<(string | undefined)[]>(exerciseIdsOfWorkout)

    // List with added exercises from the workout
    const addedExercises: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && addedIdList.includes(exercise.id)
    )

    // List with all exercises which are not yet in the workout
    const allExercisesNotInWorkout: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && exerciseIdListNotInWorkout.includes(exercise.id)
    )

    // button handler
    const handleAddButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            setAddedIdList([...addedIdList, id])
            setExerciseIdListNotInWorkout(idExercise => idExercise.filter(idExercise => idExercise !== id))
        } else {
            console.error("Invalid ID for adding exercise.");
        }
    }

    const handleRemoveButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            setAddedIdList(addedIdList.filter(idExercise => idExercise !== id))
            setExerciseIdListNotInWorkout([...exerciseIdListNotInWorkout, id])
        } else {
            console.error("Invalid ID for removing exercise.");
        }
    }

    const handleSaveButtonClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const updatedWorkout: WorkoutDTO = {
            name: editName,
            icon: editIcon,
            exerciseIdList: addedIdList
        }
        if (workoutId !== undefined) {
            updateWorkout(updatedWorkout, workoutId)
            setIsEditing(false)
        }
    }

    const handleEditButtonClick = () => {
        setIsEditing(true)
    }

    const handleDeleteButtonClick = () => {
        if (workoutId !== undefined) {
            deleteWorkout(workoutId);
        } else {
            console.error("Id is undefined")
        }
    }

    const handleBackButtonClick = () => {
        navigate("/workouts")
    }

    // Load workout & all exercises
    useEffect(() => {
        getAllExercises()

        if (workoutId !== undefined){
            getWorkoutById(workoutId)
                .then((response) => {
                    setEditName(response.data.name)
                    setAddedIdList(response.data.exerciseIdList)
                })
        }
    }, [workoutId]);

    return (
        <>
            {isEditing ? (
                <div>
                    <form
                        onSubmit={handleSaveButtonClick}
                        className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6"
                    >
                        {/* Input-fields */}
                        <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-4">
                            <h3 className="text-sm font-semibold text-zinc-100 mb-2">Edit Workout</h3>

                                <input
                                    name={"name"}
                                    value={editName}
                                    placeholder={workout?.name}
                                    onChange={(event) => setEditName(event.target.value)}
                                    className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />

                                <select
                                    id={"icon"}
                                    name={"icon"}
                                    onChange={(event) => setEditIcon(event.target.value as "LEGS" | "ARMS" | "BACK" | "SHOULDERS" | "CHEST")}
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
                        <div>
                            <List elements={addedExercises} use={"removeWorkout"} handelButtonClick={handleRemoveButtonClick}/>
                        </div>

                        {/* Exercises: All, which not yet in the workout */}
                        <div>
                            <List elements={allExercisesNotInWorkout} use={"addWorkout"} handelButtonClick={handleAddButtonClick}/>
                        </div>

                        {/* Buttons */}
                        <div className="mt-5 flex justify-center gap-4">
                            <ButtonWithIcon
                                icon={"/goBack-icon.png"}
                                type={"button"}
                                onClick={() => {
                                    setIsEditing(false)
                                    setAddedIdList(workout? workout.exerciseIdList : [])}}
                            />
                            <ButtonWithIcon
                                icon={"/save-icon.png"}
                                type={"submit"}
                            />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6">
                    {/* Title & Icon Section */}
                    <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-4">
                        <h2 className="text-lg font-bold text-zinc-100 text-center">
                            {workout?.name || ""}
                        </h2>
                        {workout?.icon && (
                            <div className="flex justify-center">
                                <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center shadow-md">
                                    <img
                                        src={`/icon/workout/${workout.icon}.png`}
                                        alt="Workout Icon"
                                        className="w-8 h-8"
                                    />
                                </div>
                            </div>
                        )}
                        {/* Exercise List */}
                        <ul className="list-disc pl-5 space-y-1 text-sm text-left text-zinc-200">
                            {addedExercises.map((exercise) => (
                                <li key={exercise.id}>{exercise.name}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-center gap-4">
                        <ButtonWithIcon
                            icon="/goBack-icon.png"
                            type="button"
                            onClick={handleBackButtonClick}
                        />
                        <ButtonWithIcon
                            icon="/edit-icon.png"
                            type="button"
                            onClick={handleEditButtonClick}
                        />
                        <ButtonWithIcon
                            icon="/delete-icon.png"
                            type="button"
                            onClick={handleDeleteButtonClick}
                        />
                    </div>
                </div>

            )}
        </>
    )
}
