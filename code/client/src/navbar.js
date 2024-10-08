import {Avatar, Button, Flex, Heading, DropdownMenu, IconButton, Card} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import useAuth from "./utils/useAuth";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const {isAuthenticated, logout, user} = useAuth();
    const [initials, setInitials] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const firstInitial = user.first_name.charAt(0).toUpperCase();
            const lastInitial = user.last_name.charAt(0).toUpperCase();
            setInitials(firstInitial + lastInitial);
        } else {
            setInitials('');
        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return (
            <nav style={{borderBottom: "1px gray solid"}}>
                <Flex gap="3" justify='center' align='center' p='2'>
                    <Heading>Fitness Tracker</Heading>
                </Flex>
            </nav>
        );
    }

    return (
        <Card>
            <Flex gap="3" justify="between" align="center">
                <Heading style={{cursor: "pointer"}} onClick={() => navigate("/")}>
                    Fitness Tracker
                </Heading>
                <Flex gap="5" align={"center"}>
                    {user.role === 'trainee' && (
                        <>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Button style={{cursor: "pointer"}} variant="ghost">
                                        Workout & Training
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item style={{cursor: "pointer"}} onClick={() => {
                                        navigate('/past-workouts')
                                    }}>
                                        My Workouts
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Separator/>
                                    <DropdownMenu.Item style={{cursor: "pointer"}} onClick={() => {navigate('/consultations')}}>
                                        Consultations
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Button variant="ghost" style={{cursor: "pointer"}}>
                                        Progress
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item style={{cursor: "pointer"}} onClick={() => navigate('/goals')}>
                                        Goals
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Button variant="ghost" style={{cursor: "pointer"}}>
                                        Trainers
                                    </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Item style={{cursor: "pointer"}} onClick={() => {
                                        navigate('/trainers')
                                    }}>
                                        Find Trainer{" "}
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        </>
                    )}

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button
                                style={{cursor: "pointer"}}
                                variant="ghost"
                                onClick={() => navigate("/leaderboard")}
                            >
                                Leaderboard
                            </Button>
                        </DropdownMenu.Trigger>
                    </DropdownMenu.Root>
                </Flex>

                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <IconButton variant="ghost" style={{cursor: "pointer"}}>
                            <Avatar fallback={initials}/>
                        </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content onClick={logout}>
                        <DropdownMenu.Item>Logout</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Flex>
        </Card>
    );
}

export default Navbar;