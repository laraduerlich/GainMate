import {Workout} from "../../types/Workout.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import List from "../../components/List.tsx";

type WorkoutViewProps = {
    workout: Workout,
    exercises: Exercise[],
    getWorkoutById: (id: string) => void,
    updateWorkout: (updatedWorkout: Workout) => void
}

export default function WorkoutViewPage({workout, exercises, getWorkoutById, updateWorkout}: WorkoutViewProps) {

    const {id} = useParams<{id: string}>();
    const [isEditing, setIsEditing] = useState(false);
    const [editName, setEditName] = useState<string>(workout.name)
    const [idList, setIdList] = useState<string[]>(workout.exerciseIdList)

    // exercises form the workout
    const exerciseList: Exercise[] = exercises.filter(exercise =>
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

    const handleSaveButtonClick = (event: any) => {
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

    // Load workout
    useEffect(() => {
        if (id !== undefined){
            getWorkoutById(id)
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
                                value={workout.name}
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
                </div>
            ) : (
                <div>
                    <p>{workout.name}</p>
                    <ButtonWithIcon icon={"edit"} type={"button"} onClick={handleEditButtonClick} />
                    <ul>
                        {exerciseList.map((exercise) => (
                            <li
                                key={exercise.id}
                            >
                                {exercise.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    )
}
