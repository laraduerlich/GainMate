import {Workout} from "../../types/Workout.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import WorkoutExerciseList from "../../components/workout/WorkoutExerciseList.tsx";
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
    const [editWorkout, setEditWorkout] = useState<Workout>(workout)

    // exercises form the workout
    const exerciseList: Exercise[] = exercises.filter(exercise =>
        exercise.id !== undefined && workout.exerciseIdList.includes(exercise.id)
    )

    const handleEditChange = (event) => {
        setEditWorkout({
            ...editWorkout,
            // key (name) of the input is dynamically set
            [event.target.name]: event.target.value,
        })
    }

    // button handler
    const handleAddButtonClick = (exerciseId: string | undefined) => {
        if (exerciseId !== undefined) {
            setEditWorkout({
                ...editWorkout,
                exerciseIdList: [...workout.exerciseIdList, exerciseId]
            })
        }
    }

    const handleRemoveButtonClick = (exerciseId: string | undefined) => {
        if (exerciseId !== undefined) {
            setEditWorkout({
                ...editWorkout,
                exerciseIdList: workout.exerciseIdList.filter(idExercise => idExercise !== id)
            })
        }
    }

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        updateWorkout(editWorkout)
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
                                onChange={handleEditChange}
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
                    <WorkoutExerciseList exerciseList={exerciseList} />
                </div>
            )}
        </>
    )
}
