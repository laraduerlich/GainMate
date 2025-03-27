import {useState} from "react";
import {Workout} from "../types/Workout.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UseWorkoutData(){

    const navigate = useNavigate();
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([])

    // Create new workout
    const createWorkout = (newWorkout: Workout) => {
        axios.post("api/workout/new", newWorkout)
            .then((response) => {
                setAllWorkouts([...allWorkouts, response.data])
                navigate("/workouts")
            })
            .catch(error => {
                console.error("Error create exercise:", error)
            })

    }

    return {createWorkout}
}
