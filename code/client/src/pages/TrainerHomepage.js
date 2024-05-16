import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Flex, Heading, Text } from "@radix-ui/react-components";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

const HomePage = () => {
  const navigate = useNavigate();
  const {isAuthenticated, isLoading} = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }

    if (isAuthenticated) {
    }
  }, [navigate, isLoading, isAuthenticated]);

  const style = {
    backgroundImage: `url('bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh'
  };

  return (
    <Container style={style}>
      <Flex justify="center" direction="column" css={{ gap: '$4', padding: '$6' }}>
        <Heading css={{ textAlign: 'center' }}>Trainer Dashboard</Heading>
        
        <Flex justify="center" css={{ flexWrap: 'wrap', gap: '$4' }}>
          <Button onClick={() => navigate('/create-workout')}>Create Workout</Button>
        </Flex>
        
        {}
        <Card>
          <Heading>Last Created Workouts</Heading>
          <Box css={{ overflowY: 'auto', maxHeight: '200px' }}>
            {lastWorkouts.map((workout, index) => (
              <Text key={index}>{workout.name} - {workout.date}</Text>
            ))}
          </Box>
        </Card>
      </Flex>
    </Container>
  );
};

export default HomePage;
