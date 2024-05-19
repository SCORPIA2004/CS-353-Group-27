import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Flex, Heading, Text, Select, Option } from "@radix-ui/react-components";
import { useNavigate } from "react-router-dom";
import useCheckAuthenticated from "../utils/useCheckAuthenticated"; 

const TrainerHomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, isLoading] = useCheckAuthenticated();
  const [workouts, setWorkouts] = useState([]);
  const [filter, setFilter] = useState({ difficulty: '', duration: '', equipment: '' });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
    if (isAuthenticated) {
      fetchWorkouts();
    }
  }, [navigate, isLoading, isAuthenticated]);

  const fetchWorkouts = async () => {
    const query = `difficulty=${filter.difficulty}&duration=${filter.duration}&equipment=${filter.equipment}`;
    const response = await fetch(`/api/workouts?${query}`);
    const data = await response.json();
    setWorkouts(data);
  };

  const handleFilterChange = (field, value) => {
    setFilter(prev => ({ ...prev, [field]: value }));
    fetchWorkouts();
  };

  const style = {
    backgroundImage: `url('bg.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh'
  };

  return (
    <Container style={style}>
      <Flex justify="center" direction="column" css={{ gap: '$4', padding: '$6' }}>
        <Heading css={{ textAlign: 'center' }}>Hello Trainer</Heading>
        
        <Card>
          <Box css={{ overflowY: 'auto', maxHeight: '200px' }}>
            {workouts.map((workout, index) => (
              <Flex key={index} css={{ justifyContent: 'space-between' }}>
                <Text>{workout.name}</Text>
              </Flex>
            ))}
          </Box>
        </Card>
        
        <Select onValueChange={e => handleFilterChange('difficulty', e.target.value)}>
          {workouts.map(workout => workout.difficulty).filter((v, i, a) => a.indexOf(v) === i).map(difficulty => (
            <Option key={difficulty} value={difficulty}>{difficulty}</Option>
          ))}
        </Select>
        <Select onValueChange={e => handleFilterChange('duration', e.target.value)}>
          <Option value="15">Up to 15 Minutes</Option>
          <Option value="30">Up to 30 Minutes</Option>
          <Option value="45">Up to 45 Minutes</Option>
          <Option value="60">Up to 60 Minutes</Option>
          <Option value="75">Up to 75 Minutes</Option>
          <Option value="90">Up to 90 Minutes</Option>
          <Option value="90+">More than 90 Minutes</Option>
        </Select>
        <Select onValueChange={e => handleFilterChange('equipment', e.target.value)}>
          {workouts.flatMap(workout => workout.equipment).filter((v, i, a) => a.indexOf(v) === i).map(equipment => (
            <Option key={equipment} value={equipment}>{equipment}</Option>
          ))}
        </Select>

        <Button onClick={() => navigate('/createWorkout')}>Create Workout</Button>
      </Flex>
    </Container>
  );
};

export default TrainerHomePage;
