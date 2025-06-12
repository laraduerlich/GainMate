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
    const [exerciseIdList, setExerciseIdList] = useState<(string | undefined)[]>(exerciseIdsOfWorkout)

    // List with added exercises from the workout
    const addedExercises: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && addedIdList.includes(exercise.id)
    )

    // List with all exercises which are not yet in the workout
    const allExercisesOfWorkout: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && exerciseIdList.includes(exercise.id)
    )

    // button handler
    const handleAddButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            setAddedIdList([...addedIdList, id])
            setExerciseIdList(idExercise => idExercise.filter(idExercise => idExercise !== id))
        } else {
            console.error("Invalid ID for adding exercise.");
        }
    }

    const handleRemoveButtonClick = (id: string | undefined) => {
        if (id !== undefined) {
            setAddedIdList(addedIdList.filter(idExercise => idExercise !== id))
            setExerciseIdList([...exerciseIdList, id])
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

    // Load workout
    useEffect(() => {
        if (workoutId !== undefined){
            getWorkoutById(workoutId)
                .then((response) => {
                    setEditName(response.data.name)
                    setAddedIdList(response.data.exerciseIdList)
                })
        }
        getAllExercises()
    }, [workoutId]);

    return (
        <>
            {isEditing ? (
                <div>
                    <form onSubmit={handleSaveButtonClick}>
                        <div className="flex flex-row gap-4">
                            <div>
                                <input
                                    name={"name"}
                                    value={editName}
                                    placeholder={workout?.name}
                                    onChange={(event) => setEditName(event.target.value)}
                                    className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                                />
                            </div>
                            <div>
                                <select
                                    id={"icon"}
                                    name={"icon"}
                                    onChange={(event) => setEditIcon(event.target.value as "LEGS" | "ARMS" | "BACK" | "SHOULDERS" | "CHEST")}
                                    className="w-22 py-2 pl-3 text-sm pt-3 mt-2 p-4 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                                >
                                    <option value={"LEGS"}>legs</option>
                                    <option value={"ARMS"}>arms</option>
                                    <option value={"BACK"}>back</option>
                                    <option value={"SHOULDERS"}>shoulders</option>
                                    <option value={"CHEST"}>chest</option>
                                </select>
                            </div>
                        </div>
                        {/* List of all exercises for creating workouts with remove button*/}
                        <div>
                            <List elements={addedExercises} use={"removeWorkout"} handelButtonClick={handleRemoveButtonClick}/>
                        </div>
                        {/* List of all exercises for creating workouts with add button*/}
                        <div>
                            <List elements={allExercisesOfWorkout} use={"addWorkout"} handelButtonClick={handleAddButtonClick}/>
                        </div>
                        <div className="mt-5 flex justify-center gap-4">
                            <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={() => {
                                setIsEditing(false)
                                setAddedIdList(workout? workout.exerciseIdList : [])
                            }} />
                            <ButtonWithIcon icon={"/save-icon.png"} type={"submit"} />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="p-6 rounded-xl bg-zinc-500 shadow-xl text-zinc-800 max-w-xl mx-auto">
                    <h2 className="text-xl font-bold text-zinc-800 mb-4 text-center">
                        {workout? workout.name : ""}
                    </h2>
                    {/* Icon */}
                    {workout?.icon && (
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-blue-300 rounded-full flex items-center justify-center shadow-md">
                                <img
                                    src={`/icon/workout/${workout.icon}.png`}
                                    alt="icon"
                                    className="w-12 h-12"
                                />
                            </div>
                        </div>
                    )}

                    {/* Exercises */}
                    <ul className="list-disc space-y-2 text-left pl-6 text-zinc-800">
                        {addedExercises.map((exercise) => (
                            <li key={exercise.id}>{exercise.name}</li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="mt-8 flex justify-center gap-4">
                        <ButtonWithIcon icon="/goBack-icon.png" type="button" onClick={handleBackButtonClick} />
                        <ButtonWithIcon icon="/edit-icon.png" type="button" onClick={handleEditButtonClick} />
                        <ButtonWithIcon icon="/delete-icon.png" type="button" onClick={handleDeleteButtonClick} />
                    </div>
                </div>
            )}
        </>
    )
}
