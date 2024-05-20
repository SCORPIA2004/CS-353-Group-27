import React, { useEffect } from 'react';
import { Button, Card, Container, Flex, Heading, Text } from "@radix-ui/react-components";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

const WorkoutSummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workoutId, workoutName, duration, calories } = location.state || {};
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  useEffect(() => {
    const updateExerciseLog = async () => {
      try {
        const response = await fetch(`/api/exercise_log/${workoutId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            duration,
            calories_burnt: calories,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update exercise log');
        }
      } catch (error) {
        console.error('Failed to update exercise log:', error);
      }
    };

    if (isAuthenticated && workoutId) {
      updateExerciseLog();
    }
  }, [isAuthenticated, workoutId, duration, calories]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Flex
        direction="column"
        css={{
          gap: "20px",
          padding: "20px",
          width: "100%",
          background: "#000",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          height: "100vh",
        }}
      >
        <Heading css={{ textAlign: "center" }}>Workout Summary</Heading>

        <Card css={{ padding: "20px" }}>
          <Heading mb="3">{workoutName}</Heading>
          <Text>{new Date().toLocaleDateString()}</Text>
          <Text>
            {Math.floor(duration / 60)}:
            {(duration % 60).toFixed(0).padStart(2, "0")}
          </Text>
          <Text>{calories} kcals</Text>
        </Card>

        <Flex css={{ justifyContent: "center" }}>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default WorkoutSummaryPage;
