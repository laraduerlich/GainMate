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
                    sets: [...sets, newSet]
                }]
        })

        // reset
        setReps("")
        setWeight("")
    }

    const handleDoneButtonClick = () => {
        updateExercise(editExercise);

        navigate("/start-workout/" + workoutId)
    }

    const handleBackButtonClick = () => {
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
            <p>Datum: {formattedDate}</p>
            <div>
                <form onSubmit={handleAddButtonClick}>
                    <div>
                        <label>
                            Repetition:
                            <input
                                type="number"
                                value={reps}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setReps(event.target.value)}
                                min="1"
                                step="1"
                                required
                            />
                        </label>
                        <br />
                        <label>
                            Weight (kg):
                            <input
                                type="number"
                                value={weight}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setWeight(event.target.value)}
                                min="1"
                                step="0.5"
                                required
                            />
                        </label>
                    </div>
                    <ButtonWithIcon icon={"add"} type={"submit"} />
                </form>
            </div>
            <div>
                <ul>
                    {sets.map((oneSet) => (
                        <li
                            key={`${oneSet.repetition}-${oneSet.weight}`}>
                                <span>
                                    {oneSet.repetition} x {oneSet.weight} kg
                                </span>
                        </li>
                    ))}
                </ul>
            </div>

            <ButtonWithIcon icon={"done"} type={"button"} onClick={handleDoneButtonClick} />
            <ButtonWithIcon icon={"back"} type={"button"} onClick={handleBackButtonClick} />
        </>
    )
}
