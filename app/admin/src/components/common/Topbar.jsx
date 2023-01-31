import React from 'react';
import { Box, Avatar } from '@mui/material';
import NotificationMenu from './NotificationMenu';

// This component is used to display the topbar which is imported into the App component
const Topbar = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                border: '1px solid #eaeaea',
                height: '50px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    height: '100%',
                    padding: '0 20px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <NotificationMenu />
                    <Avatar
                        sx={{
                            bgcolor: '#84119c',
                            marginLeft: '20px',
                            height: '30px',
                            width: '30px',
                            fontSize: '12px',
                        }}
                    >
                        AD
                    </Avatar>
                </Box>
            </Box>
        </Box>
    );
};

export default Topbar;
