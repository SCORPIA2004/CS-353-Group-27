/**
 * Renders the router component for handling client-side routing.
 * @returns {JSX.Element} The router component.
 */
import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./navbar";
import IndexPage from "./pages";
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";
import HomePage from "./pages";


const Router = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router