import React, { useContext } from 'react';
import {
    Box,
    Text,
    Flex,
    Spacer,
    MenuButton,
    Menu,
    MenuList,
    MenuItem,
    IconButton,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Button,
    Link,
} from '@chakra-ui/react';

import PropTypes from 'prop-types';

import { GoKebabVertical } from 'react-icons/go';
import { HiPencil as EditIcon } from 'react-icons/hi';
import { FaTrashAlt as DeleteIcon, FaSkullCrossbones } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import ProfileIcon from '../../MISC/ProfileIcon';
import {
    headingColorToggle,
    buttonColorToggle,
} from '../../common/ColorModeValues';
import SessionContext from '../../../state/sessionContext';

// contains post autor name, date and menu button
const PostHeader = props => {
    const { postId, setEdit, handleDelete, posts, postAuthorObject } = props;
    const postObject = posts.find(p => p.postId === postId);

    const { isOpen, onOpen, onClose } = useDisclosure(); // modal state

    const { dateTime, userId } = postObject;
    const formatDate = new Date(dateTime).toLocaleString();

    const { user } = useContext(SessionContext);

    // whether post is user's own post,used to determine whether to show edit/delete options
    const ownPost = userId === user.userId;

    function editPost() {
        setEdit(edit => !edit); // toggle edit state
    }

    function deletePost() {
        handleDelete(); // delete post
    }

    return (
        <Box>
            <Flex gap="20px" align="center" color={headingColorToggle}>
                <ProfileIcon
                    fullname={postAuthorObject.fullName}
                    userId={userId}
                />
                <Box>
                    <Link
                        as={RouterLink}
                        to={`/user/${userId}`}
                        _hover={{ textDecoration: 'none' }}
                    >
                        <Text fontSize="larger" fontWeight="semibold">
                            {postAuthorObject.fullName}
                        </Text>
                    </Link>
                    <Text>{formatDate}</Text>
                </Box>
                <Spacer />

                {ownPost ? (
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label="Options"
                            fontSize="2xl"
                            variant="outline"
                            h="50px"
                            w="50px"
                            textAlign="center"
                            icon={<GoKebabVertical />}
                        />
                        <MenuList>
                            <MenuItem
                                icon={<EditIcon />}
                                onClick={() => editPost()}
                            >
                                Edit
                            </MenuItem>
                            <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
                                Delete
                            </MenuItem>
                        </MenuList>
                    </Menu>
                ) : null}
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Confirm Post Deletion</ModalHeader>
                    <ModalBody>
                        <Text whiteSpace="pre-wrap">
                            Please confirm this action, as there is no going
                            back!
                            {'\n'}This will permanently delete this post.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Go Back</Button>
                        <Spacer />
                        <Button
                            leftIcon={<FaSkullCrossbones />}
                            colorScheme="red"
                            bg={buttonColorToggle}
                            onClick={() => {
                                deletePost();
                            }}
                        >
                            Confirm Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

PostHeader.propTypes = {
    postId: PropTypes.string.isRequired,
    setEdit: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    posts: PropTypes.instanceOf(Array).isRequired,
    postAuthorObject: PropTypes.instanceOf(Object).isRequired,
};

export default PostHeader;
