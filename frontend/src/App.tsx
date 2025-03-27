import './App.css'
import {Route, Routes} from "react-router-dom";
import OverviewPage from "./pages/OverviewPage.tsx";
import ExerciseDashboardPage from "./pages/exercise/ExerciseDashboardPage.tsx";
import ExerciseCreatePage from "./pages/exercise/ExerciseCreatePage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import UseExerciseData from "./utils/UseExerciseData.ts";
import ExerciseViewPage from "./pages/exercise/ExerciseViewPage.tsx";
import WorkoutDashboardPage from "./pages/workout/WorkoutDashboardPage.tsx";
import WorkoutCreatePage from "./pages/workout/WorkoutCreatePage.tsx";
import UseWorkoutData from "./utils/UseWorkoutData.ts";

function App() {

    const {allExercises, exercise, createExercise, getExerciseById, updateExercise} = UseExerciseData();
    const {createWorkout} = UseWorkoutData();


  return (
      <>
          <div className="flex flex-col items-center justify-center h-screen-dvh bg-gray-100 dark:bg-gray-900">
              <Header />

              {/* Main Content */}
              <main className="flex-1 flex flex-col items-center justify-center w-full px-6">
                  <Routes>
                      <Route path={"/overview"} element={<OverviewPage />} />
                      {/* Exercise Pages */}
                      <Route path={"/exercises"} element={<ExerciseDashboardPage exercises={allExercises} />} />
                      <Route path={"/exercise/:id"} element={<ExerciseViewPage exercise={exercise} getExerciseById={getExerciseById} updateExercise={updateExercise}/>} />
                      <Route path={"/exercise/new"} element={<ExerciseCreatePage createExercise={createExercise} />} />
                      {/* Workout Pages */}
                      <Route path={"/workouts"} element={<WorkoutDashboardPage />} />
                      <Route path={"/workout/new"} element={<WorkoutCreatePage createWorkout={createWorkout} exercises={allExercises}/>} />
                  </Routes>
              </main>

              <Footer />
          </div>
      </>
  )
}

export default App
