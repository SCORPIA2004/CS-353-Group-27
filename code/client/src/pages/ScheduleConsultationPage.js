import React, { useState } from "react";
import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { GET_CONSULTATIONS_URL } from "../helpers/ApiUrlHelper";

const ScheduleConsultationPage = () => {
  const navigate = useNavigate();
  let [date, setDate] = useState("");
  const [traineeId, setTraineeId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!date || !traineeId) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const requestBody = {
        traineeId: parseInt(traineeId, 10),
        date: new Date(date).toISOString(),
      };
      console.log("*** HERE data", requestBody);

      const response = await fetch(GET_CONSULTATIONS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you are handling the token correctly
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to schedule consultation");
      }

      setMessage("Consultation scheduled successfully!");
      setTimeout(() => navigate("/"), 2000); // navigate back to homepage or dashboard
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div
      style={{
        height: "calc(100vh - 52px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Flex justify="center" p="5">
        <Card>
          <form onSubmit={handleSubmit}>
            <Flex direction={"column"} p={"3"} justify={"center"}>
              <Heading m="1" align={"center"}>
                Schedule Consultation
              </Heading>
              <Text
                as="div"
                color="gray"
                size="2"
                style={{ textAlign: "center" }}
              >
                Please enter consultation details.
              </Text>
              {message && (
                <Text
                  as="div"
                  color="red"
                  size="2"
                  style={{ textAlign: "center", maxWidth: "370px" }}
                >
                  {message}
                </Text>
              )}
              <Flex justify="center" direction="column" gap="1" mt="3">
                <TextField.Root
                  placeholder="Trainee ID"
                  value={traineeId}
                  onChange={(e) => setTraineeId(e.target.value)}
                  required
                />
                <TextField.Root
                  style={{ marginTop: 10 }}
                  placeholder="Date of Consultation"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Flex>
              <Button my="4" type="submit">
                Schedule
              </Button>
              <Flex justify={"center"} align={"center"}>
                <Text size={"2"}>Go back to</Text>
                <Button
                  variant={"ghost"}
                  ml="5"
                  onClick={() => navigate("/")}
                  className={"cursor-pointer"}
                  style={{ cursor: "pointer" }}
                >
                  Homepage
                </Button>
              </Flex>
            </Flex>
          </form>
        </Card>
      </Flex>
    </div>
  );
};

export default ScheduleConsultationPage;
