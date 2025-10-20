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
                {/* Exercise Info */}
                <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-2">
                    <h2 className="text-lg font-semibold text-zinc-100">
                        {exercise.name}
                    </h2>
                    {exercise.note && (
                        <p className="text-sm text-left text-zinc-300">
                            {exercise.note}
                        </p>
                    )}

                {/* Progress Table */}
                {exercise.progressList && exercise.progressList.length > 0 && (
                    <div>
                        <table className="w-full text-xs text-zinc-200">
                            <thead>
                            <tr className="text-left border-b border-zinc-600">
                                <th className="py-2 pr-4">Date</th>
                                <th className="py-2">Reps × Weight</th>
                            </tr>
                            </thead>
                            <tbody>
                            {exercise.progressList.map((progress: Progress) => (
                                <tr key={progress.date} className="border-b border-zinc-600">
                                    <td className="py-2 pr-4 text-zinc-300">{progress.date}</td>
                                    <td className="py-2">
                                        <ul className="space-y-1">
                                            {progress.sets.map((set: Sets) => (
                                                <li
                                                    key={`${progress.date}-${set.repetition}-${set.weight}`}
                                                    className="text-zinc-200"
                                                >
                                                    {set.repetition} × {set.weight} kg
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
                </div>
            </div>

        </>
    )
}
