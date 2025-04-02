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
    getWorkoutById: (id: string) => Promise<AxiosResponse>,
}

export default function WorkoutRunPage({workout, exercises, getWorkoutById}: WorkoutRunProps) {

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

    }, [id]);

    return (
        <>
            <div>
                {workout ? workout.name : ""}
            </div>
            <div>
                <List elements={openExerciseList} use={"inWorkout"} handelButtonClick={handleStartButtonClick} />
            </div>
            <ButtonWithIcon icon={"finish"} type={"button"} onClick={handleFinishedButtonClick}/>
            <ButtonWithIcon icon={"back"} type={"button"} onClick={handleBackButtonClick} />
        </>
    )
}
