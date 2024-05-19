import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import useAuth from "../utils/useAuth";
import {WORKOUT_LOG_URL, WORKOUTS_URL} from "../helpers/ApiUrlHelper";

//For trainee
const TraineeHomePage = () => {
    const navigate = useNavigate();
    const {isAuthenticated, isLoading} = useAuth();
    const [lastWorkouts, setLastWorkouts] = useState([]);
    const [nutritionPlans, setNutritionPlans] = useState([]);

    const fetchLastWorkouts = async () => {
        try {
            const response = await fetch(`${WORKOUT_LOG_URL}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setLastWorkouts(data);
            } else {
                console.error('Error fetching workout:');
            }
        } catch (error) {
            console.error('Error fetching workout:', error);
        }
    };

    const fetchNutritionPlans = async () => {
        try {
            const response = await fetch('your_api/nutrition-plans');
            const data = await response.json();
            setNutritionPlans(data);
        } catch (error) {
            console.error('Failed to fetch nutrition plans:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchLastWorkouts();
            fetchNutritionPlans();
        }
    }, [navigate, isLoading, isAuthenticated]);

    const style = {
        width: '100%',
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    }

    return (
        <Container style={style}>
            <Flex justify="center" direction="column" py={"4"} gap={"4"}>
                <Heading css={{textAlign: 'center'}}>Homepage</Heading>

                <Flex justify="between">
                    <Button style={{cursor: "pointer"}} onClick={() => navigate('/workout-selection')}>Start
                        Workout</Button>
                    <Button style={{cursor: "pointer"}} onClick={() => navigate('/nutrition-plan')}>Nutrition
                        Plans</Button>
                    <Button style={{cursor: "pointer"}} onClick={() => navigate('/leaderboard')}>Leaderboard</Button>
                </Flex>

                <Card>
                    <Heading>Last Workouts</Heading>
                    <Box>
                        {lastWorkouts.map((workout, index) => (
                            <Card style={{marginBlock: "10px", cursor: "pointer"}} onClick={() => navigate('/workout/id')}>
                                <Flex direction={"row"} justify={"between"} key={index}>
                                    <Text>{formatDate(workout.date)}</Text>
                                    <Text>{workout.duration} minutes</Text>
                                    <Text>{workout.calories_burned} calories burned</Text>
                                </Flex>
                            </Card>
                        ))}
                    </Box>

                </Card>

                <Card>
                    <Heading>Nutrition Plans</Heading>
                    <Box css={{overflowY: 'auto', maxHeight: '200px'}}>
                        {nutritionPlans.map((plan, index) => (
                            <Text key={index}>{plan.title}</Text>
                        ))}
                    </Box>
                </Card>
            </Flex>
        </Container>
    );
};

export default TraineeHomePage;
