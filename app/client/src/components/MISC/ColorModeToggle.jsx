import { Button } from '@chakra-ui/react';
import { useColorMode } from '@chakra-ui/color-mode';
import { FaSun, FaMoon } from 'react-icons/fa';
import React from 'react';

const ColorModeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode(); // light or dark theme

    return (
        <Button mr="20px" onClick={toggleColorMode}>
            {colorMode === 'dark' ? <FaSun /> : <FaMoon />}
        </Button>
    );
};

export default ColorModeToggle;
