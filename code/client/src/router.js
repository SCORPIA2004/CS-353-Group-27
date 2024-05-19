/**
 * Renders the router component for handling client-side routing.
 * @returns {JSX.Element} The router component.
 */
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./navbar";
import IndexPage from "./pages";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import HomePage from "./pages";
import LeaderboardPage from './pages/LeaderBoard';
import WorkoutStartPage from './pages/WorkoutStartPage';
import WorkoutInProgressPage from './pages/WorkoutInProgressPage';
import WorkoutSummaryPage from './pages/WorkoutSummaryPage';
import TrainerHomePage from './pages/TrainerHomepage';
import CreateWorkoutPage from './pages/CreateWorkout';

const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/leaderBoard" element={<LeaderboardPage />} />
                <Route path="/workoutStart/:id" element={<WorkoutStartPage />} />
                <Route path="/workoutInProgress/:id" element={<WorkoutInProgressPage />} />
                <Route path="/workoutSummary/:id" element={<WorkoutSummaryPage />} />
                <Route path="/trainerHome" element={<TrainerHomePage />} />
                <Route path="/createWorkout" element={<CreateWorkoutPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
