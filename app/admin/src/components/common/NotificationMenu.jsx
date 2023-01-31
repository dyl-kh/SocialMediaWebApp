import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationMenuItem from './NotificationMenuItem';
import { useStore, ACTIONS } from '../../context/adminContext';

const NotificationMenu = () => {
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const { state, dispatch } = useStore();
    const { notifications } = state;

    useEffect(() => {
        setUnreadNotifications(0);
        notifications.forEach(n => {
            if (!n.read) {
                setUnreadNotifications(unreadNotifications + 1);
            }
        });
    }, [notifications]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
        // set all notifications to read
        const updatedNotifications = notifications.map(n => {
            // eslint-disable-next-line no-param-reassign
            n.read = true;
            return n;
        });
        dispatch({
            type: ACTIONS.UPDATE_NOTIFICATIONS,
            payload: updatedNotifications,
        });
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="outlined"
                startIcon={
                    <Badge
                        badgeContent={unreadNotifications}
                        sx={{
                            '& .MuiBadge-badge': {
                                backgroundColor: '#f44336',
                                color: '#fff',
                            },
                        }}
                    >
                        <NotificationsIcon />
                    </Badge>
                }
                sx={{
                    height: '30px',
                    fontSize: '12px',
                    marginLeft: '10px',
                }}
                onClick={handleClick}
            >
                Notifications
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                sx={{
                    // light box shadow
                    '& .MuiPaper-root': {
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
                    },
                    marginTop: '10px',
                }}
                // change anchor to bottom right
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {notifications.length > 0 ? (
                    // only get latest 10 notifications
                    notifications
                        .slice(-10)
                        .reverse()
                        .map(notification => (
                            <NotificationMenuItem
                                key={notification.id}
                                notification={notification}
                                handleClose={handleClose}
                            />
                        ))
                ) : (
                    <div
                        style={{
                            padding: '10px',
                            paddingX: '20px',
                            textAlign: 'center',
                            color: '#555',
                        }}
                    >
                        No notifications
                    </div>
                )}
            </Menu>
        </div>
    );
};

export default NotificationMenu;
