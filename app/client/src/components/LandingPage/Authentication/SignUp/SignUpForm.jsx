import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FormControl,
    Input,
    FormLabel,
    FormErrorMessage,
    Button,
    Box,
    Flex,
    useToast,
} from '@chakra-ui/react';
import useInput from '../../../../hooks/use-input';
import {
    validateFullName,
    validateEmail,
    validatePassword,
} from './signUpHelper';
import SessionContext from '../../../../state/sessionContext';
import axi from '../../../../axios';

const SignUpForm = () => {
    // all fields below use the useInput hook and their own custom validation functions
    const {
        value: enteredFullName,
        isValid: fullNameIsValid,
        hasError: fullNameInputHasError,
        valueChangeHandler: fullNameChangedHandler,
        inputBlurHandler: fullNameBlurHandler,
    } = useInput(validateFullName);

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
    } = useInput(validateEmail);
    // testValidateEmailFunction(); // uncomment to test the email validation function

    const {
        value: enteredPassword,
        isValid: passwordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput(validatePassword);

    const {
        value: enteredConfirmationPassword,
        valueChangeHandler: confirmationPasswordChangedHandler,
        inputBlurHandler: confirmationPasswordBlurHandler,
        isTouched: confirmationPasswordIsTouched,
    } = useInput(() => true); // dont need to use custom validation func, pass an empty one

    const navigate = useNavigate(); // used to navigate to the profile page after successful sign up

    const passwordsMatch = enteredPassword === enteredConfirmationPassword;
    const confirmationPasswordHasError =
        confirmationPasswordIsTouched && !passwordsMatch;

    const [responseError, setResponseError] = useState(null); // used to display error message from server
    const formHasError =
        fullNameInputHasError ||
        emailInputHasError ||
        passwordInputHasError ||
        confirmationPasswordHasError ||
        responseError;

    // load in the updateSessionObj function from the SessionContext
    const sessionContext = useContext(SessionContext);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const toast = useToast();
    const handleFormSubmit = async e => {
        e.preventDefault();

        let response;
        try {
            response = await axi.post('/auth/register', {
                fullName: enteredFullName,
                email: enteredEmail,
                password: enteredPassword,
            });
            // console.log('response: ', response);
            setResponseError(null);
        } catch (error) {
            // console.log('error: ', error);
            setResponseError(error.response.data.message);
            return; // stop the function here if there is an error
        }

        const { token } = response.data;

        // get userdata from /user using token as auth header
        const user = await axi.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        sessionContext.login({
            token,
            user: user.data,
        });
        setFormSubmitted(true);

        toast({
            title: 'Your account has been created.',
            description: "We're logging you into your new account.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });

        setTimeout(() => {
            navigate('/profile');
        }, 2000);
    };

    return (
        <FormControl isInvalid={formHasError} onSubmit={handleFormSubmit}>
            <Flex gap="10px" direction="column">
                <Box>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                        type="text"
                        value={enteredFullName}
                        onChange={fullNameChangedHandler}
                        onBlur={fullNameBlurHandler}
                    />
                    {fullNameInputHasError && (
                        <FormErrorMessage>
                            Full name is required.
                        </FormErrorMessage>
                    )}
                </Box>
                <Box>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={enteredEmail}
                        onChange={emailChangedHandler}
                        onBlur={emailBlurHandler}
                    />
                    {emailInputHasError && (
                        <FormErrorMessage>
                            Email is required and must be correctly formatted.
                        </FormErrorMessage>
                    )}
                </Box>
                <Box>
                    <FormLabel>Password</FormLabel>
                    <Input
                        type="password"
                        value={enteredPassword}
                        onChange={passwordChangedHandler}
                        onBlur={passwordBlurHandler}
                    />
                    {passwordInputHasError && (
                        <FormErrorMessage>
                            Password must be 12 characters long and contain a
                            number and a symbol.
                        </FormErrorMessage>
                    )}
                </Box>
                <Box>
                    <FormLabel>Confirmation Password</FormLabel>
                    <Input
                        type="password"
                        value={enteredConfirmationPassword}
                        onChange={confirmationPasswordChangedHandler}
                        onBlur={confirmationPasswordBlurHandler}
                    />
                    {confirmationPasswordHasError && (
                        <FormErrorMessage>
                            Confirmation password must match password.
                        </FormErrorMessage>
                    )}
                </Box>
                {responseError && (
                    <FormErrorMessage>{responseError}</FormErrorMessage>
                )}
            </Flex>
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={formSubmitted}
                onClick={handleFormSubmit}
                type="submit"
                disabled={
                    !fullNameIsValid ||
                    !emailIsValid ||
                    !passwordIsValid ||
                    !passwordsMatch
                }
            >
                Submit
            </Button>
        </FormControl>
    );
};

export default SignUpForm;
