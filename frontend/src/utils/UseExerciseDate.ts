import axios from "axios";
import {useEffect, useState} from "react";
import {Exercise} from "../types/Exercise.tsx";
import {useNavigate} from "react-router-dom";

export default function UseExerciseDate() {

    const [allExercises, setAllExercises] = useState<Exercise[]>([]);
    const navigate = useNavigate();

    // GET all exercises
    const getAllExercises= () => {
        axios.get("/api/exercise/all")
            .then((response) => {setAllExercises(response.data)})
            .catch(error => {
                console.error("Error fetching data:", error)
            })
    }

    // Create new exercise
    const createExercise = (newExercise: Exercise) => {
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

    // useEffect zum Laden
    useEffect(() => {
        getAllExercises();
    }, []);

    return {allExercises, createExercise}
}
