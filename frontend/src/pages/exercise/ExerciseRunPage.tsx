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

        setSets([...sets, newSet])

        // add Progress to Exercise
        setEditExercise({
            ...editExercise,
            progressList: [...editExercise.progressList || [],
                {
                    date: formattedDate,
                    sets: sets
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
            <ExerciseCard exercise={exercise ? exercise : {id: "", name: "",}} />
            <br />
            <p>Datum: {formattedDate}</p>
            <br />
            <div>
                <form onSubmit={handleAddButtonClick}>
                    <div>
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
                            className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
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
                            className="w-full py-2 pl-3 text-sm pt-3 mt-2 text-zinc-800 rounded-md bg-zinc-300 backdrop-blur-md focus:outline-none"
                        />
                    </div>
                    <div className="mt-3">
                        <ButtonWithIcon icon={"/add-icon.png"} type={"submit"} />
                    </div>
                </form>
            </div>
            <div>
                <table className="mt-3 ml text-xs w-[350px]">
                    <thead className="bg-zinc-800">
                        <tr className="align-middle">
                            <th className="p-3">Reps</th>
                            <th className="p-3">x</th>
                            <th className="p-3">Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                    {sets.map((oneSet: Sets) => (
                        <tr className="border-b border-opacity-20 border-gray-300"
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
            <div className="mt-5 flex justify-center gap-4">
                <ButtonWithIcon icon={"/goBack-icon.png"} type={"button"} onClick={handleBackButtonClick} />
                <ButtonWithIcon icon={"/check-icon.png"} type={"button"} onClick={handleDoneButtonClick} />
            </div>
        </>
    )
}
