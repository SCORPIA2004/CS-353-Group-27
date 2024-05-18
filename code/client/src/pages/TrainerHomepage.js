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
  GET_MY_WORKOUTS_URL,
} from "../helpers/ApiUrlHelper";
import Modal from "../components/Modal";


// For trainer
const TrainerHomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [scheduledConsultations, setScheduledConsultations] = useState([]);
  const [trainees, setTrainees] = useState([]);
  const [myWorkouts, setMyWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [hovered, setHovered] = useState(false);


  const handleViewWorkout = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleOpenModal = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseModal = () => {
    setSelectedWorkout(null);
  };



  
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

  const fetchMyWorkouts = async () => {
    try {
      const response = await fetch(GET_MY_WORKOUTS_URL, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch workouts");
      const data = await response.json();
      setMyWorkouts(data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };



  useEffect(() => {
    if (isAuthenticated) {
      fetchConsultations();
      fetchTrainees();
      fetchMyWorkouts();
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

  function getColorForDifficulty(difficulty) {
    switch (difficulty) {
      case "beginner": 
        return "green";
      case "intermediate":
        return "orange";
      case "advanced":
        return "red";
      default:
        return "grey";
    }
  }



  return (
    <Container style={style}>
      <Flex justify="center" direction="column" py={"4"} gap={"4"}>
        <Heading css={{ textAlign: "center" }}>Trainer Homepage</Heading>

        <Flex justify="between">
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </Button>
        </Flex>

        {/* Trainees */}
        <Card>
          <Heading>My Trainees 🙋‍♂️</Heading>
          <Box css={{ overflowY: "auto", maxHeight: "200px" }}>
            <Card style={{ marginBlock: "15px", fontWeight: "bold" }}>
              <Flex direction={"row"} justify={"between"}>
                <Text>ID</Text>
                <Text>First name</Text>
                <Text>Last name</Text>
                <Text>Height</Text>
                <Text>Weight</Text>
                <Text>Track Progress</Text>
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
                  <Button
                    style={{
                      cursor: "pointer",
                      height: "26px",
                      fontSize: "13px",
                    }}
                    onClick={() =>
                      navigate(`/trainee-progress/${trainee.trainee_id}`)
                    }
                  >
                    Progress
                  </Button>
                </Flex>
              </Card>
            ))}
          </Box>
        </Card>

        <Flex justify="center" direction="row" py={"4"} gap={"4"}>
          {/* scheduled consultations */}
          <Card style={{ flex: 2 }}>
            <Heading>Scheduled Consultations ⏰</Heading>
            <Box>
              <Card style={{ marginBlock: "15px", fontWeight: "bold" }}>
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

          {/* My workouts */}
          <Card style={{ flex: 3 }}>
            <Heading>My Workouts 💪</Heading>
            <Box css={{ overflowY: "auto", maxHeight: "200px" }}>
              <Card style={{ marginBlock: "15px", fontWeight: "bold" }}>
                <Flex direction={"row"} justify={"between"}>
                  <Text>ID</Text>
                  <Text>Title</Text>
                  <Text>Difficulty</Text>
                  <Text>Intensity</Text>
                </Flex>
              </Card>

              {myWorkouts.map((myWorkouts, index) => (
                <Card
                  style={{
                    marginBlock: "10px",
                    cursor: "pointer",
                    backgroundColor: hovered ? "#008B8B" : "initial", // Change color on hover
                    color: hovered ? "black" : "initial", // Change text color on hover
                  }}
                  key={index}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onClick={() => handleViewWorkout(myWorkouts)}
                >
                  {" "}
                  <Flex direction={"row"} justify={"between"}>
                    <Text>{myWorkouts.id}</Text>
                    <Text>{myWorkouts.title}</Text>
                    <Text>{myWorkouts.difficulty}</Text>
                    <Text>{myWorkouts.intensity}</Text>
                  </Flex>
                </Card>
              ))}
            </Box>
          </Card>
        </Flex>
      </Flex>

      {selectedWorkout && (
        <div>
          <button onClick={() => handleOpenModal(workouts[0])}>
            {/* View Workout Details */}
          </button>
          {selectedWorkout && (
            <Modal
              workoutDetails={selectedWorkout}
              onClose={handleCloseModal}
            />
          )}
        </div>
      )}
    </Container>
  );

};

export default TrainerHomePage;
