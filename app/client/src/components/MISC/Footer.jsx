import {
    Box,
    Heading,
    Container,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
    return (
        <Box
            color={useColorModeValue('gray.400', 'gray.500')}
            mt="100px"
            borderTopWidth={1}
            borderStyle="solid"
            borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
            <Container
                as={Stack}
                maxW="6xl"
                py={4}
                spacing={4}
                justify="center"
                align="center"
            >
                <Heading
                    color={useColorModeValue('gray.400', 'gray.500')}
                    fontSize="2xl"
                >
                    LAN
                </Heading>
                <Stack direction="row" spacing={6}>
                    <Link to="/feed">
                        <Text _hover={{ color: 'blue.500' }}>Feed</Text>
                    </Link>
                    <Link to="/profile">
                        <Text _hover={{ color: 'blue.500' }}>Profile</Text>
                    </Link>
                </Stack>
            </Container>

            <Box
                borderTopWidth={1}
                borderStyle="solid"
                borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
                <Container
                    as={Stack}
                    maxW="6xl"
                    py={4}
                    spacing={4}
                    justify="center"
                    align="center"
                >
                    <Text>Proudly made by Dylan Khan and Thomas Yao, 2022</Text>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
