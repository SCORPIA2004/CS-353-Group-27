import React, {useState} from 'react';
import {Button, Card, Flex, Heading, Text, TextField, Select} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
import {REGISTER_URL} from "../helpers/ApiUrlHelper";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('Select Role');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [specialty, setSpecialty] = useState('Select Specialty');
    const [experience, setExperience] = useState('');
    const [message, setMessage] = useState('');

    const handleRegistration = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        console.log(specialty.toLowerCase())

        try {
            const requestData = {
                email,
                password,
                firstname: firstName,
                lastname: lastName,
                dob: dateOfBirth,
                ...(role === 'Trainee' && {height: parseFloat(height), weight: parseFloat(weight)}),
                ...(role === 'Trainer' && {speciality: specialty.toLowerCase(), experience: parseInt(experience, 10)})
            };

            const response = await fetch(`${REGISTER_URL}/${role.toLowerCase()}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                setMessage('Registration successful!');
                setTimeout(() => navigate('/login'), 2000);
            } else if (response.status === 400) {
                const responseData = await response.json()
                const errorMessage = responseData.message[0] || 'Registration failed. Please try again.';
                throw new Error(errorMessage);
            } else {
                throw new Error('Registration failed. Please try again.');
            }

            navigate('/login');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div style={{
            height: 'calc(100vh - 52px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
        }}>
            <Flex justify='center' p='5'>
                <Card>
                    <form onSubmit={handleRegistration}>
                        <Flex direction={'column'} p={'3'} justify={'center'}>
                            <Heading m='1' align={'center'}>Register</Heading>
                            <Text as="div" color="gray" size="2" style={{textAlign: 'center'}}>
                                Please provide your details to create an account.
                            </Text>
                            {message && (
                                <Text as="div" color="red" size="2" style={{textAlign: 'center', maxWidth: '370px'}}>
                                    {message}
                                </Text>
                            )}
                            <Flex justify='center' direction='column' gap='1' mt='3'>
                                <Flex gap='1'>
                                    <TextField.Root
                                        placeholder="First Name"
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                    <TextField.Root
                                        placeholder="Last Name"
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </Flex>
                                <Text as="div" color="gray" size="1" style={{marginTop: 10}}>
                                    Date of Birth (YYYY-MM-DD)
                                </Text>
                                <TextField.Root
                                    style={{marginBottom: 10}}
                                    placeholder="Date of Birth"
                                    type="date"
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    required
                                />
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
                                <TextField.Root
                                    placeholder="Confirm Password"
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <Select.Root value={role} onValueChange={setRole}>
                                    <Select.Trigger>{role}</Select.Trigger>
                                    <Select.Content>
                                        <Select.Group>
                                            <Select.Label>Role</Select.Label>
                                            <Select.Item value="Trainee">Trainee</Select.Item>
                                            <Select.Item value="Trainer">Trainer</Select.Item>
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                                {role === 'Trainee' && (
                                    <Flex gap='1'>
                                        <TextField.Root
                                            placeholder="Height (cm)"
                                            onChange={(e) => setHeight(e.target.value)}
                                            required
                                        />
                                        <TextField.Root
                                            placeholder="Weight (kg)"
                                            onChange={(e) => setWeight(e.target.value)}
                                            required
                                        />
                                    </Flex>
                                )}
                                {role === 'Trainer' && (
                                    <>
                                        <Select.Root value={specialty} onValueChange={setSpecialty}>
                                            <Select.Trigger>{specialty}</Select.Trigger>
                                            <Select.Content>
                                                <Select.Group>
                                                    <Select.Label>Specialty</Select.Label>
                                                    <Select.Item value="Fitness">Fitness</Select.Item>
                                                    <Select.Item value="Nutrition">Nutrition</Select.Item>
                                                    <Select.Item value="Yoga">Yoga</Select.Item>
                                                    <Select.Item value="Cardio">Cardio</Select.Item>
                                                    <Select.Item value="Strength">Strength</Select.Item>
                                                </Select.Group>
                                            </Select.Content>
                                        </Select.Root>
                                        <TextField.Root
                                            placeholder="Experience (years)"
                                            onChange={(e) => setExperience(e.target.value)}
                                            required
                                        />
                                    </>
                                )}
                            </Flex>
                            <Button my='4' type="submit">Register</Button>
                            <Flex justify={'center'} align={'center'}>
                                <Text size={'2'}>Already have an account?</Text>
                                <Button variant={'ghost'} ml='5' onClick={() => navigate('/login')}
                                        className={'cursor-pointer'}>Login</Button>
                            </Flex>
                        </Flex>
                    </form>
                </Card>
            </Flex>
        </div>
    );
}

export default RegisterPage;
