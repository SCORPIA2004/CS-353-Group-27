import React, {useState, useEffect} from 'react';
import {Box, Button, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {WORKOUT_LOG_URL, WORKOUTS_URL} from "../helpers/ApiUrlHelper";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../utils/useAuth";
import styled from "styled-components";

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
        } else if (!isAuthenticated && !isLoading) {
            navigate('/login');
        }
    }, [isLoading, isAuthenticated]);

    useEffect(() => {
        startTimer();
    }, []);

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

    const Title = styled.h2`
        margin-bottom: 5px;
    `;

    const Subtitle = styled.h5`
        margin-bottom: 15px;
        font-weight: normal;
        font-size: 18px;
    `;

    const Details = styled.p`
        font-size: 21px;
        line-height: 1.5;
        text-align: left;
    `;

    const Background = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(1.5px);
    `;

    const ModalWrapper = styled.div`
        margin-top: 20px;
        background: linear-gradient(145deg, #6a3093, #a044ff);
        color: white;
        width: 90%;
        max-width: 400px;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        position: relative;
    `;

    const ContentArea = styled.div`
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    `;

// button is blue
    const Button = styled.button`
        padding: 10px 20px;
        margin-top: 20px;
        border: none;
        border-radius: 5px;
        background-color: darkred; // red
        color: white;
        font-size: 21px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #303f9f;
        }
    `;

    if (!workout) return <div>Loading...</div>;

    return (
        <Container style={{paddingInline: '10px'}}>
            <Background>
                <ModalWrapper>
                    <ContentArea>
                        <>
                            <Title>{workout.title}</Title>
                            <Subtitle style={{margin: 0}}>{timeElapsed}</Subtitle>
                            <Subtitle style={{marginTop: '10px'}}>
                                ⏰{workout.duration} mins, 💪{workout.difficulty}
                            </Subtitle>
                            <Subtitle style={{marginTop: '0'}}>
                                🏃 Equipment: {workout.required_equipment}
                            </Subtitle>
                            <Details>{workout.description}</Details>
                            <Flex justify="center">
                                <Button style={{backgroundColor: '#c30010', color: 'white', cursor: 'pointer'}}
                                        onClick={endWorkout}>
                                    End Workout
                                </Button>
                            </Flex>
                        </>
                    </ContentArea>
                </ModalWrapper>
            </Background>
        </Container>
    );
};

export default ActiveWorkoutPage;
