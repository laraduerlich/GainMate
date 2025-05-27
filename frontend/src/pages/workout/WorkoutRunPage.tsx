import {Workout} from "../../types/Workout.tsx";
import {Exercise} from "../../types/Exercise.tsx";
import {AxiosResponse} from "axios";
import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import List from "../../components/List.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";

type WorkoutRunProps = {
    workout: Workout | undefined,
    exercises: Exercise[],
    getAllExercises: () => void
    getWorkoutById: (id: string) => Promise<AxiosResponse>,
}

export default function WorkoutRunPage({workout, exercises, getAllExercises, getWorkoutById}: WorkoutRunProps) {

    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()

    // exercises form the workout
    const openExerciseList: Exercise[] = exercises.filter((exercise: Exercise) =>
        exercise.id !== undefined && workout?.exerciseIdList.includes(exercise.id)
    )

    // button handler
    const handleStartButtonClick = (exerciseId: string | undefined) => {
        if (exerciseId !== undefined) {
            navigate("/workout/"+ id + "/exercise/" + exerciseId)
        }
    }

    const handleFinishedButtonClick = () => {
        navigate("/workouts")
    }

    const handleBackButtonClick = () => {
        navigate("/workouts")
    }

    // Load workout
    useEffect(() => {
        if (id !== undefined){
            getWorkoutById(id)
        }
        getAllExercises()
    }, [id]);

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
