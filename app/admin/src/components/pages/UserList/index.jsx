import React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import UserTable from './UserTable';

// This is the entry point for the users page
const UserList = () => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" fontWeight={500} marginY={3}>
                            User List
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <UserTable />
        </Container>
    );
};

export default UserList;
