import { useColorModeValue } from '@chakra-ui/react';

// chakra ui color mode value overrides to work with dark and light theme
const headingColorToggle = () => useColorModeValue('gray.600', 'white');
const borderColorToggle = () => useColorModeValue('gray.100', 'gray.700');
const buttonColorToggle = () => useColorModeValue('red.500', 'red.400');
const backgroundColorToggle = () => useColorModeValue('gray.100', 'gray.900');

export {
    headingColorToggle,
    borderColorToggle,
    buttonColorToggle,
    backgroundColorToggle,
};
