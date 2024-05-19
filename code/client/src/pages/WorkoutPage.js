import React, {useState, useEffect} from 'react';
import {Box, Button, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {WORKOUTS_URL} from "../helpers/ApiUrlHelper";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../utils/useAuth";
import styled from "styled-components";

const WorkoutPage = () => {
    const [workout, setWorkout] = useState(null);
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
        background-color: #3f51b5;
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
                                <Subtitle>
                                    ⏰{workout.duration} mins, 💪{workout.difficulty}
                                </Subtitle>
                                <Subtitle style={{marginTop: '0'}}>
                                    🏃 Equipment: {workout.required_equipment}
                                </Subtitle>
                                <Details>{workout.description}</Details>
                                <Flex justify="center">
                                    <Button style={{cursor: 'pointer'}}
                                            onClick={() => {
                                                navigate(`/active-workout/${id}`)
                                            }}>
                                        Start Workout
                                    </Button>
                                </Flex>
                            </>
                        </ContentArea>
                    </ModalWrapper>
                </Background>
        </Container>
    );
};

export default WorkoutPage;
