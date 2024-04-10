import {Box, Button, Flex, Heading} from "@radix-ui/themes";
import useCheckAuthenticated from "../utils/useCheckAuthenticated";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {ArrowRightIcon} from "@radix-ui/react-icons";


const HomePage = () => {

    const [isAuthenticated, isLoading] = useCheckAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated) {
                navigate('/login');
            }
        }
    }, [isLoading]);

    return (
        <Flex justify='center' direction='column'>
            <Heading>Homepage</Heading>
        </Flex>
    )
}

export default HomePage;