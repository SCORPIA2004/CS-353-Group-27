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
} from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";
import { CONSULTATION_URL } from "../helpers/ApiUrlHelper";

// For trainee
const ConsultationsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
  const [consultations, setConsultations] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredConsultations, setFilteredConsultations] = useState([]);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(`${CONSULTATION_URL}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        // Sort consultations by date in descending order
        data = data.sort((b, a) => new Date(b.date) - new Date(a.date));
        setConsultations(data);
        setFilteredConsultations(data);
      } else {
        console.error("Error fetching consultations:");
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchConsultations();
    }
  }, [navigate, isLoading, isAuthenticated]);

  useEffect(() => {
    filterConsultations();
  }, [startDate, endDate, consultations]);

  const filterConsultations = () => {
    let filtered = consultations;
    if (startDate) {
      filtered = filtered.filter(
        (consultation) => new Date(consultation.date) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (consultation) => new Date(consultation.date) <= new Date(endDate)
      );
    }
    setFilteredConsultations(filtered);
  };

  const style = {
    width: "100%",
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  return (
    <Container style={style}>
      <Flex justify="center" direction="column" py={"4"} gap={"4"}>
        <Card>
          <Heading mb="3">Consultations ⏰</Heading>
          <Box>
            <Flex gap="3" justify="end" align="center" mb="4">
              <Text style={{ fontWeight: "bold" }}>Start Date:</Text>
              <TextField.Root
                type="date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Text style={{ fontWeight: "bold" }}>End Date:</Text>

              <TextField.Root
                type="date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Flex>

            <Card>
              <Flex
                direction={"row"}
                justify={"between"}
                style={{ fontWeight: "bold" }}
              >
                <Text>Name</Text>
                <Text>Consultation Date</Text>
              </Flex>
            </Card>

            {filteredConsultations.map((consultation, index) => (
              <Card style={{ marginBlock: "10px" }} key={index}>
                <Flex direction={"row"} justify={"between"}>
                  <Text>
                    {consultation.trainer_first_name}{" "}
                    {consultation.trainer_last_name}
                  </Text>
                  <Text>{formatDate(consultation.date)}</Text>
                </Flex>
              </Card>
            ))}
          </Box>
        </Card>
      </Flex>
    </Container>
  );
};

export default ConsultationsPage;
