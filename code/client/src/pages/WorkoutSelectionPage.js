import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
  Select,
  Icon
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { WORKOUTS_URL } from "../helpers/ApiUrlHelper"; // assuming this hook provides the token
import { MagnifyingGlassIcon, FilterIcon } from "@radix-ui/react-icons";

const WorkoutSelectionPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, token } = useAuth(); // assuming token is provided by useAuth
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // state for handling errors
  const [searchTerm, setSearchTerm] = useState(""); // state for handling search input
  const [difficulty, setDifficulty] = useState(""); // state for handling difficulty filter

  const fetchWorkouts = async () => {
    try {
      const response = await fetch(WORKOUTS_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
      } else {
        setError("Failed to fetch workouts. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching workouts:", error);
      setError("Failed to connect to the service. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      fetchWorkouts();
    } else if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading]);

  const style = {
    backgroundImage: `url('bg.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  };

  const filteredWorkouts = workouts.filter(
    (workout) =>
      workout.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (difficulty ? workout.difficulty === difficulty : true)
  );

  return (
    <div style={style}>
      <Container>
        <Flex justify="center" direction="column" gap="4" py={"4"}>
          <Heading css={{ textAlign: "center" }}>Select a Workout</Heading>

          <Flex direction="row" gap="2" justify="center" mb="4">
            <Flex
              align="center"
              style={{ position: "relative", marginBottom: "20px" }}
            >
              <MagnifyingGlassIcon
                style={{ position: "absolute", left: "10px", zIndex: 1 }}
              />
              <TextField.Root
                  type="text"
                  placeholder="Search workouts"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ paddingLeft: "30px" }} // Add padding to the left to make space for the icon
                />
            </Flex>

            <Select.Root
              value={difficulty}
              onValueChange={(value) => setDifficulty(value)}
            >
              <Select.Trigger>{difficulty || "Difficulty"}</Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.Label>Difficulty</Select.Label>
                  <Select.Item value="beginner">Beginner</Select.Item>
                  <Select.Item value="intermediate">Intermediate</Select.Item>
                  <Select.Item value="advanced">Advanced</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Flex>
          {loading ? (
            <Text>Loading workouts...</Text>
          ) : error ? (
            <Text>{error}</Text>
          ) : (
            <Flex direction="column" gap={"4"}>
              {filteredWorkouts.map((workout, index) => (
                <Card
                  key={index}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/workout/${workout.id}`)}
                >
                  <Flex
                    justify="between"
                    align="center"
                    direction="row"
                    gap="2"
                  >
                    <div>
                      <Flex direction={"column"}>
                        <div style={{ marginBottom: "20px" }}>
                          <Heading style={{ marginBottom: "8px" }}>
                            {workout.title}
                          </Heading>
                          <Text>{workout.description}</Text>
                        </div>
                        <Text>
                          {workout.duration} mins, {workout.difficulty}.
                        </Text>
                      </Flex>
                    </div>
                    <Button
                      style={{ marginRight: "13px", cursor: "pointer" }}
                      onClick={() => navigate(`/active-workout/${workout.id}`)}
                    >
                      Start Workout
                    </Button>
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

export default WorkoutSelectionPage;
