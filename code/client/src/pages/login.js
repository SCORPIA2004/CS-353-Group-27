import React, { useState } from 'react';
import { Button, Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/react-components";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      //Should change this with actual api
      const response = await fetch('http://yourapi.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
      
        localStorage.setItem('token', data.token); // Token is returned right?
        navigate('/homepage'); 
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the service. Please try again later.');
    }
  };

  return (
    <Container>
      <Flex justify='center' css={{ padding: '$5' }}>
        <Card>
          <form onSubmit={handleLogin}>
            <Flex direction='column' css={{ padding: '$3' }} justify='center'>
              <Heading css={{ margin: '$1', textAlign: 'center' }}>Login</Heading>
              <Text as="div" css={{ color: '$gray11', fontSize: '$3' }}>
                Please enter your email and password.
              </Text>
              {error && (
                <Text as="div" css={{ color: '$red11', fontSize: '$3', textAlign: 'center' }}>
                  {error}
                </Text>
              )}
              <Flex justify='center' direction='column' css={{ gap: '$3', marginTop: '$5' }}>
                <TextField.Root size="1" placeholder="Email" value={email} onValueChange={setEmail} />
                <TextField.Root size="1" placeholder="Password" type="password" value={password} onValueChange={setPassword} />
              </Flex>
              <Button css={{ marginTop: '$4' }} type="submit">Login</Button>
              <Flex justify='center' align='center' css={{ marginTop: '$3' }}>
                <Text css={{ fontSize: '$2' }}>New Here?</Text>
                <Button variant='ghost' css={{ marginLeft: '$5' }} onClick={() => navigate("/register")}>Create an account</Button>
              </Flex>
            </Flex>
          </form>
        </Card>
      </Flex>
    </Container>
  );
}

export default LoginPage;
