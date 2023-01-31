import React from 'react';
import { Grid, Box, Card, Avatar, Divider } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import { PropTypes } from 'prop-types';

// This component is used to display the details of a user in a presentable format
// it displays the user's name, email, date joined, followers, following and posts
const UserDetailsCard = props => {
    const { selectedUser } = props;

    const initials = selectedUser.fullName
        .split(' ')
        .map(name => name[0])
        .join('');

    return (
        <Card
            sx={{
                height: '100%',
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                padding: '20px',
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: '#84119c',
                        height: '100px',
                        width: '100px',
                        fontSize: '40px',
                    }}
                >
                    {initials}
                </Avatar>
                <h3 style={{ marginTop: '20px', marginBottom: '-10px' }}>
                    {selectedUser.fullName}
                </h3>
                <p>{selectedUser.userId}</p>
            </Box>
            <Divider />
            <Grid container sx={{ marginY: '20px' }}>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{ marginBottom: '-10px' }}>
                            {selectedUser.numFollowers}
                        </h3>
                        <p>Followers</p>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{ marginBottom: '-10px' }}>
                            {selectedUser.numFollowing}
                        </h3>
                        <p>Following</p>
                    </Box>
                </Grid>
                <Grid item xs={4}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <h3 style={{ marginBottom: '-10px' }}>
                            {selectedUser.numPosts}
                        </h3>
                        <p>Posts</p>
                    </Box>
                </Grid>
            </Grid>
            <Divider />
            <Grid container sx={{ marginTop: '20px' }}>
                <Grid item xs={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <EmailIcon />
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                        }}
                    >
                        <p>{selectedUser.email}</p>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '100%',
                        }}
                    >
                        <CalendarIcon />
                    </Box>
                </Grid>
                <Grid item xs={10}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                        }}
                    >
                        <p>
                            {new Date(
                                selectedUser.dateJoined
                            ).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </p>
                    </Box>
                </Grid>
            </Grid>
        </Card>
    );
};

export default UserDetailsCard;

// validate props
UserDetailsCard.propTypes = {
    selectedUser: PropTypes.shape({
        userId: PropTypes.string,
        fullName: PropTypes.string,
        email: PropTypes.string,
        dateJoined: PropTypes.string,
        numFollowers: PropTypes.number,
        numFollowing: PropTypes.number,
        numPosts: PropTypes.number,
    }).isRequired,
};
