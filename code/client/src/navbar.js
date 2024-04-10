import {Avatar, Button, Flex, Heading, DropdownMenu, IconButton, Card} from "@radix-ui/themes";
import {ArrowRightIcon} from "@radix-ui/react-icons";
import useCheckAuthenticated from "./utils/useCheckAuthenticated";

const Navbar = () => {
    const [isAuthenticated, isLoading] = useCheckAuthenticated();

    if (!isAuthenticated && isLoading) {
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
                            <Avatar fallback="YY"/>
                        </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                        <DropdownMenu.Item>Logout</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </Flex>
        </Card>
    );
}

export default Navbar;