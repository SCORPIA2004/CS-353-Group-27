import React, {useState} from 'react';
import {Button, Card, Container, Flex, Heading, Text, TextField} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import {LOGIN_URL} from "../helpers/ApiUrlHelper";
import useAuth from "../utils/useAuth";
const LoginPage = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login} = useAuth();
  const handleLogin = async (event) => {
        event.preventDefault();
    try {
            const response = await fetch(`${LOGIN_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
      if (response.ok) {
                const data = await response.text();
                login(data, () => navigate('/'))
            } else if (response.status === 400) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('Failed to connect to the service. Please try again later.');
            }
        } catch (err) {
            setError('Failed to connect to the service. Please try again later.');
        }
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
                                <Text as="div" color="gray" size="2" style={{textAlign: 'center'}}>
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
                                    <Button variant='ghost' ml='5' onClick={() => navigate("/register")}
                                            className={'cursor-pointer'}>Create
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
