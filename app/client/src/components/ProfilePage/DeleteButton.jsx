import {
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Text,
    Spacer,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import { FaTrashAlt, FaSkullCrossbones } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { buttonColorToggle } from '../common/ColorModeValues';

// delete button for profile page with confirmation modal
const DeleteButton = props => {
    const { onClick } = props;
    const { isOpen, onOpen, onClose } = useDisclosure(); // modal state
    const toast = useToast();
    const handleClick = () => {
        onClose();
        onClick();
        toast({
            title: 'Your account has been deleted.',
            description: "We've removed all of your data from the system.",
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    };
    return (
        <>
            <Button
                size="md"
                bg={buttonColorToggle}
                colorScheme="red"
                leftIcon={<FaTrashAlt />}
                onClick={onOpen}
            >
                Delete Account
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Confirm Account Deletion</ModalHeader>
                    <ModalBody>
                        <Text whiteSpace="pre-wrap">
                            Please confirm this action, as there is no going
                            back!
                            {'\n\n'}This will delete all of your data, and you
                            will no longer be able to access your account.
                            {'\n\n'}All Posts and Comments you have made will be
                            deleted.
                        </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Go Back</Button>
                        <Spacer />
                        <Button
                            leftIcon={<FaSkullCrossbones />}
                            colorScheme="red"
                            bg={buttonColorToggle}
                            onClick={handleClick}
                        >
                            Confirm Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};
export default DeleteButton;
