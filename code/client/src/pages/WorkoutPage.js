import React, {useState, useEffect} from 'react';
import {Box, Button, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {WORKOUT_LOG_URL, WORKOUTS_URL} from "../helpers/ApiUrlHelper";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../utils/useAuth";

const WorkoutPage = () => {
    const [workout, setWorkout] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const {id} = useParams();
    const {isAuthenticated, isLoading} = useAuth();
    const navigate = useNavigate();

    const fetchWorkout = async () => {
        try {
            const response = await fetch(`${WORKOUTS_URL}?id=${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setWorkout(data[0]);
            } else {
                console.error('Error fetching workout:');
            }
        } catch (error) {
            console.error('Error fetching workout:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            fetchWorkout();
        } else if (!isAuthenticated && !isLoading) {
            navigate('/login');
        }
    }, [isLoading, isAuthenticated]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = hours > 0 ? `${hours}h ` : '';
        const formattedMinutes = minutes > 0 ? `${minutes}m ` : '';
        const formattedSeconds = `${seconds}s`;

        return formattedHours + formattedMinutes + formattedSeconds;
    };

    if (!workout) return <div>Loading...</div>;

    return (
        <Container style={{paddingInline: '10px'}}>
            <Flex justify="center" direction="column" gap="4" py="4">
                <Flex direction="row" justify="between">
                    <Heading>Active Workout - {workout?.title}</Heading>
                </Flex>

                <Box>
                    <Flex direction={"column"} gap={"1"}>
                        <Flex direction={"row"} justify={"between"}>
                            <Text>{workout?.duration} mins, {workout?.difficulty}</Text>
                            <Text>Intensity: {workout?.intensity}</Text>
                        </Flex>
                        <Text size={"5"} style={{marginBlock: '20px'}}>Required Equipment: {workout?.required_equipment}</Text>
                        <Text size={"5"}>{workout?.description}</Text>
                    </Flex>
                </Box>

                <Flex justify="center">
                    <Button style={{cursor: 'pointer'}}
                            onClick={() => {navigate(`/active-workout/${id}`)}}>
                        Start Workout
                    </Button>
                </Flex>
            </Flex>
        </Container>
    );
};

export default WorkoutPage;
