import axios from "axios";
import {useState} from "react";
import {Exercise} from "../types/Exercise.tsx";
import {useNavigate} from "react-router-dom";

export default function UseExerciseData() {

    const [allExercises, setAllExercises] = useState<Exercise[]>([]);
    const [exercise, setExercise] = useState<Exercise>()
    const navigate = useNavigate();

    // GET all exercises
    const getAllExercises= () => {
        axios.get("/api/exercise/all")
            .then((response) => {setAllExercises(response.data)})
            .catch(error => {
                console.error("Error fetching all exercises:", error)
            })
    }

    // Get exercise by id
    const getExerciseById = (id: string) => {
        return axios.get("/api/exercise/" + id)
            .then((response) => {
                setExercise(response.data)
                return response})
            .catch(error => {
                console.error("Error fetching exercise by id:", error)
                throw error
            })
    }

    // Create new exercise
    const createExercise = (newExercise: Exercise) => {
        // Check if exercise has a name
        if (!newExercise.name) {
            alert("Please enter a name")
            return;
        }

        axios.post("/api/exercise/new", newExercise)
            .then((response) => {
                setAllExercises([... allExercises, response.data]);
                navigate("/exercises");
            })
            .catch(error => {
                console.error("Error create exercise:", error)
                alert("Exercise already exists")
            })
    }

    // Update exercise
    const updateExercise = (updatedExercise: Exercise) => {
        axios.put("/api/exercise/" + updatedExercise.id, updatedExercise)
            .then((response) => {setExercise(response.data)})
            .catch(error => {
                console.error("Error update Exercise:" + error)
            })
    }

    // delete exercise
    const deleteExercise = (id: string) => {
        axios.delete("/api/exercise/" + id)
            .then(() => {
                navigate("/exercises")
                getAllExercises()
            })
            .catch(error => {
                console.error("Error delete Exercise: " + error)
            })
    }

    return {allExercises, exercise, getAllExercises,getExerciseById, createExercise, updateExercise, deleteExercise}
}
