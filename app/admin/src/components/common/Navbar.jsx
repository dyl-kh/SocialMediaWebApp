import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import NavBarItems from './navbarItems';

// This component is used to display the navbar on the left side of the page
const Navbar = () => {
    return (
        <MuiDrawer variant="permanent">
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    px: [3],
                }}
            >
                <Typography
                    component="h1"
                    variant="h5"
                    fontWeight={600}
                    color="#3181ce"
                    sx={{ textDecoration: 'none' }}
                    cursor="pointer"
                    mt={1.5}
                >
                    LAN
                    <span style={{ color: '#444' }}> ADMIN</span>
                </Typography>
            </Toolbar>
            <List
                component="nav"
                sx={{
                    mx: 1,
                    width: '220px',
                }}
            >
                <NavBarItems />
            </List>
        </MuiDrawer>
    );
};

export default Navbar;
