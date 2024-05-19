import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Flex, Heading, Select, Text, TextField} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import {GOALS_URL} from "../helpers/ApiUrlHelper";
import useAuth from "../utils/useAuth";

const NewGoalPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [target, setTarget] = useState(0);
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');
    const {isAuthenticated, isLoading} = useAuth();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate('/login');
        }
    }, [isLoading, isAuthenticated]);

    const handleCreateGoal = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${GOALS_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({title, goal: type, target: parseInt(target), endDate}),
            });
            if (response.ok) {
                navigate('/goals');
            } else {
                setError('Failed to create goal. Please try again later.');
            }
        } catch (err) {
            setError('Failed to create goal. Please try again later.');
        }
    }

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            <Flex justify='center' p='5'>
                <Card>
                    <form onSubmit={handleCreateGoal}>
                        <Flex direction={'column'} p={'3'} justify={'center'}>
                            <Heading m='1' align={'center'}>Create A Goal</Heading>
                            <Text as="div" color="gray" size="2" style={{textAlign: 'center'}}>
                                Please provide informationto create a new goal.
                            </Text>
                            <Flex justify='center' direction='column' gap='1' mt='3'>
                                <TextField.Root
                                    placeholder="Goal Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <Select.Root value={type} onValueChange={setType}>
                                    <Select.Trigger>{type}</Select.Trigger>
                                    <Select.Content>
                                        <Select.Group>
                                            <Select.Label>Goal Type</Select.Label>
                                            <Select.Item value="weight_loss">Weight Loss</Select.Item>
                                            <Select.Item value="muscle_gain">Muscle Gain</Select.Item>
                                            <Select.Item value="cardio">Cardio</Select.Item>
                                            <Select.Item value="strength">Strength</Select.Item>
                                            <Select.Item value="flexibility">Flexibility</Select.Item>
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                                <TextField.Root
                                    placeholder="Target"
                                    onChange={(e) => setTarget(e.target.value)}
                                    required
                                />
                                <Text as="div" color="gray" size="1" style={{marginTop: 10}}>
                                    End Date (YYYY-MM-DD)
                                </Text>
                                <TextField.Root
                                    style={{marginBottom: 10}}
                                    placeholder="End Date"
                                    type="date"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    required
                                />
                            </Flex>
                            <Button my='4' type="submit" style={{cursor: 'pointer'}}>Create Goal</Button>
                        </Flex>
                    </form>
                </Card>
            </Flex>
        </div>
    );
}

export default NewGoalPage;
