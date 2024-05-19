import React, {useEffect, useState} from 'react';
import {Box, Button, Card, Container, Flex, Heading, Select, Text, TextField} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import useAuth from "../utils/useAuth";
import {TRAINERS_URL, CONSULTATION_URL} from "../helpers/ApiUrlHelper";

const FindTrainerPage = () => {
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth();
    const [trainers, setTrainers] = useState([]);
    const [date, setDate] = useState('');
    const [minExperience, setMinExperience] = useState('');
    const [specialty, setSpecialty] = useState('');

    const fetchTrainers = async () => {
        try {
            let url = `${TRAINERS_URL}?`;
            if (minExperience > 0) {
                url += `experience=${minExperience}&`;
            }
            if (specialty && specialty !== 'No Preference') {
                url += `speciality=${specialty.toLowerCase()}&`;
            }


            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setTrainers(data);
            } else {
                console.error('Error fetching trainers:');
            }
        } catch (error) {
            console.error('Error fetching trainers:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchTrainers();
        }
    }, [isAuthenticated]);

    const handleScheduleConsultation = async (e, trainerId) => {
        e.preventDefault();

        try {
            const response = await fetch(`${CONSULTATION_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({date, trainerId}),
            });
            if (response.ok) {
                navigate('/consultations');
            } else {
                console.error('Failed to schedule consultation. Please try again later.');
            }
        } catch (err) {
            console.error('Failed to schedule consultation. Please try again later.', err);
        }
    };

    const handleClearFilters = () => {
        setMinExperience('');
        setSpecialty('');
    }

    return (
        <Container style={{padding: '20px'}}>
            <Flex justify="center" direction="column" py={"4"} gap={"4"}>
                <Card style={{padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)'}}>
                    <Heading style={{color: '#f5f5f5'}}>Trainers 🏋️‍♂️</Heading>
                    <Box>
                        <Flex gap={"3"}>
                            <TextField.Root
                                style={{marginBottom: 10}}
                                className={'experience-filter'}
                                placeholder="Experience (Years)"
                                type="number"
                                value={minExperience}
                                onChange={(e) => setMinExperience(e.target.value)}
                            />
                            <Select.Root value={specialty} onValueChange={setSpecialty}>
                                <Select.Trigger>{specialty}</Select.Trigger>
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Label>Specialty</Select.Label>
                                        <Select.Item value="No Preference">No Preference</Select.Item>
                                        <Select.Item value="Fitness">Fitness</Select.Item>
                                        <Select.Item value="Nutrition">Nutrition</Select.Item>
                                        <Select.Item value="Yoga">Yoga</Select.Item>
                                        <Select.Item value="Cardio">Cardio</Select.Item>
                                        <Select.Item value="Strength">Strength</Select.Item>
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                            <Button style={{cursor: 'pointer'}} onClick={fetchTrainers}>
                                Search
                            </Button>
                            <Button style={{cursor: 'pointer'}} onClick={handleClearFilters}>
                                Clear Filters
                            </Button>
                        </Flex>

                        {trainers.map((trainer, index) => (
                            <Card
                                style={{
                                    marginBlock: "10px",
                                    padding: '15px',
                                    borderRadius: '10px',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                }}
                                key={index}
                            >
                                <Flex direction={"row"} justify={"between"} align={"center"}>
                                    <Flex direction={"column"} gap={"2"}>
                                        <Text style={{
                                            fontWeight: '600',
                                            fontSize: '20px',
                                            color: '#ffffff'
                                        }}>{trainer.first_name} {trainer.last_name} 💪</Text>
                                        <Text style={{color: '#dddddd'}}>Specialty: {trainer.speciality} 🔍</Text>
                                        <Text style={{color: '#bbbbbb'}}>{trainer.experience} years of experience
                                            📆</Text>
                                    </Flex>
                                    <Flex direction={"column"}>
                                        <form onSubmit={(e) => {
                                            handleScheduleConsultation(e, trainer.id)
                                        }}>
                                            <TextField.Root
                                                style={{
                                                    marginBottom: 10,
                                                    '--date-picker-left': '12%', // Define a CSS variable for left position
                                                    '--date-picker-picker-left': '2%', // Define a CSS variable for left position of calendar picker
                                                    position: 'relative',
                                                }}
                                                className={'date-picker'}
                                                placeholder="Date of Birth"
                                                type="date"
                                                value={date}
                                                min={new Date().toISOString().split('T')[0]}
                                                onChange={(e) => setDate(e.target.value)}
                                                required
                                            />
                                            <Button style={{
                                                backgroundColor: '#007BFF',
                                                color: '#fff',
                                                padding: '10px 15px',
                                                borderRadius: '5px',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                                cursor: 'pointer'
                                            }} type={"submit"}>
                                                Schedule Consultation 📅
                                            </Button>
                                        </form>
                                    </Flex>
                                </Flex>
                            </Card>
                        ))}
                    </Box>
                </Card>
            </Flex>
        </Container>
    );
};

export default FindTrainerPage;
