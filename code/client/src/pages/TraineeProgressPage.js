import React, { useEffect, useState } from "react";
import { Box, Card, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import { GET_TRAINEE_PROGRESS_URL } from "../helpers/ApiUrlHelper";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

const TraineeProgressPage = () => {
  const { traineeId } = useParams();
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  const fetchProgress = async () => {
    try {
      const response = await fetch(`${GET_TRAINEE_PROGRESS_URL}/${traineeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch progress");
      const data = await response.json();
      console.log("Fetched progress data:", data); // Log the data
      setProgress(data);
    } catch (error) {
      console.error("Error fetching progress:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProgress();
    } else if (!isLoading) {
      navigate("/login"); 
    }
  }, [traineeId, navigate, isLoading, isAuthenticated]);

  const style = {
    width: "100%",
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!progress) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Set to track unique goal IDs
  const uniqueGoalIds = new Set();

  return (
    <Container style={style}>
      <Flex justify="center" direction="column" py={"4"} gap={"4"}>
        <Heading css={{ textAlign: "center" }}>Trainee Progress</Heading>

        {/* Trainee Info */}
        <Card>
          <Heading>Trainee Info 🔍</Heading>
          <Box>
            <Card style={{ marginBlock: "15px", fontWeight: "bold" }}>
              <Flex direction={"row"} justify={"between"}>
                <Text>ID</Text>
                <Text>First name</Text>
                <Text>Last name</Text>
                <Text>Height</Text>
                <Text>Weight</Text>
              </Flex>
            </Card>

            <Card style={{ marginBlock: "10px", cursor: "pointer" }}>
              <Flex direction={"row"} justify={"between"}>
                <Text>{progress.trainee_id}</Text>
                <Text>{progress.first_name}</Text>
                <Text>{progress.last_name}</Text>
                <Text>{progress.height}</Text>
                <Text>{progress.weight}</Text>
              </Flex>
            </Card>
          </Box>
        </Card>

        {/* Goals */}
        <Card>
          <Heading>Goals 🎯</Heading>
          <Box css={{ overflowY: "auto", maxHeight: "200px" }}>
            <Card style={{ marginBlock: "15px", fontWeight: "bold" }}>
              <Flex direction={"row"} justify={"between"}>
                <Text>Title</Text>
                <Text>Type</Text>
                <Text>Current Value</Text>
                <Text>Target</Text>
                <Text>Start Date</Text>
                <Text>End Date</Text>
              </Flex>
            </Card>

            {progress.goals.map((goal, index) => {
              // Skip duplicate goals based on goal_id
              if (uniqueGoalIds.has(goal.goal_id)) {
                return null;
              }
              uniqueGoalIds.add(goal.goal_id);

              return (
                <Card
                  style={{ marginBlock: "10px", cursor: "pointer" }}
                  key={index}
                >
                  <Flex direction={"row"} justify={"between"}>
                    <Text>{goal.goal_title}</Text>
                    <Text>{goal.goal_type}</Text>
                    <Text>{goal.current_value}</Text>
                    <Text>{goal.target}</Text>
                    <Text>{formatDate(goal.start_date)}</Text>
                    <Text>{formatDate(goal.end_date)}</Text>
                  </Flex>
                </Card>
              );
            })}
          </Box>
        </Card>

        {/* Workout History */}
        <Card>
          <Heading>Workout History 💪</Heading>
          <Box css={{ overflowY: "auto", maxHeight: "200px" }}>
            <Card style={{ marginBlock: "15px", fontWeight: "bold" }}>
              <Flex direction={"row"} justify={"between"}>
                <Text>ID</Text>
                <Text>Title</Text>
                <Text>Duration</Text>
                <Text>Calories Burned</Text>
                <Text>Date</Text>
              </Flex>
            </Card>

            {progress.workouts.map((workout, index) => (
              <Card
                style={{
                  marginBlock: "10px",
                  cursor: "pointer",
                }}
                key={index}
              >
                <Flex direction={"row"} justify={"between"}>
                  <Text>{workout.workout_id}</Text>
                  <Text>{workout.workout_title}</Text>
                  <Text>{workout.workout_duration}</Text>
                  <Text>{workout.calories_burned}</Text>
                  <Text>{formatDate(workout.workout_date)}</Text>
                </Flex>
              </Card>
            ))}
          </Box>
        </Card>
      </Flex>
    </Container>
  );
};

export default TraineeProgressPage;
