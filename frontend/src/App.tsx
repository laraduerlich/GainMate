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
import WorkoutViewPage from "./pages/workout/WorkoutViewPage.tsx";
import WorkoutRunPage from "./pages/workout/WorkoutRunPage.tsx";
import ExerciseRunPage from "./pages/exercise/ExerciseRunPage.tsx";

function App() {

    const {allExercises, exercise, createExercise, getExerciseById, updateExercise, deleteExercise} = UseExerciseData();
    const {allWorkouts, workout, getWorkoutById, createWorkout, updateWorkout, deleteWorkout} = UseWorkoutData();


  return (
      <>
          <div className="flex flex-col items-center justify-center h-screen-dvh bg-gray-100 dark:bg-gray-900">
              <Header />

              {/* Main Content */}
              <main className="flex-1 flex flex-col items-center justify-center w-full px-6">
                  <Routes>
                      <Route path={"/overview"} element={<OverviewPage />} />
                      {/* Exercise Pages */}
                      <Route path={"/exercises"} element={<ExerciseDashboardPage exercises={allExercises}/>} />
                      <Route path={"/exercise/new"} element={<ExerciseCreatePage createExercise={createExercise}/>} />
                      <Route path={"/exercise/:id"} element={<ExerciseViewPage exercise={exercise}
                                                                               getExerciseById={getExerciseById}
                                                                               updateExercise={updateExercise}
                                                                               deleteExercise={deleteExercise}/>} />
                      <Route path={"/workout/:workoutId/exercise/:exerciseId"} element={<ExerciseRunPage exercise={exercise}
                                                                                                         getExerciseById={getExerciseById}
                                                                                                         updateExercise={updateExercise}/>} />

                      {/* Workout Pages */}
                      <Route path={"/workouts"} element={<WorkoutDashboardPage workouts={allWorkouts}/>} />
                      <Route path={"/workout/new"} element={<WorkoutCreatePage exercises={allExercises}
                                                                               createWorkout={createWorkout}/>} />
                      <Route path={"/workout/:id"} element={<WorkoutViewPage workout={workout}
                                                                             exercises={allExercises}
                                                                             getWorkoutById={getWorkoutById}
                                                                             updateWorkout={updateWorkout}
                                                                             deleteWorkout={deleteWorkout}/>} />
                      <Route path={"/start-workout/:id"} element={<WorkoutRunPage workout={workout}
                                                                                  exercises={allExercises}
                                                                                  getWorkoutById={getWorkoutById}/>} />
                  </Routes>
              </main>

              <Footer />
          </div>
      </>
  )
}

export default App
