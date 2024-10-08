/**
 * Renders the router component for handling client-side routing.
 * @returns {JSX.Element} The router component.
 */
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./navbar";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import HomePage from "./pages";
import WorkoutSelectionPage from "./pages/WorkoutSelectionPage";
import ActiveWorkoutPage from "./pages/ActiveWorkoutPage";
import WorkoutPage from "./pages/WorkoutPage";
import ScheduleConsultationPage from "./pages/ScheduleConsultationPage";
import ReviewProgressPage from "./pages/TraineeProgressPage";
import TraineeHomePage from './pages/TraineeHomepage';
import TraineeProgressPage from './pages/TraineeProgressPage';
import Leaderboard from './pages/Leaderboard';
import GoalsPage from "./pages/GoalsPage";
import GoalSuggestionPage from "./pages/GoalSuggestionPage";
import NewGoalPage from "./pages/NewGoalPage";
import PastWorkoutsPage from "./pages/PastWorkoutsPage";
import FindTrainerPage from "./pages/FindTrainerPage";
import ConsultationsPage from "./pages/ConsultationsPage";

const Router = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/workout-selection" element={<WorkoutSelectionPage/>}/>
                <Route path="/active-workout/:id" element={<ActiveWorkoutPage />} />
                <Route path="/workout/:id" element={<WorkoutPage />} />
                <Route path="/schedule-consultation" element={<ScheduleConsultationPage />} />
                <Route path="/trainee-progress/:traineeId" element={<TraineeProgressPage />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path={"/goals"} element={<GoalsPage />} />
                <Route path={"/goals/suggestion/:id"} element={<GoalSuggestionPage />} />
                <Route path={"/goals/create-goal"} element={<NewGoalPage />} />
                <Route path={"/past-workouts"} element={<PastWorkoutsPage />} />
                <Route path={"/trainers"} element={<FindTrainerPage />} />
                <Route path={"/consultations"} element={<ConsultationsPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
