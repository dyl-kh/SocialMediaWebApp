import React, { useContext } from 'react';
import { Box, Stack, Text, Flex, Spacer } from '@chakra-ui/react';
import {
    headingColorToggle,
    borderColorToggle,
} from '../common/ColorModeValues';
import ProfileIcon from '../MISC/ProfileIcon';
import DeleteButton from './DeleteButton';
import ProfileRow from './ProfileRow';
import SignOutButton from './SignOutButton';

import SessionContext from '../../state/sessionContext';
import axi from '../../axios';

const Profile = () => {
    const { logout, token, user } = useContext(SessionContext);

    const handleSignOutClick = () => {
        logout();
    };

    const handleDeleteClick = () => {
        try {
            // delete user from database DEL /user with token in bearer header
            axi.delete('/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (err) {
            // console.log(err);
        }
        logout();
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
                    <Text fontSize="3xl" fontWeight="500">
                        Your Profile
                    </Text>
                    <Text fontSize="large">
                        Edit your profile by clicking the edit icon
                    </Text>
                </Flex>
                <Box
                    borderStyle="solid"
                    borderWidth="1px"
                    borderColor={borderColorToggle}
                    borderRadius="10px"
                    padding="15px"
                >
                    <Flex gap="20px" direction="column">
                        <Flex align="center" gap="20px">
                            <ProfileIcon />
                            <DeleteButton onClick={() => handleDeleteClick()} />
                            <Spacer />
                            <SignOutButton
                                onClick={() => handleSignOutClick()}
                            />
                        </Flex>
                        <Flex gap="10px" direction="column">
                            <ProfileRow
                                label="Full Name"
                                placeholder={user.fullName}
                                type="text"
                                canEdit
                                userValueType="fullName"
                            />
                            <ProfileRow
                                label="Email"
                                placeholder={user.email}
                                type="email"
                                canEdit
                                userValueType="email"
                            />
                            <ProfileRow
                                label="Date Joined"
                                placeholder={user.dateJoined}
                                type="text"
                                canEdit={false}
                                userValueType="joinDate"
                            />
                        </Flex>
                    </Flex>
                </Box>
            </Stack>
        </Box>
    );
};

export default Profile;
