import WorkoutCreateForm from "../../components/workout/WorkoutCreateForm.tsx";
import {Exercise} from "../../types/Exercise.tsx";

type WorkoutCreatePageProps = {
    exercises: Exercise[]
}

export default function WorkoutCreatePage({exercises}: WorkoutCreatePageProps) {

    return (
        <>
            <WorkoutCreateForm exercises={exercises}/>
        </>
    )
}
