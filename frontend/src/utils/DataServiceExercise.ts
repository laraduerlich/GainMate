import axios from "axios";
import {useEffect, useState} from "react";

export default function DataServiceExercise() {

    const [allExercises, setAllExercises] = useState([])

    // GET all exercises
    const getAllExercises= () => {
        axios.get("api/exercise/all")
            .then((response) => {setAllExercises(response.data)})
            .catch(error => {
                console.error("Error fetching data:", error)
            })
    }


    // useEffect zum Laden
    useEffect(() => {
        getAllExercises();
    }, []);

    return {allExercises}
}
