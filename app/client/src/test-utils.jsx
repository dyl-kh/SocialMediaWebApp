import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const AllProviders = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const customRender = (ui, options) =>
    render(ui, { wrapper: AllProviders, ...options });

export default customRender;

AllProviders.propTypes = {
    children: PropTypes.node.isRequired,
};
