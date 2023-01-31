import React from 'react';
import { Box, Heading, Text, Image, Center } from '@chakra-ui/react';
import { backgroundColorToggle } from '../common/ColorModeValues';
import LABEL from '../../constants/label';

// LandingInfo component is the left section of the landing page, which contains the LAN logo and a description of the app
const LandingInfo = () => {
    return (
        <Box w="100%" h="100vh" p={20} bg={backgroundColorToggle}>
            <Heading mr="10px" color="blue.500" fontSize="4xl">
                LAN.
            </Heading>
            <Text fontSize="medium" mb="20px" whiteSpace="pre-wrap">
                {LABEL.LANDING_PAGE_DESCRIPTION}
            </Text>
            <Box boxSize="sm" w="100%" h="50vh">
                <Center>
                    <Image
                        src="https://bit.ly/3R1Ep8U"
                        alt="People Socialising"
                        borderRadius="15px"
                        bg="transparent"
                        width="100%"
                        maxH="70vh"
                        objectFit="contain"
                    />
                </Center>
            </Box>
        </Box>
    );
};

export default LandingInfo;
