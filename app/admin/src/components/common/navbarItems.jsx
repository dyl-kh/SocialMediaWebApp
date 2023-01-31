import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import QueryStats from '@mui/icons-material/QueryStats';
import PeopleOutline from '@mui/icons-material/PeopleOutline';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import { useNavigate } from 'react-router-dom';

// This component is used to display the navbar items which is imported into the Navbar component
const NavBarItems = () => {
    const navigate = useNavigate();
    return (
        <>
            <ListItemButton onClick={() => navigate('/')}>
                <ListItemIcon>
                    <QueryStats />
                </ListItemIcon>
                <ListItemText primary="Overview" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/users')}>
                <ListItemIcon>
                    <PeopleOutline />
                </ListItemIcon>
                <ListItemText primary="Users" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/flagged-posts')}>
                <ListItemIcon>
                    <ReportGmailerrorredIcon />
                </ListItemIcon>
                <ListItemText primary="Flagged Posts" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/potential-harrassment')}>
                <ListItemIcon>
                    <ThumbDownOffAltIcon />
                </ListItemIcon>
                <ListItemText primary="Harrassment" />
            </ListItemButton>
        </>
    );
};

export default NavBarItems;
