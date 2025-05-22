import {useState} from "react";
import {Workout, WorkoutDTO} from "../types/Workout.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function UseWorkoutData(){

    const navigate = useNavigate();
    const [workout, setWorkout] = useState<Workout>()
    const [allWorkouts, setAllWorkouts] = useState<Workout[]>([])

    // Get all workouts
    const getAllWorkouts = () => {
        axios.get("/api/workout/all")
            .then((response) => {setAllWorkouts(response.data)})
            .catch(error => {
                console.error("Error fetching all workouts: ", error)
            })
    }

    // Get workout by id
    const getWorkoutById = (id: string) => {
        return axios.get("/api/workout/" + id)
            .then((response) => {
                setWorkout(response.data)
                return response
            })
            .catch(error => {
                console.error("Error fetching workout by id: ", error)
                throw error;
            })
    }

    // Create new workout
    const createWorkout = (newWorkout: WorkoutDTO) => {
        // Check if workout has a name
        if (!newWorkout.name) {
            alert("Please enter a name")
            return;
        }

        axios.post("/api/workout/new", newWorkout)
            .then((response) => {
                setAllWorkouts([...allWorkouts, response.data])
                navigate("/workouts")
            })
            .catch(error => {
                console.error("Error create workout: ", error)
                alert("Workout already exists")
            })

    }

    // update workout
    const updateWorkout = (updatedWorkout: WorkoutDTO, id: string) => {
        axios.put("/api/workout/" + id, updatedWorkout)
            .then((response) => {setWorkout(response.data)})
            .then(error => {
                console.error("Error update workout: ", error)
            })
    }

    // delete workout
    const deleteWorkout = (id: string) => {
        axios.delete("/api/workout/" + id)
            .then(() => {
                navigate("/workouts");
                getAllWorkouts()
            })
            .catch(error => {
                console.error("Error delete workout: ", error)
            })
    }

    return {allWorkouts, workout, getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout}
}
