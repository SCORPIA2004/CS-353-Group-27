import React, { useState } from 'react';
import { Button, Card, Flex, Heading, Text, TextField, Box } from "@radix-ui/react-components";
import { useNavigate } from "react-router-dom";

const CreateWorkoutPage = () => {
  const navigate = useNavigate();
  const [workoutDetails, setWorkoutDetails] = useState({
    name: '',
    description: '',
    duration: '',
    equipments: []
  });
  const [newEquipment, setNewEquipment] = useState('');
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState({ name: '', duration: '', details: [] });
  const [newExerciseDetail, setNewExerciseDetail] = useState('');
  const [error, setError] = useState('');
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const handleAddEquipment = () => {
    if (newEquipment) {
      setWorkoutDetails(prev => ({
        ...prev,
        equipments: [...prev.equipments, newEquipment]
      }));
      setNewEquipment('');
    } else {
      setError("Equipment field cannot be empty.");
    }
  };

  const handleAddExerciseDetail = () => {
    if (newExerciseDetail) {
      setNewExercise(prev => ({
        ...prev,
        details: [...prev.details, newExerciseDetail]
      }));
      setNewExerciseDetail('');
    } else {
      setError("Exercise detail field cannot be empty.");
    }
  };

  const handleAddExercise = () => {
    if (newExercise.name && newExercise.duration) {
      setExercises([...exercises, newExercise]);
      setNewExercise({ name: '', duration: '', details: [] });
    } else {
      setError("Both exercise name and duration are required.");
    }
  };

  const handlePublish = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    const dataToSend = { ...workoutDetails, exercises };
    try {
      const response = await fetch('http://yourapi.com/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend)
      });

      if (!response.ok) {
        throw new Error('Failed to publish workout');
      }

      navigate('/trainerHome');
    } catch (error) {
      setError('Failed to publish the workout. Please try again.');
    }
  };

  return (
    <Flex justify='center' p='5'>
      <Card>
        <form onSubmit={handlePublish}>
          <Flex direction={'column'} p={'3'} justify={'center'}>
            <Heading m='1' align={'center'}>New Workout</Heading>
            {error && <Text as="div" color="red" size="2" style={{ textAlign: 'center' }}>{error}</Text>}
            <Flex justify='center' direction='column' gap='1' mt='3'>
              <TextField.Root size="1" placeholder="Workout Name" value={workoutDetails.name} onValueChange={value => setWorkoutDetails({...workoutDetails, name: value})} required />
              <TextField.Root size="1" placeholder="Description" value={workoutDetails.description} onValueChange={value => setWorkoutDetails({...workoutDetails, description: value})} required />
              <TextField.Root size="1" placeholder="Duration (minutes)" value={workoutDetails.duration} onValueChange={value => setWorkoutDetails({...workoutDetails, duration: value})} required />
              {workoutDetails.equipments.map((equipment, index) => (
                <Box key={index} css={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '8px' }}>{equipment}</Box>
              ))}
              <Flex>
                <TextField.Root placeholder="Add Equipment" value={newEquipment} onValueChange={setNewEquipment} />
                <Button onClick={handleAddEquipment}>+</Button>
              </Flex>
              {exercises.map((exercise, index) => (
                <Flex key={index} align="center">
                  <Box css={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '8px', width: '100%' }}>
                    <Text>{exercise.name} - {exercise.duration}</Text>
                    {exercise.details.map((detail, idx) => (
                      <Text key={idx}>{detail}</Text>
                    ))}
                  </Box>
                </Flex>
              ))}
              <Flex>
                <TextField.Root placeholder="Exercise Name" value={newExercise.name} onValueChange={name => setNewExercise({...newExercise, name})} />
                <TextField.Root placeholder="Duration" value={newExercise.duration} onValueChange={duration => setNewExercise({...newExercise, duration})} />
                <Button onClick={handleAddExercise} type="button">Add Exercise</Button>
              </Flex>
              <Flex>
                <TextField.Root placeholder="Add Exercise Detail" value={newExerciseDetail} onValueChange={setNewExerciseDetail} />
                <Button onClick={handleAddExerciseDetail} type="button">+</Button>
              </Flex>
            </Flex>
            <Button my='2' type="submit">Publish</Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
};

export default CreateWorkoutPage;
