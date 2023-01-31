import React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import PostsTable from './PostsTable';

// This is the entry point for the flagged posts page
const FlaggedPosts = () => {
    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography
                            variant="h6"
                            fontWeight={500}
                            marginTop={3}
                            marginBottom={1}
                        >
                            Flagged Posts
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            marginBottom={4}
                        >
                            These posts have been automatically flagged by the
                            system. Please review them and take appropriate
                            action.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <PostsTable />
        </Container>
    );
};

export default FlaggedPosts;
