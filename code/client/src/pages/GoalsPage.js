import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { GOALS_URL, LOGIN_URL, UPDATE_GOALS_URL, WORKOUTS_URL } from "../helpers/ApiUrlHelper"; // assuming this hook provides the token

const GoalsPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading, token } = useAuth(); // assuming token is provided by useAuth
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // state for handling errors
    const [valueToBeUpdated, setValueToBeUpdated] = useState(null);

    const fetchGoals = async () => {
        try {
            const response = await fetch(GOALS_URL, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setGoals(data);
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
        if (!isAuthenticated && !isLoading) {
            navigate('/login')
        }

        if (isAuthenticated) {
            fetchGoals();
        }
    }, [isAuthenticated, isLoading]);

    const updateGoal = async (goalId) => {
        if (!valueToBeUpdated) {
            setError('Please enter a value to update the goal.');
            return;
        }

        try {
            const response = await fetch(`${UPDATE_GOALS_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ goalId: parseInt(goalId), value: parseInt(valueToBeUpdated) }),
            });
            if (response.ok) {
                setValueToBeUpdated(null);
                fetchGoals();
            } else {
                setError('Failed to update goal. Please try again later.');
            }
        } catch (err) {
            setError('Failed to update goal. Please try again later.');
        }
    }

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
                    <Flex direction={"row"} align={"center"} justify={"between"} style={{ width: '100%' }}>
                        <Heading css={{ textAlign: 'center' }}>Goals</Heading>
                        <Button style={{ backgroundColor: 'darkgreen', cursor: 'pointer' }} onClick={() => {
                            navigate('/goals/create-goal')
                        }}>Create New Goal</Button>
                    </Flex>

                    {loading ? (
                        <Text>Loading goals...</Text>
                    ) : error ? (
                        <Text>{error}</Text>
                    ) : (
                        <Flex direction="column" gap={"4"}>
                            {goals
                                .filter((goal, index, self) => self.findIndex(t => t.goal_id === goal.goal_id) === index)
                                .map((goal, index) => (
                                    <Card key={index}>
                                        <Flex justify="between" align="center" direction="row" gap="2">
                                            {/* Goal card content */}
                                            <div>
                                                <Flex direction={"column"}>
                                                    <div>
                                                        <Flex direction={"column"}>
                                                            <Heading style={{ marginBottom: '8px' }}>{goal.goal_title} | {goal.goal_type}🏆 </Heading>

                                                            <Flex direction={"row"} align={"center"} gap={"2"}>
                                                                <Text>📈 Current:</Text>
                                                                <TextField.Root
                                                                    placeholder={goal.current_value}
                                                                    onChange={(e) => setValueToBeUpdated(e.target.value)}
                                                                    style={{ width: '70px' }}
                                                                />
                                                            </Flex>
                                                            <Text>🎯 Target: {goal.target}</Text>
                                                            <Text>🔢 Remaining: {Math.abs(goal.current_value - goal.target)}</Text>
                                                        </Flex>
                                                    </div>
                                                </Flex>
                                            </div>
                                            <Flex direction={"column"} gap={"2"} align={"center"}>
                                                <Text>
                                                    📅 {new Date(goal.end_date).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: '2-digit'
                                                })}
                                                </Text>
                                                <Button style={{ marginRight: '13px', cursor: 'pointer' }} onClick={() => { updateGoal(goal.goal_id) }}>
                                                    🔄 Update Current Value
                                                </Button>
                                                <Button style={{ marginRight: '13px', cursor: 'pointer', backgroundColor: 'transparent', border: '1px solid' }}
                                                        onClick={() => navigate(`/goals/suggestion/${goal.goal_id}`)}>
                                                    💡 Get Hint
                                                </Button>
                                            </Flex>
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

export default GoalsPage;
