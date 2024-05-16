import React, { useState } from 'react';
import { Button, Card, Flex, Heading, Text, TextField, Select } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('trainee'); 
  const [message, setMessage] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://yourapi.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }) 
      });

      if (response.ok) {
        setMessage('Registration successful!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        throw new Error('Failed to register');
      }
    } catch (error) {
      setMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div style={{ 
      backgroundImage: "url('bg.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100vw'
    }}>
      <Flex justify='center' p='5'>
        <Card>
          <form onSubmit={handleRegistration}>
            <Flex direction={'column'} p={'3'} justify={'center'}>
              <Heading m='1' align={'center'}>Register</Heading>
              <Text as="div" color="gray" size="2">
                Please provide your details to create an account.
              </Text>
              {message && (
                <Text as="div" color="red" size="2" style={{ textAlign: 'center' }}>
                  {message}
                </Text>
              )}
              <Flex justify='center' direction='column' gap='1' mt='3'>
                <TextField.Root 
                  size="1" 
                  placeholder="Email" 
                  value={email}
                  onValueChange={(value) => setEmail(value)} 
                  required
                />
                <TextField.Root 
                  size="1" 
                  placeholder="Password" 
                  type="password"
                  value={password}
                  onValueChange={(value) => setPassword(value)} 
                  required
                />
                <TextField.Root 
                  size="1" 
                  placeholder="Confirm Password" 
                  type="password"
                  value={confirmPassword}
                  onValueChange={(value) => setConfirmPassword(value)} 
                  required
                />
                <Select.Root value={role} onValueChange={setRole}>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Group>
                      <Select.Label>Role</Select.Label>
                      <Select.Item value="trainee">Trainee</Select.Item>
                      <Select.Item value="trainer">Trainer</Select.Item>
                    </Select.Group>
                  </Select.Content>
                </Select.Root>
              </Flex>
              <Button my='2' type="submit">Register</Button>
              <Flex justify={'center'} align={'center'}>
                <Text size={'2'}>Already have an account?</Text>
                <Button variant={'ghost'} ml='5' onClick={() => navigate('/login')}>Login</Button>
              </Flex>
            </Flex>
          </form>
        </Card>
      </Flex>
    </div>
  );
}

export default RegisterPage;
