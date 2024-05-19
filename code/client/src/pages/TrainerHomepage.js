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
        <div>
          <button onClick={() => handleOpenModal(workouts[0])}>
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
