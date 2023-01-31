import React from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Tr, Td, Button, useToast, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import ProfileIcon from '../MISC/ProfileIcon';
import axi from '../../axios';
import SessionContext from '../../state/sessionContext';

const UserRow = props => {
    const { user, isFollowing, updateFollowing } = props;
    const { token } = React.useContext(SessionContext);

    const toast = useToast();

    const handleFollowButtonClick = async () => {
        // console.log('Toggling follow for user: ', user);

        try {
            await axi.post(
                '/user/follow',
                { targetFollowUserId: user.userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            updateFollowing(user.userId); // update following state in Users.jsx
            // success toast pop up after successful follow/unfollow
            toast({
                title: isFollowing
                    ? `Unfollowed ${user.fullName}`
                    : `Followed ${user.fullName}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        } catch (err) {
            // console.log('err: ', err);
        }
    };

    return (
        <Tr>
            <Td>
                <Flex align="center" gap="20px">
                    <ProfileIcon
                        fullname={user.fullName}
                        userId={user.userId}
                    />
                    <Link
                        as={RouterLink}
                        to={`/user/${user.userId}`}
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Text fontWeight="500">{user.fullName}</Text>
                    </Link>
                </Flex>
            </Td>
            <Td isNumeric>
                <Button
                    minW="-moz-fit-content"
                    type="submit"
                    w="100px"
                    backgroundColor={!isFollowing && 'blue.400'}
                    color={!isFollowing && 'white'}
                    _hover={{
                        backgroundColor: !isFollowing ? 'blue.500' : 'gray.200',
                    }}
                    onClick={() => handleFollowButtonClick()}
                >
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>
            </Td>
        </Tr>
    );
};

// validate props
UserRow.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    user: PropTypes.object.isRequired,
    isFollowing: PropTypes.bool.isRequired,
    updateFollowing: PropTypes.func.isRequired,
};

export default UserRow;
