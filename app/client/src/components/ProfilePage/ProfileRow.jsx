import React, { useState, useContext, useEffect } from 'react';
import {
    FormErrorMessage,
    Stack,
    FormLabel,
    Input,
    Box,
    Grid,
    Button,
    FormControl,
    useToast,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { HiPencil } from 'react-icons/hi';
import { GoCheck } from 'react-icons/go';

import SessionContext from '../../state/sessionContext';
// import { setUserVal } from '../common/storageUtils';
import { validateEmail } from '../LandingPage/Authentication/SignUp/signUpHelper';
import axi from '../../axios';

// Component for each row in the profile page
const ProfileRow = props => {
    const { label, placeholder, type, canEdit = false, userValueType } = props;

    const [fieldStatus, setFieldStatus] = useState(true);

    const { token, user } = useContext(SessionContext);

    const [value, setValue] = useState(placeholder);

    const [valueIsValid, setValueIsValid] = useState(true);

    // check if value is valid when it changes, prevent user from saving invalid values
    useEffect(() => {
        if (userValueType === 'email') {
            setValueIsValid(validateEmail(value));
        } else if (userValueType === 'fullName') {
            // check if value only contains letters and spaces
            setValueIsValid(/^[a-zA-Z ]+$/.test(value));
        }
    }, [value]);

    // toggle between edit and view mode
    const toggleField = () => {
        setFieldStatus(!fieldStatus);
    };

    const setUserVal = () => {
        // console.log(user.userId, userValueType, value);
        if (userValueType === 'fullName') {
            user.fullName = value;
        } else if (userValueType === 'email') {
            user.email = value;
        }
    };

    // save changes to local storage and session object
    const toast = useToast();
    const handleFormSubmit = async e => {
        e.preventDefault();

        if (!fieldStatus) {
            setUserVal();
            // put request to update user in database with token in bearer header /user
            await axi
                .put(
                    '/user',
                    {
                        [userValueType]: value,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then(() => {
                    // console.log('res.data', res.data);
                    toast({
                        title: 'Success',
                        description: 'Your profile has been updated',
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    });
                })
                .catch(() => {
                    // console.log(err);
                    toast({
                        title: 'Error',
                        description: 'There was an error updating your profile',
                        status: 'error',
                        duration: 5000,
                        isClosable: true,
                    });
                });
            // updateSessionObj(true, sessionObj.userId); // update sessionObj with new value that was just set
            // toast({
            //     title: 'Successfully updated profile details.',
            //     description: "We've saved your changes.",
            //     status: 'success',
            //     duration: 4000,
            //     isClosable: true,
            // });
        }
        toggleField();
    };

    return (
        <FormControl isInvalid={!valueIsValid} onSubmit={handleFormSubmit}>
            <Stack minW="450px" w="60vw" maxW="750px">
                <Box>
                    <FormLabel fontWeight="600" mb="5px">
                        {label}
                    </FormLabel>
                    <Grid gap="20px" templateColumns="1fr 50px">
                        <Input
                            width="100%"
                            type={type}
                            value={value}
                            disabled={fieldStatus}
                            onChange={e => setValue(e.currentTarget.value)}
                            isRequired
                        />
                        {canEdit ? (
                            <>
                                <Button
                                    isDisabled={!valueIsValid}
                                    type="submit"
                                    onClick={handleFormSubmit}
                                >
                                    {!fieldStatus ? <GoCheck /> : <HiPencil />}
                                </Button>
                                <FormErrorMessage mt="-10px">
                                    {userValueType === 'email'
                                        ? 'Please enter a valid email'
                                        : 'Please enter a valid name'}
                                </FormErrorMessage>
                            </>
                        ) : null}
                    </Grid>
                </Box>
            </Stack>
        </FormControl>
    );
};

ProfileRow.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string.isRequired,
    canEdit: PropTypes.bool.isRequired,
    userValueType: PropTypes.string.isRequired,
};

ProfileRow.defaultProps = {
    placeholder: 'defaultVal',
};

export default ProfileRow;
