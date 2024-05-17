import React, {useState, useEffect} from 'react';
import {Box, Button, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {WORKOUT_LOG_URL, WORKOUTS_URL} from "../helpers/ApiUrlHelper";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../utils/useAuth";

const ActiveWorkoutPage = ({match}) => {
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
            startTimer();
        } else if (!isAuthenticated) {
            navigate('/login');
        }
    }, [id]);

    useEffect(() => {
        let interval;
        if (timerRunning) {
            let seconds = 0;
            interval = setInterval(() => {
                seconds++;
                const formattedTime = formatTime(seconds);
                setTimeElapsed(formattedTime);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerRunning]);

    const formatTime = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = hours > 0 ? `${hours}h ` : '';
        const formattedMinutes = minutes > 0 ? `${minutes}m ` : '';
        const formattedSeconds = `${seconds}s`;

        return formattedHours + formattedMinutes + formattedSeconds;
    };

    const startTimer = () => {
        setTimerRunning(true);
    };

    const endWorkout = async () => {
        setTimerRunning(false);
        try {
            // Calculate time elapsed in minutes
            const timeParts = timeElapsed.split(' '); // Split the string into parts
            let totalMinutes = 0;

            for (const part of timeParts) {
                if (part.includes('h')) {
                    totalMinutes += parseInt(part) * 60; // Convert hours to minutes
                } else if (part.includes('m')) {
                    totalMinutes += parseInt(part); // Add minutes
                } else if (part.includes('s')) {
                    // Ignore seconds in this calculation
                }
            }

            // Calculate calories burned based on time and intensity
            const intensity = workout.intensity.toLowerCase(); // Assuming intensity is stored in lowercase
            let calorieBurnRate = 0;

            switch (intensity) {
                case 'low':
                    calorieBurnRate = 5; // Calories burned per minute for low intensity
                    break;
                case 'medium':
                    calorieBurnRate = 7; // Calories burned per minute for medium intensity
                    break;
                case 'high':
                    calorieBurnRate = 10; // Calories burned per minute for high intensity
                    break;
                default:
                    calorieBurnRate = 0;
            }

            const caloriesBurned = totalMinutes * calorieBurnRate;

            const response = await fetch(WORKOUT_LOG_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    workoutId: workout.id,
                    duration: totalMinutes,
                    caloriesBurned: caloriesBurned,
                }),
            });
            if (!response.ok) {
                console.error('Error ending workout:', response.statusText);
            } else {
                // Add logic here to handle success (e.g., navigate to a summary page)
                navigate(`/`); // Example navigation to a summary page
            }
        } catch (error) {
            console.error('Error ending workout:', error);
        }
    };

    if (!workout) return <div>Loading...</div>;

    return (
        <Container style={{paddingInline: '10px'}}>
            <Flex justify="center" direction="column" gap="4" py="4">
                <Flex direction="row" justify="between">
                    <Heading>Active Workout - {workout?.title}</Heading>
                    <Heading>{timeElapsed}</Heading>
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
                    <Button style={{backgroundColor: '#c30010', color: 'white', cursor: 'pointer'}}
                            onClick={endWorkout}>
                        End Workout
                    </Button>
                </Flex>
            </Flex>
        </Container>
    );
};

export default ActiveWorkoutPage;
