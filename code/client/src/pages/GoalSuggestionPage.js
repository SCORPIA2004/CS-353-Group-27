import React, {useState, useEffect} from 'react';
import {Box, Button, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {GOAL_SUGGESTION_URL, WORKOUTS_URL} from "../helpers/ApiUrlHelper";
import {useNavigate, useParams} from "react-router-dom";
import useAuth from "../utils/useAuth";
import styled from "styled-components";

const GoalSuggestionPage = () => {
    const [goal, setGoal] = useState(null);
    const {id} = useParams();
    const {isAuthenticated, isLoading} = useAuth();
    const navigate = useNavigate();

    const fetchGoal = async () => {
        try {
            const response = await fetch(`${GOAL_SUGGESTION_URL}?goalId=${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.text();
                setGoal(data);
            } else {
                console.error('Error fetching workout:');
            }
        } catch (error) {
            console.error('Error fetching workout:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            fetchGoal();
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
        font-weight: 500;
        text-align: center;
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

    if (!goal) return <div>Loading...</div>;

    return (
        <Container style={{paddingInline: '10px'}}>
            <Background>
                <ModalWrapper>
                    <ContentArea>
                        <>
                            <Details>🌟 {goal}</Details>
                        </>
                    </ContentArea>
                </ModalWrapper>
            </Background>
        </Container>
    );
};

export default GoalSuggestionPage;
