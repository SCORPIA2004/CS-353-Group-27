import {Button, Card, Container, Flex, Heading, Text, TextField} from "@radix-ui/themes";
import {useNavigate} from "react-router-dom";
const LoginPage = () => {
    const navigate = useNavigate()

    return (
        <Flex justify='center' p='5'>
            <Card>
                <Flex direction={'column'} p={'3'} justify={'center'}>
                    <Heading m='1' align={'center'}>Login</Heading>
                    <Text as="div" color="gray" size="2">
                        Please enter your username and password.
                    </Text>
                    <Flex justify='center' direction='column' gap='1' mt='3'>
                        <TextField.Root size="1" placeholder="Email"/>
                        <TextField.Root size="1" placeholder="Password"/>
                    </Flex>
                    <Button my='2'>Login</Button>
                    <Flex justify={'center'} align={'center'}>
                        <Text size={'2'}>New Here?</Text>
                        <Button variant={'ghost'} ml='5' onClick={() => navigate("/register")}>Create an account</Button>
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    )
}

export default LoginPage;