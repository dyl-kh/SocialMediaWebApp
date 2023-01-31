import React, { useEffect } from 'react';
import {
    Box,
    Stack,
    Text,
    Flex,
    TableContainer,
    Table,
    Th,
    Tbody,
    Tr,
    Tfoot,
    Spacer,
} from '@chakra-ui/react';
import {
    headingColorToggle,
    borderColorToggle,
} from '../common/ColorModeValues';
import axi from '../../axios';
import UserRow from './UserRow';
import FollowingSwitch from './FollowingSwitch';
import SessionContext from '../../state/sessionContext';

const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [onlyShowFollowing, setOnlyShowFollowing] = React.useState(false);
    const [following, setFollowing] = React.useState([]);

    // accepts a userId to toggle in the following state array - no need to fetch all following again
    const updateFollowing = toggleUserId => {
        if (following.includes(toggleUserId)) {
            setFollowing(prevFollowing => {
                return prevFollowing.filter(id => id !== toggleUserId);
            });
        } else {
            setFollowing(prevFollowing => {
                return [...prevFollowing, toggleUserId];
            });
        }
    };

    const { token, user: loggedInUser } = React.useContext(SessionContext);

    // get /users to get all users using axi and set to state
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axi.get('/users');
            const allUsers = res.data;
            // filter out current logged in user from all users
            const filteredUsers = allUsers.filter(
                user => user.userId !== loggedInUser.userId
            );
            setUsers(filteredUsers);
        };
        fetchUsers();
    }, []);

    // get following from /user/following using axi and set to state
    useEffect(() => {
        const fetchFollowing = async () => {
            const res = await axi.get('/user/following', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFollowing(res.data);
        };
        fetchFollowing();
    }, []);

    const renderAllUsers = () => {
        return users.map(user => (
            <UserRow
                user={user}
                key={user.userId}
                isFollowing={following.some(
                    followingUser => followingUser === user.userId
                )}
                updateFollowing={updateFollowing}
            />
        ));
    };

    const renderOnlyFollowing = () => {
        return users
            .filter(user => following.includes(user.userId))
            .map(user => (
                <UserRow
                    user={user}
                    key={user.userId}
                    isFollowing={following.some(
                        followingUser => followingUser === user.userId
                    )}
                    updateFollowing={updateFollowing}
                />
            ));
    };

    return (
        <Box>
            <Stack align="center" mt="80px">
                <Flex
                    direction="column"
                    minW="450px"
                    w="60vw"
                    maxW="750px"
                    mb="30px"
                    color={headingColorToggle}
                >
                    <Flex>
                        <Box>
                            <Text fontSize="3xl" fontWeight="500">
                                LAN Users
                            </Text>
                            <Text fontSize="large">
                                Click on a user to view their profile
                            </Text>
                        </Box>
                        <Spacer />
                        <Box>
                            <FollowingSwitch
                                setShowFollowing={setOnlyShowFollowing}
                            />
                        </Box>
                    </Flex>
                </Flex>
                <Box
                    borderStyle="solid"
                    borderWidth="1px"
                    borderColor={borderColorToggle}
                    borderRadius="10px"
                    pt="10px"
                    pb="10px"
                    w="60vw"
                    maxW="750px"
                >
                    <TableContainer>
                        <Table variant="simple">
                            <Tbody>
                                {onlyShowFollowing
                                    ? renderOnlyFollowing()
                                    : renderAllUsers()}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    <Th>User</Th>
                                    <Th isNumeric>Follow / Unfollow</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                </Box>
            </Stack>
        </Box>
    );
};

export default Users;
