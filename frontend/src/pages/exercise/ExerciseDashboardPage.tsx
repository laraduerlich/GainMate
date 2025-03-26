import {Exercise} from "../../types/Exercise.tsx";
import ExerciseList from "../../components/exercise/ExerciseList.tsx";

type ExerciseDashboardProps = {
    exercises: Exercise[]
}

export default function ExerciseDashboardPage({exercises}: ExerciseDashboardProps) {

    return (
        <>
            <h2>Dashboard Exercise</h2>
            <div>
                <ExerciseList exercises={exercises} />
            </div>
        </>
    )
}
