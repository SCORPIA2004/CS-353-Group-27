import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import useAuth from "../utils/useAuth";
import {WORKOUTS_URL} from "../helpers/ApiUrlHelper"; // assuming this hook provides the token

const WorkoutSelectionPage = () => {
    const navigate = useNavigate();
    const {isAuthenticated, isLoading, token} = useAuth(); // assuming token is provided by useAuth
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // state for handling errors

    const fetchWorkouts = async () => {
        try {
            const response = await fetch(WORKOUTS_URL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setWorkouts(data);
            } else {
                setError('Failed to fetch workouts. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching workouts:', error);
            setError('Failed to connect to the service. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            fetchWorkouts();
        } else if (!isAuthenticated && !isLoading) {
            navigate('/login')
        }
    }, [isAuthenticated, isLoading]);

    const style = {
        backgroundImage: `url('bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
    };

    return (
        <div style={style}>
            <Container>
                <Flex justify="center" direction="column" gap="4" py={"4"}>
                    <Heading css={{textAlign: 'center'}}>Select a Workout</Heading>

                    {loading ? (
                        <Text>Loading workouts...</Text>
                    ) : error ? (
                        <Text>{error}</Text>
                    ) : (
                        <Flex direction="column" gap={"4"}>
                            {workouts.map((workout, index) => (
                                <Card style={{cursor: "pointer"}} onClick={() => navigate(`/workout/${workout.id}`)}>
                                    <Flex justify="between" align="center" direction="row" gap="2">
                                        <div>
                                            <Flex direction={"column"}>
                                                <div style={{marginBottom: '20px'}}>
                                                    <Heading style={{marginBottom: '8px'}}>{workout.title}</Heading>
                                                    <Text>{workout.description}</Text>
                                                </div>
                                                <Text>{workout.duration} mins, {workout.difficulty}.</Text>
                                            </Flex>
                                        </div>
                                        <Button style={{marginRight: '13px', cursor: 'pointer'}}
                                                onClick={() => navigate(`/active-workout/${workout.id}`)}>Start
                                            Workout</Button>
                                    </Flex>
                                </Card>
                            ))}
                        </Flex>
                    )}
                </Flex>
            </Container>
        </div>
    );
};

export default WorkoutSelectionPage;
