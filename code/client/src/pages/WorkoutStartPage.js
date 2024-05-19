import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Flex, Heading, Text } from "@radix-ui/react-components";
import { useNavigate, useParams, Navigate } from "react-router-dom";

const WorkoutStartPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userName, setUserName] = useState('');
  const [workout, setWorkout] = useState(null);
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const fetchUserName = async () => {
    try {
      const response = await fetch('your_api/user');
      const data = await response.json();
      setUserName(data.name);
    } catch (error) {
      console.error('Failed to fetch user name:', error);
    }
  };

  const fetchWorkoutDetails = async () => {
    try {
      const response = await fetch(`your_api/workouts/${id}`);
      const data = await response.json();
      setWorkout(data);
    } catch (error) {
      console.error('Failed to fetch workout details:', error);
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchWorkoutDetails();
  }, [id]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Flex direction="column" css={{ gap: '20px', padding: '20px', width: '100%', background: '#000', color: '#fff', fontFamily: 'Arial, sans-serif', height: '100vh' }}>
        <Button onClick={() => navigate('/')} css={{ alignSelf: 'flex-start' }}>
          ← Back
        </Button>
        <Heading css={{ textAlign: 'center' }}>Hello {userName},</Heading>
        
        <Card css={{ padding: '20px' }}>
          {workout && (
            <>
              <Heading>{workout.name}</Heading>
              <Text>Target audience: {workout.audience}</Text>
              <Text>{workout.description}</Text>
              <Text>Estimated Duration: {workout.duration} minutes</Text>
              <Text>Intensity: {workout.intensity}</Text>
              <Text>Required Equipment: {workout.equipment}</Text>
            </>
          )}
        </Card>

        <Flex css={{ justifyContent: 'center' }}>
          <Button onClick={() => navigate(`/workoutInProgress/${id}`)}>Start Workout</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default WorkoutStartPage;
