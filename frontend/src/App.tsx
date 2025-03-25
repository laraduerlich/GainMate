import './App.css'
import {Route, Routes} from "react-router-dom";
import OverviewPage from "./pages/OverviewPage.tsx";
import ExerciseDashboardPage from "./pages/ExerciseDashboardPage.tsx";
import ExerciseCreatePage from "./pages/ExerciseCreatePage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import UseExerciseDate from "./utils/UseExerciseDate.ts";
import ExerciseViewPage from "./pages/ExerciseViewPage.tsx";

function App() {

    const {allExercises, exercise, createExercise, getExerciseById} = UseExerciseDate();


  return (
      <>
          <div className="flex flex-col items-center justify-center h-screen-dvh bg-gray-100 dark:bg-gray-900">
              <Header />

              {/* Main Content */}
              <main className="flex-1 flex flex-col items-center justify-center w-full px-6">
                  <Routes>
                      <Route path={"/overview"} element={<OverviewPage />} />
                      <Route path={"/exercises"} element={<ExerciseDashboardPage exercises={allExercises} />} />
                      <Route path={"/exercise/:id"} element={<ExerciseViewPage exercise={exercise} getExerciseById={getExerciseById}/>} />
                      <Route path={"/exercise/new"} element={<ExerciseCreatePage createExercise={createExercise} />} />
                  </Routes>
              </main>

              <Footer />
          </div>
      </>
  )
}

export default App
