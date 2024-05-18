import React, { useEffect, useState } from "react";
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
import useAuth from "../utils/useAuth";
import {
  GET_CONSULTATIONS_URL,
  GET_TRAINEES_URL,
} from "../helpers/ApiUrlHelper";

// For trainer
const TrainerHomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [scheduledConsultations, setScheduledConsultations] = useState([]);
  const [trainees, setTrainees] = useState([]);

  const fetchConsultations = async () => {
  try {
    const response = await fetch(GET_CONSULTATIONS_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch consultations");
    const data = await response.json();
    setScheduledConsultations(data);
  } catch (error) {
    console.error("Error fetching consultations:", error);
  }
};

  const fetchTrainees = async () => {
    try {
    const response = await fetch(GET_TRAINEES_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!response.ok) throw new Error("Failed to fetch trainees");
      const data = await response.json();
      setTrainees(data);
    } catch (error) {
      console.error("Failed to fetch trainees:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchConsultations();
      fetchTrainees();
    }
  }, [navigate, isLoading, isAuthenticated]);

  const style = {
    width: "100%",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Container style={style}>
      <Flex justify="center" direction="column" py={"4"} gap={"4"}>
        <Heading css={{ textAlign: "center" }}>Trainer Homepage</Heading>

        <Flex justify="between">
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/trainee-selection")}
          >
            View Trainees
          </Button>
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/schedule-consultation")}
          >
            Schedule Consultation
          </Button>
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/review-progress")}
          >
            Review Progress
          </Button>
        </Flex>

        <Card>
          <Heading>Scheduled Consultations</Heading>
          <Box>
            <Card style={{ marginBlock: "10px", fontWeight: "bold" }}>
              <Flex direction={"row"} justify={"between"}>
                <Text>Date</Text>
                <Text>Trainee ID</Text>
              </Flex>
            </Card>

            {scheduledConsultations.map((consultation, index) => (
              <Card
                style={{ marginBlock: "10px", cursor: "pointer" }}
                key={index}
              >
                <Flex direction={"row"} justify={"between"}>
                  <Text>{formatDate(consultation.date)}</Text>
                  <Text>{consultation.trainee_id}</Text>
                </Flex>
              </Card>
            ))}
          </Box>
        </Card>

        <Card>
          <Heading>My Trainees</Heading>
          <Box css={{ overflowY: "auto", maxHeight: "200px" }}>
            <Card style={{ marginBlock: "10px", fontWeight: "bold" }}>
              <Flex direction={"row"} justify={"between"}>
                <Text>ID</Text>
                <Text>First name</Text>
                <Text>Last name</Text>
                <Text>Height</Text>
                <Text>Weight</Text>
              </Flex>
            </Card>

            {trainees.map((trainee, index) => (
              <Card
                style={{ marginBlock: "10px", cursor: "pointer" }}
                key={index}
              >
                <Flex direction={"row"} justify={"between"}>
                  <Text>{trainee.trainee_id}</Text>
                  <Text>{trainee.first_name}</Text>
                  <Text>{trainee.last_name}</Text>
                  <Text>{trainee.height}</Text>
                  <Text>{trainee.weight}</Text>
                </Flex>
              </Card>
            ))}
          </Box>
        </Card>
      </Flex>
    </Container>
  );

};

export default TrainerHomePage;
