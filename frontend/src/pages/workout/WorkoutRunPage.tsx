import {Workout, WorkoutDTO} from "../../types/Workout.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {AxiosResponse} from "axios";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import List from "../../components/List.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";

type WorkoutRunProps = {
    workout: Workout | undefined,
    exercises: Exercise[],
    getAllExercises: () => void
    getWorkoutById: (id: string) => Promise<AxiosResponse>,
    updateWorkout: (updatedWorkout: WorkoutDTO, id: string) => void
}

export default function WorkoutRunPage({workout, exercises, getAllExercises, getWorkoutById, updateWorkout}: WorkoutRunProps) {

    const {workoutId} = useParams<{workoutId: string}>()
    const navigate = useNavigate()

    const [formattedDate, setFormattedDate] = useState("");

    // exercises form the workout
    const openExerciseList: Exercise[] = exercises.filter((exercise: Exercise) =>
        exercise.id !== undefined && workout?.exerciseIdList.includes(exercise.id)
    )

    // button handler
    const handleStartButtonClick = (exerciseId: string | undefined) => {
        if (exerciseId !== undefined) {
            navigate("/workout/"+ workoutId + "/exercise/" + exerciseId)
        }
    }

    const handleFinishedButtonClick = () => {
        if (workout !== undefined && workoutId !== undefined) {
            const workoutDTO: WorkoutDTO = {
                name: workout.name,
                icon: workout.icon,
                exerciseIdList: workout.exerciseIdList,
                dateList: [...(workout.dateList || []), formattedDate]
            }
            console.log(workoutDTO.dateList)
            updateWorkout(workoutDTO, workoutId)
        }
        navigate("/workouts")
    }

    const handleBackButtonClick = () => {
        navigate("/workouts")
    }

    // Load workout, all exercises & current date
    useEffect(() => {
        if (workoutId !== undefined){
            getWorkoutById(workoutId)
        }

        getAllExercises()

        // Get current date
        const date = new Date();

        // Day and month always with leading zero if they are single-digit
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        // Format "YYYY-MM-DD"
        const localDate = `${year}-${month}-${day}`;
        setFormattedDate(localDate)
    }, [workoutId]);

    return (
        <>
            <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                {workout? workout.name : ""}
            </h2>
            <div>
                <List elements={openExerciseList} use={"inWorkout"} handelButtonClick={handleStartButtonClick} />
            </div>
            <div className="mt-5 flex justify-center gap-4">
                <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={handleBackButtonClick} />
                <ButtonWithIcon icon={"/finish-icon.png"} type={"button"} onClick={handleFinishedButtonClick}/>
            </div>
        </>
    )
}
