import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import useAuth from "../utils/useAuth";
import TrainerHomePage from "./TrainerHomepage";
import TraineeHomePage from "./TraineeHomepage";

//For trainee
const HomePage = () => {
    const navigate = useNavigate();
    const {isAuthenticated, isLoading, user} = useAuth();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login');
        }

    }, [isLoading, isAuthenticated])

    return (
        <>
            {user?.role === 'trainer' ? (
                <TrainerHomePage/>
            ) : (
                <TraineeHomePage/>
            )}
        </>
    );
};

export default HomePage;
