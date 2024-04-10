import {Button, Card, Flex, Heading, Text, TextField} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Flex justify='center' p='5'>
                <Card>
                    <Flex direction={'column'} p={'3'} justify={'center'}>
                        <Heading m='1' align={'center'}>Register</Heading>
                        <Text as="div" color="gray" size="2">
                            Please provide your details to create an account.
                        </Text>
                        <Flex justify='center' direction='column' gap='1' mt='3'>
                            <TextField.Root size="1" placeholder="Email"/>
                            <TextField.Root size="1" placeholder="Password" required/>
                            <TextField.Root size="1" placeholder="Password"/>
                        </Flex>
                        <Button my='2'>Register</Button>
                        <Flex justify={'center'} align={'center'}>
                            <Text size={'2'}>Already have an account?</Text>
                            <Button variant={'ghost'} ml='5' onClick={() => navigate('/login')}>Login</Button>
                        </Flex>
                    </Flex>
                </Card>
            </Flex>
        </div>
    );
}

export default RegisterPage;