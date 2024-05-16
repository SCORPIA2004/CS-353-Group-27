import React, { useState } from 'react';
import { Button, Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(email, password);

    // try {
    //   const response = await fetch('http://yourapi.com/login', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //
    //   if (response.ok) {
    //     const data = await response.json();
    //     localStorage.setItem('token', data.token);
    //
    //     //We should have role kind of thing here
    //     const role = data.role;
    //
    //     if (role === 'trainee') {
    //       navigate('/homepage');
    //     } else if (role === 'trainer') {
    //       navigate('/TrainerHomepage');
    //     }
    //   } else {
    //     setError('Invalid credentials. Please try again.');
    //   }
    // } catch (err) {
    //   setError('Failed to connect to the service. Please try again later.');
    // }
  };

  return (
      <div style={{
        height: 'calc(100vh - 52px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Container>
          <Flex justify='center' p='5'>
            <Card>
              <form onSubmit={handleLogin}>
                <Flex direction='column' p='3' justify='center'>
                  <Heading m='1' align='center'>Login</Heading>
                  <Text as="div" color="gray" size="2">
                    Please enter your email and password.
                  </Text>
                  {error && (
                      <Text as="div" color="red" size="2" style={{textAlign: 'center'}}>
                        {error}
                      </Text>
                  )}
                  <Flex justify='center' direction='column' gap='1' mt='5'>
                    <TextField.Root
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField.Root
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                  </Flex>
                  <Button my='4' type="submit">Login</Button>
                  <Flex justify='center' align='center'>
                    <Text size='2'>New Here?</Text>
                    <Button variant='ghost' ml='5' onClick={() => navigate("/register")} className={'cursor-pointer'}>Create
                      an account</Button>
                  </Flex>
                </Flex>
              </form>
            </Card>
          </Flex>
        </Container>
      </div>
  );
}

export default LoginPage;
