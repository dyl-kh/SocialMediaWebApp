import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MenuItem,
    ListItemText,
    ListItemIcon,
    Typography,
} from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import PropTypes from 'prop-types';
import moment from 'moment';

const NotificationMenuItem = ({ notification }) => {
    const { type } = notification;

    const navigate = useNavigate();

    const handleClick = () => {
        if (type === 'flagged') {
            navigate('/flagged-posts');
        } else if (type === 'harassment') {
            navigate('/potential-harrassment');
        }
    };

    return (
        <MenuItem onClick={() => handleClick()}>
            <ListItemIcon>
                {type === 'flagged' ? (
                    <ReportGmailerrorredIcon />
                ) : (
                    <ThumbDownOffAltIcon />
                )}
            </ListItemIcon>
            <ListItemText>
                <Typography sx={{ fontWeight: 'bold' }}>
                    Requires Attention:
                </Typography>
                {type === 'flagged' ? (
                    <Typography>Flagged Post</Typography>
                ) : (
                    <Typography>Post Harassment</Typography>
                )}
                <Typography sx={{ fontSize: '12px' }}>
                    {moment(notification.dateTime).fromNow()}
                </Typography>
            </ListItemText>
        </MenuItem>
    );
};

NotificationMenuItem.propTypes = {
    notification: PropTypes.instanceOf(Object).isRequired,
};

export default NotificationMenuItem;
