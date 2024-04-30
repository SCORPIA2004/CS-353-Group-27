import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Flex, Heading, Text } from "@radix-ui/react-components";
import { useNavigate } from "react-router-dom";
import useCheckAuthenticated from "../utils/useCheckAuthenticated"; 

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, isLoading] = useCheckAuthenticated(); 
  const [lastWorkouts, setLastWorkouts] = useState([]);
  const [nutritionPlans, setNutritionPlans] = useState([]);

  useEffect(() => {
   
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }

    const fetchLastWorkouts = async () => {
      try {
        const response = await fetch('your_api/last-workouts');
        const data = await response.json();
        setLastWorkouts(data);
      } catch (error) {
        console.error('Failed to fetch last workouts:', error);
      }
    };

    const fetchNutritionPlans = async () => {
      try {
        const response = await fetch('your_api/nutrition-plans');
        const data = await response.json();
        setNutritionPlans(data);
      } catch (error) {
        console.error('Failed to fetch nutrition plans:', error);
      }
    };

    if (isAuthenticated) {
      fetchLastWorkouts();
      fetchNutritionPlans();
    }
  }, [navigate, isLoading, isAuthenticated]);

  return (
    <Container>
      <Flex justify="center" direction="column" css={{ gap: '$4', padding: '$6' }}>
        <Heading css={{ textAlign: 'center' }}>Homepage</Heading>
        
        <Flex justify="between" css={{ flexWrap: 'wrap', gap: '$4' }}>
          <Button onClick={() => navigate('/workout-selection')}>Start Workout</Button>
          <Button onClick={() => navigate('/nutrition-plan')}>Nutrition Plans</Button>
          <Button onClick={() => navigate('/leaderboard')}>Leaderboard</Button>
          <Button onClick={() => navigate('/create-workout')}>Create Workout</Button>
        </Flex>
        
        <Card>
          <Heading>Last Workouts</Heading>
          <Box css={{ overflowY: 'auto', maxHeight: '200px' }}>
            {lastWorkouts.map((workout, index) => (
              <Text key={index}>{workout.name} - {workout.date}</Text>
            ))}
          </Box>
        </Card>
        
        <Card>
          <Heading>Nutrition Plans</Heading>
          <Box css={{ overflowY: 'auto', maxHeight: '200px' }}>
            {nutritionPlans.map((plan, index) => (
              <Text key={index}>{plan.title}</Text>
            ))}
          </Box>
        </Card>
      </Flex>
    </Container>
  );
};

export default HomePage;
