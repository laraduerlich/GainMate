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
import {useEffect, useState} from "react";
import Sidebar from "./components/Sidebar.tsx";
import {AppUser} from "./types/AppUser.tsx";
import axios from "axios";
import ProtectedRoutes from "./pages/ProtectedRoutes.tsx";
import LoginPage from "./pages/user/LoginPage.tsx";
import RegisterPage from "./pages/user/RegisterPage.tsx";
import LandingPage from "./pages/LandingPage.tsx";
import UserPage from "./pages/user/UserPage.tsx";
import GoodbyePage from "./pages/user/GoodbyePage.tsx";
import ProgressPage from "./pages/user/ProgressPage.tsx";

function App() {

    // const navigate = useNavigate()

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
                setAppUser(response.data)
            })
            .catch(error => {
                setAppUser(null)
                console.error("User could not login", error)
            })
    }

    // logout
    const handleLogout = () => {
        axios.post("/api/auth/logout")
            .then(() => {
                setAppUser(null)
                fetchUser()
                setIsSidebarOpen(false)
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
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} logoutButtonClick={handleLogout} appUser={appUser}/>
          <div className="flex flex-col items-center justify-center h-screen-dvh bg-gray-100 dark:bg-zinc-700">
              <Header toggleSidebar={toggleSidebar}/>

              {/* Main Content */}
              <main className="mt-10 flex-1 flex flex-col items-center justify-center w-full px-6">
                  <Routes>
                      <Route path="/login" element={<LoginPage fetchUser={fetchUser} />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/goodbye" element={<GoodbyePage />} />

                      {/* Protected Routes */}
                      <Route element={<ProtectedRoutes appUser={appUser} />}>
                          <Route path="/welcome" element={
                              <OverviewPage appUser={appUser}
                              />}
                          />
                          <Route path={"/account"} element={
                              <UserPage appUser={appUser}
                                        fetchUser={fetchUser}
                                        logout={handleLogout}
                              />}
                          />
                          <Route path={"/progress"} element={
                              <ProgressPage workouts={allWorkouts}
                                            getAllWorkouts={getAllWorkouts}
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
                          <Route path="/exercise/:exerciseId" element={
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
                          <Route path="/workout/:workoutId" element={
                              <WorkoutViewPage
                                  workout={workout}
                                  exercises={allExercises}
                                  getAllExercises={getAllExercises}
                                  getWorkoutById={getWorkoutById}
                                  updateWorkout={updateWorkout}
                                  deleteWorkout={deleteWorkout}
                              />}
                          />
                          <Route path="/start-workout/:workoutId" element={
                              <WorkoutRunPage
                                  workout={workout}
                                  exercises={allExercises}
                                  getAllExercises={getAllExercises}
                                  getWorkoutById={getWorkoutById}
                                  updateWorkout={updateWorkout}
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
