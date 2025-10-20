import {useNavigate, useParams} from "react-router-dom";
import {Exercise} from "../../types/Exercise.tsx";
import {AxiosResponse} from "axios";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ExerciseCard from "../../components/exercise/ExerciseCard.tsx";
import ButtonWithIcon from "../../components/ButtonWithIcon.tsx";
import {Sets} from "../../types/Set.tsx";

type ExerciseRunProps = {
    exercise: Exercise | undefined,
    getExerciseById: (id: string) => Promise<AxiosResponse>,
    updateExercise: (updatedExercise: Exercise) => void,
}

export default function ExerciseRunPage({exercise, getExerciseById, updateExercise}: ExerciseRunProps) {

    const {workoutId, exerciseId} = useParams();
    const navigate = useNavigate();
    const [formattedDate, setFormattedDate] = useState("");

    const [editExercise, setEditExercise] = useState<Exercise>(exercise ? exercise : {id: "", name: "", progressList: []})
    const [weight, setWeight] = useState<string>("")
    const [reps, setReps] = useState<string>("")
    const [sets, setSets] = useState<Sets[]>([])

    // button handler
    const handleAddButtonClick = (event: FormEvent) => {
        event.preventDefault()

        // create new set and add it to list
        const newSet: Sets = {
            repetition: reps.toString(),
            weight: weight.toString()
        }

        // update sets-State
        setSets(prev => [...prev, newSet])

        // add progressList only with the new set
        setEditExercise({
            ...editExercise,
            progressList: [...editExercise.progressList || [],
                {
                    date: formattedDate,
                    sets: [newSet]
                }]
        })

        // reset
        setReps("")
        setWeight("")
    }

    const handleDoneButtonClick = () => {
        updateExercise(editExercise)

        // reset Sets
        setSets([])

        navigate("/start-workout/" + workoutId)
    }

    const handleBackButtonClick = () => {
        // reset Sets
        setSets([])

        navigate("/start-workout/" + workoutId)
    }

    // Load exercise & current date
    useEffect(() => {
        if (exerciseId !== undefined) {
            getExerciseById(exerciseId)
                .then((response) => {
                    return setEditExercise({
                        id: response.data.id,
                        name: response.data.name,
                        note: response.data.note,
                        progressList: response.data.progressList
                    })
                })
        }

        // Get current date
        const date = new Date();

        // Day and month always with leading zero if they are single-digit
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        // Format "DD.MM.YYYY"
        const localDate = `${day}.${month}.${year}`;

        setFormattedDate(localDate)
    }, [exerciseId])

    return (
        <>
            <div className="w-full max-w-md mx-auto p-6 bg-zinc-800 rounded-xl shadow-md space-y-6">
                <ExerciseCard exercise={exercise ? exercise : {id: "", name: "",}} />
                {/*<p>Datum: {formattedDate}</p>*/}
                <div>
                    <form
                        onSubmit={handleAddButtonClick}
                    >
                        {/* Input-fields */}
                        <div className="bg-zinc-700 rounded-lg p-4 shadow-inner space-y-4">
                            <h3 className="text-sm font-semibold text-zinc-100 mb-2">Note your Progress!</h3>

                            <input
                                id={"reps"}
                                name={"Reps"}
                                placeholder={"Reps..."}
                                type="number"
                                value={reps}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setReps(event.target.value)}
                                min="1"
                                step="1"
                                required
                                className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />

                            <input
                                id={"weight"}
                                name={"Weight"}
                                placeholder={"Weight in kg..."}
                                type="number"
                                value={weight}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setWeight(event.target.value)}
                                min="1"
                                step="0.5"
                                required
                                className="w-full px-3 py-2 text-sm text-zinc-100 bg-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>

                        {/* Button */}
                        <div className="mt-3">
                            <ButtonWithIcon icon={"/add-icon.png"} type={"submit"} />
                        </div>

                        <div className="bg-zinc-700 mt-3 rounded-lg p-4 shadow-inner space-y-2">
                            <table className="w-full text-xs text-zinc-200">
                                <thead>
                                <tr className="text-left border-b border-zinc-600">
                                    <th className="p-3">Reps</th>
                                    <th className="p-3">x</th>
                                    <th className="p-3">Weight</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sets.map((oneSet: Sets) => (
                                    <tr className="border-b border-zinc-600"
                                        key={`${oneSet.repetition}-${oneSet.weight}`}
                                    >
                                        <td className="p-3">
                                            <p>{oneSet.repetition}</p>
                                        </td>
                                        <td className="p-3">
                                            <p>x</p>
                                        </td>
                                        <td className="p-3">
                                            <p>{oneSet.weight} kg</p>
                                        </td>
                                    </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </form>
                </div>
                <div className="mt-5 flex justify-center gap-4">
                    <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={handleBackButtonClick} />
                    <ButtonWithIcon icon={"/check-icon.png"} type={"button"} onClick={handleDoneButtonClick} />
                </div>
            </div>
        </>
    )
}
