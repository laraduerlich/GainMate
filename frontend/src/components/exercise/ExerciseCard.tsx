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
                <h2 className="text-lg font-semibold text-zinc-300 px-4 pt-4 pb-2">
                    {exercise.name}
                </h2>
                <p>{exercise.note}</p>
                <table className="mt-3 ml text-xs w-[350px]">
                    <thead className="bg-zinc-800">
                    <tr className="align-middle">
                        <th className="p-3">Date</th>
                        <th className="p-3">Reps x Weight</th>
                    </tr>
                    </thead>
                    <tbody>
                    {exercise.progressList?.map((progress: Progress) =>(
                        <tr className="border-b border-opacity-20 border-gray-300"
                            key={progress.date}
                        >
                            <td>
                                {progress.date}
                            </td>
                            <td>
                                <ul>
                                    {progress.sets.map((oneSet: Sets)=> (
                                        <li
                                            key={`${progress.date}-${oneSet.repetition}-${oneSet.weight}`}>
                                            {oneSet.repetition} x {oneSet.weight} kg
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
