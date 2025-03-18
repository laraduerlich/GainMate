import './App.css'
import {Route, Routes} from "react-router-dom";
import OverviewPage from "./pages/OverviewPage.tsx";
import ExerciseDashboardPage from "./pages/ExerciseDashboardPage.tsx";
import ExerciseCreatePage from "./pages/ExerciseCreatePage.tsx";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";

function App() {

  return (
      <>
          <Header />
          <div className="size-3">
                <Routes>
                    <Route path={"/overview"} element={<OverviewPage />} />
                    <Route path={"/all-exercises"} element={<ExerciseDashboardPage />} />
                    <Route path={"/exercise/new"} element={<ExerciseCreatePage />} />
                </Routes>
          </div>
          <Footer />
      </>
  )
}

export default App
