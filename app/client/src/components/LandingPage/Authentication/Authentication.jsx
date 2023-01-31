/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import {
    Box,
    Text,
    Heading,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter,
    Button,
    FormErrorMessage,
    useToast,
} from '@chakra-ui/react';

import SwitchLoginMode from './SwitchLogin/SwitchLoginMode';
import SignUpForm from './SignUp/SignUpForm';
import SignInForm from './SignIn/SignInForm';
import useInput from '../../../hooks/use-input';
import SessionContext from '../../../state/sessionContext';
import axi from '../../../axios';

const Authentication = () => {
    // state for confirmation code modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    // ref to place focus on confirmation code input
    const initialRef = React.useRef(null);

    const validateConfirmationCode = enteredConfirmationCode => {
        return enteredConfirmationCode.length === 6;
    };

    // useInput hook for confirmation code input
    const {
        value: enteredConfirmationCode,
        isValid: confirmationCodeIsValid,
        hasError: confirmationCodeHasError,
        valueChangeHandler: confirmationCodeChangedHandler,
        inputBlurHandler: confirmationCodeBlurHandler,
        reset: resetConfirmationCode,
    } = useInput(validateConfirmationCode);

    const [isLogin, setIsLogin] = useState(false);
    const [userEmail, setUserEmail] = useState(null); // to be used by verify2FA - passed up from sign in form
    const [invalidConfirmationCode, setInvalidConfirmationCode] =
        useState(false);

    const toggleIsLogin = () => {
        setIsLogin(prevState => {
            return !prevState;
        });
    };

    // load in updateSessionObj function from session context
    const toast = useToast();
    const { login } = useContext(SessionContext);
    const handleConfirmationCodeFormSubmit = async e => {
        e.preventDefault();
        let mfaRes;
        if (confirmationCodeIsValid && userEmail) {
            mfaRes = await axi.post('/auth/mfa', {
                email: userEmail,
                confirmationCode: enteredConfirmationCode,
            });
        }

        if (
            confirmationCodeIsValid &&
            userEmail &&
            mfaRes &&
            mfaRes.status === 200
        ) {
            toast({
                title: 'Successfully verified confirmation code.',
                description: "We're logging you into your account.",
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
            setTimeout(async () => {
                const { token } = mfaRes.data;
                const user = await axi.get('/user', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                login({
                    token,
                    user: user.data,
                });
            }, 2000);
        } else {
            resetConfirmationCode();
            setInvalidConfirmationCode(true);
        }
    };

    return (
        <Box w="100%" h="min" p={20} mb="0px" pb="0" pt="10">
            <Text alignSelf="end" fontSize="large">
                Create an account for free
            </Text>

            <Heading fontSize="6xl">
                {isLogin ? 'Sign in to LAN' : 'Sign up to LAN'}
            </Heading>
            <SwitchLoginMode toggleIsLogin={toggleIsLogin} isLogin={isLogin} />
            {isLogin ? (
                <SignInForm onOpen={onOpen} setUserEmail={setUserEmail} />
            ) : (
                <SignUpForm />
            )}
            <Modal
                closeOnOverlayClick={false}
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>2FA Confirmation</ModalHeader>
                    <ModalBody pb={6}>
                        <Text>
                            Enter the 6 digit confirmation code that we sent to
                            your email.
                        </Text>
                        <FormControl
                            isInvalid={
                                confirmationCodeHasError ||
                                invalidConfirmationCode
                            }
                            onSubmit={handleConfirmationCodeFormSubmit}
                        >
                            <FormLabel>Confirmation Code</FormLabel>
                            <Input
                                value={enteredConfirmationCode}
                                ref={initialRef}
                                onChange={confirmationCodeChangedHandler}
                                onBlur={confirmationCodeBlurHandler}
                                type="number"
                                placeholder="E.g. 123456"
                            />
                            {confirmationCodeHasError && (
                                <FormErrorMessage>
                                    Confirmation code must have 6 digits.
                                </FormErrorMessage>
                            )}
                            {invalidConfirmationCode && (
                                <FormErrorMessage>
                                    That confirmation code is invalid. Try
                                    again.
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={handleConfirmationCodeFormSubmit}
                        >
                            Verify
                        </Button>
                        <Button onClick={() => window.location.reload()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Authentication;
