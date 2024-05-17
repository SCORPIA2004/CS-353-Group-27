import {Avatar, Button, Flex, Heading, DropdownMenu, IconButton, Card} from "@radix-ui/themes";
import {useEffect, useState} from "react";
import useAuth from "./utils/useAuth";

const Navbar = () => {
    const {isAuthenticated, logout, user} = useAuth();
    const [initials, setInitials] = useState('');

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
            <Flex gap="3" justify='between' align='center'>
                <Heading>Fitness Tracker</Heading>
                <Flex gap='5'>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="ghost">
                                Workout & Training
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>My Workouts</DropdownMenu.Item>
                            <DropdownMenu.Separator/>
                            <DropdownMenu.Item>Create Program </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="ghost">
                                Progress
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>Goals</DropdownMenu.Item>
                            <DropdownMenu.Separator/>
                            <DropdownMenu.Item>Progress Reports</DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="ghost">
                                Trainers
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item>Find Trainer </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                        <IconButton variant="ghost">
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