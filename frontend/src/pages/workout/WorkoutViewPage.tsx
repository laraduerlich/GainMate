import {Workout} from "../../types/Workout.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useEffect, useState} from "react";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import List from "../../components/List.tsx";
import {AxiosResponse} from "axios";

type WorkoutViewProps = {
    workout: Workout | undefined,
    exercises: Exercise[],
    getWorkoutById: (id: string) => Promise<AxiosResponse>,
    updateWorkout: (updatedWorkout: Workout) => void,
    deleteWorkout: (id: string) => void
}

export default function WorkoutViewPage({workout, exercises, getWorkoutById, updateWorkout, deleteWorkout}: WorkoutViewProps) {

    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [editName, setEditName] = useState<string>(workout ? workout.name : "")
    const [idList, setIdList] = useState<string[]>(workout ? workout.exerciseIdList : [])

    // exercises form the workout
    const exerciseList: Exercise[] = exercises.filter((exercise: Exercise) =>
            exercise.id !== undefined && idList.includes(exercise.id)
    )

    // button handler
    const handleAddButtonClick = (exerciseId: string | undefined) => {
        if (exerciseId !== undefined) {
            setIdList([...idList, exerciseId])
        } else {
            console.error("Invalid ID for adding exercise.");
        }
    }

    const handleRemoveButtonClick = (exerciseId: string | undefined) => {
        if (exerciseId !== undefined) {
            setIdList(idList.filter(idExercise => idExercise !== exerciseId))
        } else {
            console.error("Invalid ID for removing exercise.");
        }
    }

    const handleSaveButtonClick = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const updatedWorkout: Workout = {
            id: id,
            name: editName,
            exerciseIdList: idList
        }

        updateWorkout(updatedWorkout)
        setIsEditing(false)
    }

    const handleEditButtonClick = () => {
        setIsEditing(true)
    }

    const handleDeleteButtonClick = () => {
        if (id !== undefined) {
            deleteWorkout(id);
        } else {
            console.error("Id is undefined")
        }
    }

    const handleBackButtonClick = () => {
        navigate("/workouts");
    }

    // Load workout
    useEffect(() => {
        if (id !== undefined){
            getWorkoutById(id)
                .then((response) => {
                    setEditName(response.data.name)
                    setIdList(response.data.exerciseIdList)
                })
        }

    }, [id]);

    return (
        <>
            {isEditing ? (
                <div>
                    <form onSubmit={handleSaveButtonClick}>
                        <div>
                            <input
                                name={"name"}
                                value={editName}
                                placeholder={workout?.name}
                                onChange={(event) => setEditName(event.target.value)}
                                className="bg-white text-black border border-gray-300 p-2 rounded-md"
                            />
                        </div>
                        <ButtonWithIcon icon={"save"} type={"submit"} />
                    </form>
                    {/* List of all exercises for creating workouts with remove button*/}
                    <div>
                        <List elements={exerciseList} use={"removeWorkout"} handelButtonClick={handleRemoveButtonClick}/>
                    </div>
                    {/* List of all exercises for creating workouts with add button*/}
                    <div>
                        <List elements={exercises} use={"addWorkout"} handelButtonClick={handleAddButtonClick}/>
                    </div>
                    <ButtonWithIcon icon={"back"} type={"button"} onClick={() => setIsEditing(false)} />
                </div>
            ) : (
                <div>
                    {workout? workout.name : ""}
                    <ButtonWithIcon icon={"edit"} type={"button"} onClick={handleEditButtonClick} />
                    <ButtonWithIcon icon={"delete"} type={"button"} onClick={handleDeleteButtonClick} />
                    <ul>
                        {exerciseList.map((exercise) => (
                            <li
                                key={exercise.id}
                            >
                                {exercise.name}
                            </li>
                        ))}
                    </ul>
                    <ButtonWithIcon icon={"back"} type={"button"} onClick={handleBackButtonClick} />
                </div>
            )}
        </>
    )
}
