import {Exercise} from "../../types/Exercise.tsx";
import {Progress} from "../../types/Progress.tsx";
import {Sets} from "../../types/Set.tsx";

type ExerciseCardProps = {
    exercise: Exercise,
}

export default function ExerciseCard({exercise}: ExerciseCardProps) {


    return (
        <>
            <div>
                <p>{exercise.name}</p>
                <p>{exercise.note}</p>
                <ul>
                    {exercise.progressList?.map((progress: Progress) =>(
                        <li
                            key={progress.date}>
                            {progress.date}
                            <ul>
                                {progress.sets.map((oneSet: Sets)=> (
                                    <li
                                        key={`${oneSet.repetition}-${oneSet.weight}`}>
                                        {oneSet.repetition} x {oneSet.weight}
                                    </li>
                                ))}
                            </ul>

                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
