import {useEffect, useState} from "react";
import {Workout} from "../types/Workout.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UseWorkoutData(){

    const navigate = useNavigate();
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([])

    // Get all workouts
    const getAllWorkouts = () => {
        axios.get("/api/workout/all")
            .then((response) => setAllWorkouts(response.data))
            .catch(error => {
                console.error("Error fetching all workouts", error)
            })
    }

    // Create new workout
    const createWorkout = (newWorkout: Workout) => {
        axios.post("/api/workout/new", newWorkout)
            .then((response) => {
                setAllWorkouts([...allWorkouts, response.data])
                navigate("/workouts")
            })
            .catch(error => {
                console.error("Error create workout:", error)
            })

    }

    // useEffect for loading
    useEffect(() => {
        getAllWorkouts()
    }, []);

    return {allWorkouts, createWorkout}
}
