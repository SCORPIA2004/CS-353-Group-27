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
            </Routes>
        </BrowserRouter>
    )
}

export default Router