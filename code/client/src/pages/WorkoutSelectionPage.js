import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { WORKOUTS_URL } from "../helpers/ApiUrlHelper";
import { MagnifyingGlassIcon, FilterIcon } from "@radix-ui/react-icons";

const WorkoutSelectionPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // state for handling errors

  const fetchWorkouts = async () => {
    try {
      let url = `${WORKOUTS_URL}?`;
      if (searchTerm) {
        url += `title=${searchTerm}&`;
      }
      if (difficulty && difficulty !== "No Preference") {
        url += `difficulty=${difficulty.toLowerCase()}&`;
      }

      const response = await fetch(url, {
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
    if (isAuthenticated) {
      fetchWorkouts();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchWorkouts();
    }
  }, [searchTerm, difficulty]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setDifficulty("");
  };

  const style = {
    backgroundImage: `url('bg.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  };

  return (
    <div style={style}>
      <Container>
        <Flex justify="center" direction="column" gap="4" py={"4"}>
          <Card
            style={{
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <Heading style={{ color: "#f5f5f5" }}>Workouts 💪</Heading>
            <Box>
              <Flex gap={"3"} justify="center" align="center" mb="4">
                <Flex
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <TextField.Root
                    type="text"
                    placeholder="Search workouts"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Flex>

                <Select.Root value={difficulty} onValueChange={setDifficulty}>
                  <Select.Trigger>
                    <Flex align="center" gap="2">
                      {difficulty || "Difficulty"}
                    </Flex>
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Group>
                      <Select.Item value="No Preference">
                        No Preference
                      </Select.Item>
                      <Select.Item value="beginner">Beginner</Select.Item>
                      <Select.Item value="intermediate">
                        Intermediate
                      </Select.Item>
                      <Select.Item value="advanced">Advanced</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>

                <Button style={{ cursor: "pointer" }} onClick={fetchWorkouts}>
                  Search
                </Button>
                <Button
                  style={{ cursor: "pointer" }}
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </Flex>

              {loading ? (
                <Text>Loading workouts...</Text>
              ) : error ? (
                <Text>{error}</Text>
              ) : (
                <Flex direction="column" gap={"4"}>
                  {workouts.map((workout, index) => (
                    <Card
                      style={{
                        marginBlock: "10px",
                        padding: "15px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        cursor: "pointer",
                      }}
                      key={index}
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
                          onClick={() =>
                            navigate(`/active-workout/${workout.id}`)
                          }
                        >
                          Start Workout
                        </Button>
                      </Flex>
                    </Card>
                  ))}
                </Flex>
              )}
            </Box>
          </Card>
        </Flex>
      </Container>
    </div>
  );
};

export default WorkoutSelectionPage;
