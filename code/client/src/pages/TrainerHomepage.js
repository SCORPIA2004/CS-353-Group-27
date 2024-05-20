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
} from "@radix-ui/themes";


import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import {
  GET_CONSULTATIONS_URL,
  GET_TRAINEES_URL,
  GET_MY_WORKOUTS_URL,
  DELETE_WORKOUT_URL,
  UPDATE_WORKOUT_URL,
  CREATE_WORKOUT_URL,
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
  const [newWorkout, setNewWorkout] = useState({
    title: "",
    description: "",
    duration: "",
    difficulty: "Set Difficulty",
    required_equipment: "",
    intensity: "Set Intensity",
    
  });
  const [isCreating, setIsCreating] = useState(false);
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
    overflow: 'auto'
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



  const deleteWorkout = async (workoutId) => {
    try {
      const response = await fetch(`${DELETE_WORKOUT_URL}/${workoutId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete workout");
      const result = await response.json();
      alert(result.message);
      fetchMyWorkouts(); // Refresh the workouts list after deletion
      handleCloseModal(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };



 const updateWorkout = async (workoutId, updateData) => {
   try {
     const response = await fetch(`${UPDATE_WORKOUT_URL}/${workoutId}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
         Authorization: `Bearer ${localStorage.getItem("token")}`,
       },
       body: JSON.stringify(updateData),
     });
     if (!response.ok) throw new Error("Failed to update workout");
     const result = await response.json();
     alert(result.message);
     fetchMyWorkouts(); // Refresh the workouts list after update
     handleCloseModal(); // Close the modal after update
   } catch (error) {
     console.error("Error updating workout:", error);
   }
 };



  const createWorkout = async () => {
    try {
      const response = await fetch(CREATE_WORKOUT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newWorkout),
      });
      if (!response.ok) throw new Error("Failed to create workout");
      const result = await response.json();
      alert(result.message);
      fetchMyWorkouts(); // Refresh the workouts list after creation
      setIsCreating(false); // Close the creation form
      setNewWorkout({
        title: "",
        description: "",
        duration: "",
        difficulty: "",
        required_equipment: "",
        intensity: "",
      });
    } catch (error) {
      console.error("Error creating workout:", error);
    }
  };

  const handleChange = (e) => {
    setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createWorkout();
  };



  return (
    <Container style={style}>
      <Flex justify="center" direction="column" py={"4"} gap={"4"}>
        <Heading css={{ textAlign: "center" }}>Trainer Homepage</Heading>
{isCreating && (
          <Card>
            <Heading style={{ padding: "10px" }} align="center" mb="5">
              Create New Workout
            </Heading>
            <form onSubmit={handleSubmit}>
              <Flex direction={"column"} gap={"2"}>
                <Flex direction={"row"} justify={"center"} gap={"2"}>
                  <TextField.Root
                    name="title"
                    placeholder="Title"
                    value={newWorkout.title}
                    onChange={handleChange}
                  />
                  <TextField.Root
                    name="duration"
                    type="number"
                    placeholder="Duration (minutes)"
                    value={newWorkout.duration}
                    onChange={handleChange}
                  />
                </Flex>

                <Flex direction={"row"} justify={"center"} gap={"2"}>
                  <Select.Root
                    value={newWorkout.difficulty}
                    onValueChange={(value) =>
                      setNewWorkout({ ...newWorkout, difficulty: value })
                    }
                  >
                    <Select.Trigger>
                      {newWorkout.difficulty || "Difficulty"}
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="beginner">Beginner</Select.Item>
                        <Select.Item value="intermediate">
                          Intermediate
                        </Select.Item>
                        <Select.Item value="advanced">Advanced</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>

                  <Select.Root
                    value={newWorkout.intensity}
                    onValueChange={(value) =>
                      setNewWorkout({ ...newWorkout, intensity: value })
                    }
                  >
                    <Select.Trigger>
                      {newWorkout.intensity || "Intensity"}
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="low">Low</Select.Item>
                        <Select.Item value="medium">Medium</Select.Item>
                        <Select.Item value="high">High</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>

                <TextField.Root
                  name="description"
                  placeholder="Description"
                  value={newWorkout.description}
                  onChange={handleChange}
                />
                <TextField.Root
                  name="required_equipment"
                  placeholder="Required Equipment"
                  value={newWorkout.required_equipment}
                  onChange={handleChange}
                />

                <Flex justify={"center"} p="2" gap={"2"}>
                  <Button type="submit">Create</Button>
                  <Button type="button" onClick={() => setIsCreating(false)}>
                    Cancel
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Card>
        )}

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
            <Flex justify="between">
              <Heading>My Workouts 💪</Heading>
              <Button
                style={{ cursor: "pointer" }}
                onClick={() => setIsCreating(true)}
                
              >
                <Text style={{fontSize:"20px"}}>+</Text>
              </Button>
            </Flex>

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
                  }}
                  key={index}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {" "}
                  <Flex direction={"row"} justify={"between"}>
                    <Text>{myWorkouts.id}</Text>
                    <Text>{myWorkouts.title}</Text>
                    <Text>{myWorkouts.difficulty}</Text>
                    <Text>{myWorkouts.intensity}</Text>
                    <Button
                      style={{
                        cursor: "pointer",
                        height: "26px",
                        fontSize: "13px",
                      }}
                      onClick={() => handleViewWorkout(myWorkouts)}
                    >
                      More
                    </Button>
                  </Flex>
                </Card>
              ))}
            </Box>
          </Card>
        </Flex>
      </Flex>

      {selectedWorkout && (
        <div style={{border: '1px solid red', height: '100%', width: '100%'}}>
          <button onClick={() => handleOpenModal(selectedWorkout)}>
            {/* View Workout Details */}
          </button>
          {selectedWorkout && (
            <Modal
              workoutDetails={selectedWorkout}
              onClose={handleCloseModal}
              deleteWorkout={deleteWorkout}
              updateWorkout={updateWorkout}
            />
          )}
        </div>
      )}
    </Container>
  );

};

export default TrainerHomePage;
