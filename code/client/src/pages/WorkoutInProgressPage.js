import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Flex, Heading, Text } from "@radix-ui/react-components";
import { useNavigate, useParams, Navigate } from "react-router-dom";

const WorkoutInProgressPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [sessionPaused, setSessionPaused] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const isAuthenticated = localStorage.getItem('isAuthenticated');

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
    fetchWorkoutDetails();
  }, [id]);

  useEffect(() => {
    if (!sessionPaused) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const sessionDurationInSeconds = (currentTime - sessionStartTime) / 1000;
        setSessionDuration(sessionDurationInSeconds);
        const calories = Math.floor(sessionDurationInSeconds / 60) * 5;
        setCaloriesBurned(calories);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sessionStartTime, sessionPaused]);

  const handlePauseWorkout = () => {
    setSessionPaused(!sessionPaused);
  };

  const handleEndWorkout = () => {
    navigate(`/workoutSummary/${id}`, { state: { duration: sessionDuration, calories: caloriesBurned } });
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Flex direction="column" css={{ gap: '20px', padding: '20px', width: '100%', background: '#000', color: '#fff', fontFamily: 'Arial, sans-serif', height: '100vh' }}>
        <Heading css={{ textAlign: 'center' }}>{workout ? workout.name : 'Loading...'}</Heading>
        
        <Card css={{ padding: '20px', textAlign: 'center' }}>
          <Heading css={{ fontSize: '48px' }}>{Math.floor(sessionDuration / 60)}:{(sessionDuration % 60).toFixed(0).padStart(2, '0')}</Heading>
          <Text css={{ color: 'yellow' }}>{caloriesBurned} kcals</Text>
        </Card>

        {workout && workout.exercises.map((exercise, index) => (
          <Flex key={index} css={{ justifyContent: 'space-between', marginBottom: '10px' }}>
            <Text>{exercise.duration}</Text>
            <Text>{exercise.name}</Text>
          </Flex>
        ))}

        <Flex css={{ justifyContent: 'center', gap: '20px' }}>
          <Button onClick={handlePauseWorkout}>{sessionPaused ? 'Resume' : 'Pause'}</Button>
          <Button onClick={handleEndWorkout}>End Workout</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default WorkoutInProgressPage;
