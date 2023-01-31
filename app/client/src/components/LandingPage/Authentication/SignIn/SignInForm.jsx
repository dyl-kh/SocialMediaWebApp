import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {
    FormControl,
    Input,
    FormLabel,
    FormErrorMessage,
    Button,
    Box,
    Text,
} from '@chakra-ui/react';
import axi from '../../../../axios';
import useInput from '../../../../hooks/use-input';
import { validateEmail } from '../SignUp/signUpHelper';

const SignInForm = props => {
    // use onOpen to trigger the confirmation code modal
    const { onOpen, setUserEmail } = props;

    const navigate = useNavigate(); // used to navigate to the profile page after successful sign in

    // all fields below use the useInput hook and their own custom validation functions
    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailInputHasError,
        valueChangeHandler: emailChangedHandler,
        inputBlurHandler: emailBlurHandler,
        reset: resetEmailInput,
    } = useInput(validateEmail);

    const validatePassword = enteredPassword => {
        return enteredPassword.length > 0;
    };
    const {
        value: enteredPassword,
        isValid: passwordIsValid,
        hasError: passwordInputHasError,
        valueChangeHandler: passwordChangedHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: resetPasswordInput,
    } = useInput(validatePassword);

    const formHasError = emailInputHasError || passwordInputHasError;
    const [invalidLogin, setInvalidLogin] = useState(null); // holds the provided server error message if the login is invalid

    const [formSubmitted, setFormSubmitted] = useState(false);
    const handleFormSubmit = async e => {
        e.preventDefault();

        // send login request to backend /api/auth/login
        let loginRes = {};
        try {
            loginRes = await axi.post('/auth/login', {
                email: enteredEmail,
                password: enteredPassword,
            });
        } catch (err) {
            loginRes = err;
        }

        // if loginRes returned 200, then login was successful, initiate MFA
        if (loginRes.status === 200) {
            navigate('/profile');
            setUserEmail(enteredEmail);
            onOpen(); // opens confirmation code modal
            setFormSubmitted(true);
        } else {
            setInvalidLogin(loginRes.response.data.message);
            resetEmailInput();
            resetPasswordInput();
        }
    };

    return (
        <FormControl isInvalid={formHasError} onSubmit={handleFormSubmit}>
            <Box h="100px">
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
            <Box h="100px">
                <FormLabel>Password</FormLabel>
                <Input
                    type="password"
                    value={enteredPassword}
                    onChange={passwordChangedHandler}
                    onBlur={passwordBlurHandler}
                />
                {passwordInputHasError && (
                    <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
            </Box>
            {invalidLogin && <Text color="red">{invalidLogin}</Text>}
            <Button
                mt={4}
                colorScheme="teal"
                isLoading={formSubmitted}
                onClick={handleFormSubmit}
                type="submit"
                disabled={!emailIsValid || !passwordIsValid}
            >
                Submit
            </Button>
        </FormControl>
    );
};

SignInForm.propTypes = {
    onOpen: PropTypes.func.isRequired,
    setUserEmail: PropTypes.func.isRequired,
};

export default SignInForm;
