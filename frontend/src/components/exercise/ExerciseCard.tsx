import {Exercise} from "../../types/Exercise.tsx";
import {Progress} from "../../types/Progress.tsx";
import {Sets} from "../../types/Set.tsx";
import ButtonWithIcon from "../ButtonWithIcon.tsx";

type ExerciseCardProps = {
    // type: "view" | "workout";
    exercise: Exercise,
    editButtonClick: () => void
}

export default function ExerciseCard({exercise, editButtonClick}: ExerciseCardProps) {




    return (
        <>
            <div>
                <p>{exercise.name}</p>
                <p>{exercise.note}</p>
                <ul>
                    {exercise.progressList?.map((progress: Progress) =>(
                        <li>
                            {progress.date}
                            <ul>
                                {progress.sets.map((sets: Sets)=> (
                                    <li>
                                        {sets.repetion} x {sets.weight}
                                    </li>
                                ))}
                            </ul>

                        </li>
                    ))}
                </ul>
                <ButtonWithIcon onClick={editButtonClick} icon={"edit"} type={"button"} />
            </div>
        </>
    )
}
