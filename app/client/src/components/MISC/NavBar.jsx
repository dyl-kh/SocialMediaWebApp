import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Text, Spacer, Heading } from '@chakra-ui/react';
import { borderColorToggle } from '../common/ColorModeValues';
import ProfileIcon from './ProfileIcon';
import ColorModeToggle from './ColorModeToggle';

// NavBar component visible on feed and profile pages
const NavBar = () => {
    return (
        <nav>
            <Flex
                minH="75px"
                py="5px"
                px="25px"
                borderBottom={1}
                borderStyle="solid"
                borderColor={borderColorToggle}
                align="center"
            >
                <Flex gap="30px" align="center">
                    <Link to="/feed">
                        <Heading mr="10px" color="blue.500" fontSize="2xl">
                            LAN
                        </Heading>
                    </Link>

                    <Link to="/feed">
                        <Text _hover={{ color: 'blue.500' }}>Feed</Text>
                    </Link>

                    <Link to="/users">
                        <Text _hover={{ color: 'blue.500' }}>Users</Text>
                    </Link>
                </Flex>
                <Spacer />
                <ColorModeToggle />
                <Link to="/profile">
                    <ProfileIcon />
                </Link>
            </Flex>
        </nav>
    );
};

export default NavBar;
