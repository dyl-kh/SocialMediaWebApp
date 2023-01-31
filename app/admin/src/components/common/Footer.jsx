import { Box, Container, Typography } from '@mui/material';
import React from 'react';

// This component is used to display the footer at the bottom of the page
const Footer = () => {
    return (
        <Container
            sx={{
                marginTop: 6,
                marginBottom: 3,
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    By Thomas Yao and Dylan Khan
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    Created October 2022
                </Typography>
            </Box>
        </Container>
    );
};

export default Footer;
