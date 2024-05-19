import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Container, Flex, Heading, Text, Select, Option } from "@radix-ui/react-components";
import { useNavigate } from "react-router-dom";
import useCheckAuthenticated from "../utils/useCheckAuthenticated";

const HomePage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, isLoading] = useCheckAuthenticated();
  const [userName, setUserName] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [availableFilter, setAvailableFilter] = useState({ difficulty: '', duration: '', equipment: '' });
  const [historyFilter, setHistoryFilter] = useState({ date: '', duration: '', difficulty: '', equipment: '' });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }

    const fetchData = async () => {
      try {
        const userResponse = await fetch('your_api/user');
        const userData = await userResponse.json();
        setUserName(userData.name);

        fetchWorkouts();
        fetchWorkoutHistory();
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [navigate, isLoading, isAuthenticated]);

  const fetchWorkouts = async () => {
    const query = `difficulty=${availableFilter.difficulty}&duration=${availableFilter.duration}&equipment=${availableFilter.equipment}`;
    const response = await fetch(`your_api/workouts?${query}`);
    const data = await response.json();
    setWorkouts(data.slice(0, 5)); // Default 5
  };

  const fetchWorkoutHistory = async () => {
    const query = `date=${historyFilter.date}&duration=${historyFilter.duration}&difficulty=${historyFilter.difficulty}&equipment=${historyFilter.equipment}`;
    const response = await fetch(`your_api/exercise_log?${query}`);
    const data = await response.json();
    setWorkoutHistory(data);
  };

  const handleAvailableFilterChange = (field, value) => {
    setAvailableFilter(prev => ({ ...prev, [field]: value }));
    fetchWorkouts();
  };

  const handleHistoryFilterChange = (field, value) => {
    setHistoryFilter(prev => ({ ...prev, [field]: value }));
    fetchWorkoutHistory();
  };

  const handleWorkoutSelect = (workout) => {
    navigate(`/workoutStart/${workout.id}`);
  };

  const handleHistorySelect = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleCloseDetails = () => {
    setSelectedWorkout(null);
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
      <Flex direction="column" css={{ gap: '20px', padding: '20px', width: '100%', background: '#000', color: '#fff', fontFamily: 'Arial, sans-serif', height: '100vh' }}>
        <Heading css={{ textAlign: 'center' }}>Hello {userName},</Heading>

        <Heading css={{ marginTop: '20px', marginBottom: '10px' }}>Available Workouts</Heading>
        <Select onValueChange={e => handleAvailableFilterChange('difficulty', e.target.value)}>
          {workouts.map(workout => workout.difficulty).filter((v, i, a) => a.indexOf(v) === i).map(difficulty => (
            <Option key={difficulty} value={difficulty}>{difficulty}</Option>
          ))}
        </Select>
        <Select onValueChange={e => handleAvailableFilterChange('duration', e.target.value)}>
          <Option value="15">Up to 15 Minutes</Option>
          <Option value="30">Up to 30 Minutes</Option>
          <Option value="45">Up to 45 Minutes</Option>
          <Option value="60">Up to 60 Minutes</Option>
          <Option value="75">Up to 75 Minutes</Option>
          <Option value="90">Up to 90 Minutes</Option>
          <Option value="90+">More than 90 Minutes</Option>
        </Select>
        <Select onValueChange={e => handleAvailableFilterChange('equipment', e.target.value)}>
          {workouts.flatMap(workout => workout.equipment).filter((v, i, a) => a.indexOf(v) === i).map(equipment => (
            <Option key={equipment} value={equipment}>{equipment}</Option>
          ))}
        </Select>
        <Box css={{ overflowY: 'auto', maxHeight: '200px' }}>
          {workouts.map((workout, index) => (
            <Button key={index} onClick={() => handleWorkoutSelect(workout)} css={{ width: '100%', justifyContent: 'space-between' }}>
              {workout.name} <span></span>
            </Button>
          ))}
        </Box>

        <Heading css={{ marginTop: '20px', marginBottom: '10px' }}>Workout History</Heading>
        <Select onValueChange={e => handleHistoryFilterChange('date', e.target.value)}>
          <Option value="today">Today</Option>
          <Option value="this_week">This Week</Option>
          <Option value="this_month">This Month</Option>
          <Option value="all_time">All Time</Option>
        </Select>
        <Select onValueChange={e => handleHistoryFilterChange('duration', e.target.value)}>
          <Option value="15">Up to 15 Minutes</Option>
          <Option value="30">Up to 30 Minutes</Option>
          <Option value="45">Up to 45 Minutes</Option>
          <Option value="60">Up to 60 Minutes</Option>
          <Option value="75">Up to 75 Minutes</Option>
          <Option value="90">Up to 90 Minutes</Option>
          <Option value="90+">More than 90 Minutes</Option>
        </Select>
        <Select onValueChange={e => handleHistoryFilterChange('difficulty', e.target.value)}>
          {workouts.map(workout => workout.difficulty).filter((v, i, a) => a.indexOf(v) === i).map(difficulty => (
            <Option key={difficulty} value={difficulty}>{difficulty}</Option>
          ))}
        </Select>
        <Select onValueChange={e => handleHistoryFilterChange('equipment', e.target.value)}>
          {workoutHistory.flatMap(history => history.equipment).filter((v, i, a) => a.indexOf(v) === i).map(equipment => (
            <Option key={equipment} value={equipment}>{equipment}</Option>
          ))}
        </Select>
        <Box css={{ overflowY: 'auto', maxHeight: 'calc(100vh - 460px)' }}>
          {workoutHistory.map((history, index) => (
            <Button key={index} onClick={() => handleHistorySelect(history)} css={{ width: '100%', justifyContent: 'space-between', backgroundColor: history.level === 'beginner' ? 'green' : 'red' }}>
              {history.name} <span></span>
            </Button>
          ))}
        </Box>

        {selectedWorkout && (
          <Box css={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#000', color: '#fff', zIndex: 1000, overflowY: 'auto' }}>
            <Button onClick={handleCloseDetails} css={{ margin: '10px' }}>Back</Button>
            <Card css={{ margin: '20px', padding: '20px' }}>
              <Heading>{selectedWorkout.name}</Heading>
              <Text>Date: {selectedWorkout.date}</Text>
              <Text>Duration: {selectedWorkout.duration}</Text>
              <Text>Calories Burned: {selectedWorkout.caloriesBurnt}</Text>
            </Card>
          </Box>
        )}

        <Flex css={{ marginTop: 'auto', justifyContent: 'space-between' }}>
          <Button onClick={() => navigate('/')}>HomePage</Button>
          <Button onClick={() => navigate('/leaderBoard')}>Leaderboard</Button>
        </Flex>
      </Flex>
    </Container>
  );
};

export default HomePage;
