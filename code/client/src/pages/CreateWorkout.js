import React, { useState } from 'react';
import { Button, Card, Flex, Heading, Text, TextField } from "@radix-ui/react-components";
import { useNavigate } from "react-router-dom";

const CreateWorkoutPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');

  const handleCreateWorkout = async (event) => {
    event.preventDefault();
    const workoutData = { name, description, duration };

    try {
      const response = await fetch('http://yourapi.com/workouts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workoutData)
      });

      if (response.ok) {
        navigate('/TrainerHomepage'); 
      } else {
        throw new Error('Failed to create workout');
      }
    } catch (error) {
      setError('Failed to create workout. Please try again.');
    }
  };

  return (
    <Flex justify='center' p='5'>
      <Card>
        <form onSubmit={handleCreateWorkout}>
          <Flex direction={'column'} p={'3'} justify={'center'}>
            <Heading m='1' align={'center'}>Create Workout</Heading>
            {error && (
              <Text as="div" color="red" size="2" style={{ textAlign: 'center' }}>
                {error}
              </Text>
            )}
            <Flex justify='center' direction='column' gap='1' mt='3'>
              <TextField.Root 
                size="1" 
                placeholder="Workout Name" 
                value={name}
                onValueChange={(value) => setName(value)} 
                required
              />
              <TextField.Root 
                size="1" 
                placeholder="Description" 
                value={description}
                onValueChange={(value) => setDescription(value)} 
                required
              />
              <TextField.Root 
                size="1" 
                placeholder="Duration (minutes)" 
                value={duration}
                onValueChange={(value) => setDuration(value)} 
                required
              />
            </Flex>
            <Button my='2' type="submit">Create</Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  );
}

export default CreateWorkoutPage;
