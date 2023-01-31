import React from 'react';
import { Grid, GridItem, Flex, Center } from '@chakra-ui/react';
import LandingInfo from './LandingInfo';
import Authentication from './Authentication/Authentication';
import ColorModeToggle from '../MISC/ColorModeToggle';

// Landing page component splits into two sections left and right: LandingInfo and Authentication
const LandingPage = () => {
    return (
        <Flex minH="100vh" align="center">
            <Grid templateColumns="repeat(2, 1fr)">
                <GridItem w="100%" h="100vh">
                    <LandingInfo />
                </GridItem>
                <GridItem w="100%" h="100vh">
                    <Flex justify="end" mt="10px" mb="0px">
                        <ColorModeToggle />
                    </Flex>
                    <Center w="85%" maxW="750px" h="min">
                        <Authentication />
                    </Center>
                </GridItem>
            </Grid>
        </Flex>
    );
};

export default LandingPage;
