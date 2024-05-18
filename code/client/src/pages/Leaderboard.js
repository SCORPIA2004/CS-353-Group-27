import React, { useEffect, useState } from "react";
import useAuth from "../utils/useAuth";
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { GET_LEADERBOARD_URL } from "../helpers/ApiUrlHelper";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(GET_LEADERBOARD_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch leaderboard");
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeaderboard();
    }
  }, [navigate, isLoading, isAuthenticated]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (leaderboard.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Flex justify="center" direction="column" py={"4"} gap={"4"}>
        <Heading css={{ textAlign: "center" }}>Leaderboard</Heading>
        <Box css={{ overflowY: "auto", maxHeight: "400px" }}>
          <Card style={{ marginBlock: "15px", fontWeight: "bold" }}>
            <Flex direction={"row"} justify={"between"}>
              <Text>ID</Text>
              <Text>First Name</Text>
              <Text>Last Name</Text>
              <Text>DOB</Text>
              <Text>Score</Text>
            </Flex>
          </Card>

          {leaderboard.map((user, index) => (
            <Card
              style={{ marginBlock: "10px", cursor: "pointer" }}
              key={index}
            >
              <Flex direction={"row"} justify={"between"}>
                <Text>{user.id}</Text>
                <Text>{user.first_name}</Text>
                <Text>{user.last_name}</Text>
                <Text>{user.dob}</Text>
                <Text>{user.score}</Text>
              </Flex>
            </Card>
          ))}
        </Box>

        <Flex justify="center">
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Back
          </Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Leaderboard;
