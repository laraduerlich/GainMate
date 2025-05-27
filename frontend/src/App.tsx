import './App.css'
import {Route, Routes, useNavigate} from "react-router-dom";
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
import {useEffect, useState} from "react";
import Sidebar from "./components/Sidebar.tsx";
import {AppUser} from "./types/AppUser.tsx";
import axios from "axios";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";

function App() {

    const navigate = useNavigate()

    const {allExercises, exercise, getAllExercises, getExerciseById, createExercise, updateExercise, deleteExercise} = UseExerciseData()
    const {allWorkouts, workout, getAllWorkouts, getWorkoutById, createWorkout, updateWorkout, deleteWorkout} = UseWorkoutData()

    // Sidebar
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleSidebar = () => {
        if(appUser !== undefined && appUser !== null) {
            setIsSidebarOpen(!isSidebarOpen)
        }
    };

    // Auth
    const [appUser, setAppUser] = useState<AppUser | undefined | null>(undefined)

    const fetchUser = () => {
        axios.get("/api/auth/me")
            .then((response) => {
                console.log(response.data)
                setAppUser(response.data)
                navigate("/welcome")
            })
            .catch(error => {
                setAppUser(null)
                console.error("User could not login", error)
            })
    }

    // logout
    const handleLogoutButtonClick = () => {
        axios.post("/api/auth/logout")
            .then(() => {
                setAppUser(null)
                fetchUser()
                setIsSidebarOpen(!isSidebarOpen)
                navigate("/login")
            })
            .catch(error => {
                console.error("User could not logout", error)
            })
    }

    useEffect(() => {
        fetchUser()
    }, []);

    return (
      <>
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} logoutButtonClick={handleLogoutButtonClick} appUser={appUser}/>
          <div className="flex flex-col items-center justify-center h-screen-dvh bg-gray-100 dark:bg-zinc-700">
              <Header toggleSidebar={toggleSidebar}/>

              {/* Main Content */}
              <main className="mt-10 flex-1 flex flex-col items-center justify-center w-full px-6">
                  <Routes>
                      <Route path="/login" element={<LoginPage fetchUser={fetchUser} />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/" element={<LandingPage />} />

                      {/* Protected Routes */}
                      <Route element={<ProtectedRoutes appUser={appUser} />}>
                          <Route path="/welcome" element={
                              <OverviewPage appUser={appUser}
                              />}
                          />

                          {/* Exercise Pages */}
                          <Route path="/exercises" element={
                              <ExerciseDashboardPage
                                  exercises={allExercises}
                                  getAllExercises={getAllExercises}
                              />}
                          />
                          <Route path="/exercise/new" element={
                              <ExerciseCreatePage
                                  createExercise={createExercise}
                              />}
                          />
                          <Route path="/exercise/:id" element={
                              <ExerciseViewPage
                                  exercise={exercise}
                                  getExerciseById={getExerciseById}
                                  updateExercise={updateExercise}
                                  deleteExercise={deleteExercise}
                              />}
                          />
                          <Route path="/workout/:workoutId/exercise/:exerciseId" element={
                              <ExerciseRunPage
                                  exercise={exercise}
                                  getExerciseById={getExerciseById}
                                  updateExercise={updateExercise}
                              />}
                          />

                          {/* Workout Pages */}
                          <Route path="/workouts" element={
                              <WorkoutDashboardPage
                                  workouts={allWorkouts}
                                  getAllWorkouts={getAllWorkouts}/>} />
                          <Route path="/workout/new" element={
                              <WorkoutCreatePage
                                  exercises={allExercises}
                                  createWorkout={createWorkout}
                                  getAllExercises={getAllExercises}
                              />}
                          />
                          <Route path="/workout/:id" element={
                              <WorkoutViewPage
                                  workout={workout}
                                  exercises={allExercises}
                                  getAllExercises={getAllExercises}
                                  getWorkoutById={getWorkoutById}
                                  updateWorkout={updateWorkout}
                                  deleteWorkout={deleteWorkout}
                              />}
                          />
                          <Route path="/start-workout/:id" element={
                              <WorkoutRunPage
                                  workout={workout}
                                  exercises={allExercises}
                                  getAllExercises={getAllExercises}
                                  getWorkoutById={getWorkoutById}
                              />}
                          />
                      </Route>
                  </Routes>
              </main>

              <Footer />
          </div>
      </>
    )
}

export default App
