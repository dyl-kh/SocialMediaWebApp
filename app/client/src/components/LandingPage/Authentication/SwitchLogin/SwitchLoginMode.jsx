import React from 'react';
import { Text, Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import StyledHyperText from './SwitchLoginMode.style';

const SwitchLoginMode = props => {
    const { isLogin, toggleIsLogin } = props;

    return (
        <Flex gap="5px" mb="15px">
            <Text fontSize="large">
                {isLogin ? "Don't have an account?" : 'Already a member?'}
            </Text>
            <StyledHyperText onClick={toggleIsLogin}>
                {isLogin ? 'Sign up' : 'Log in.'}
            </StyledHyperText>
        </Flex>
    );
};

SwitchLoginMode.propTypes = {
    isLogin: PropTypes.bool.isRequired,
    toggleIsLogin: PropTypes.func.isRequired,
};

export default SwitchLoginMode;
