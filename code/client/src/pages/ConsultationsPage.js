import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Container, Flex, Heading, Text} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import useAuth from "../utils/useAuth";
import {CONSULTATION_URL, WORKOUT_LOG_URL, WORKOUTS_URL} from "../helpers/ApiUrlHelper";

//For trainee
const ConsultationsPage = () => {
    const navigate = useNavigate();
    const {isAuthenticated, isLoading} = useAuth();
    const [consultations, setConsultations] = useState([]);

    const fetchConsultations = async () => {
        try {
            const response = await fetch(`${CONSULTATION_URL}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                let data = await response.json();
                // Sort consultations by date in descending order
                data = data.sort((b, a) => new Date(b.date) - new Date(a.date));
                setConsultations(data);
            } else {
                console.error('Error fetching workouts:');
            }
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login');
        }

        if (isAuthenticated) {
            fetchConsultations();
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
                <Card>
                    <Heading>Consultations</Heading>
                    <Box>
                        <Card>
                            <Flex
                                direction={"row"}
                                justify={"between"}
                                style={{ fontWeight: "bold" }}
                            >
                                <Text>Name</Text>
                                <Text>Consultation Date</Text>
                            </Flex>
                        </Card>

                        {consultations.map((consultation, index) => (
                            <Card
                                style={{ marginBlock: "10px"}}
                                key={index}
                            >
                                <Flex direction={"row"} justify={"between"}>
                                    <Text>{consultation.trainer_first_name} {consultation.trainer_last_name}</Text>
                                    <Text>{formatDate(consultation.date)}</Text>
                                </Flex>
                            </Card>
                        ))}
                    </Box>
                </Card>
            </Flex>
        </Container>
    );
};

export default ConsultationsPage;
