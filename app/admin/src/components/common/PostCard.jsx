import React from 'react';
import { Card, Avatar, Typography, Box, Stack } from '@mui/material';
import { PropTypes } from 'prop-types';
import { useStore } from '../../context/adminContext';
import parseDate from './parseDate';
import richTextRender from '../../utils/richTextRender';

// This component is used to display the details of a post in a similar format to the LAN client
// It is used in the various post lists
const PostCard = props => {
    // load in state from the global context AKA the store
    const { state } = useStore();
    const { users } = state;
    const { post } = props;
    const { postBody, userId, imageUrl, dateTime } = post;

    const formattedDateTime = parseDate(dateTime);

    // get fullname of user from users array using userid
    const fullName = users.find(user => user.userId === userId)?.fullName;
    const initials = fullName
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
            <Stack direction="row" spacing={2}>
                <Avatar
                    sx={{
                        bgcolor: '#275e61',
                        height: '50px',
                        width: '50px',
                        fontSize: '20px',
                    }}
                >
                    {initials}
                </Avatar>
                <Stack direction="column" spacing={0}>
                    <Typography variant="h6" marginBottom="-3px">
                        {fullName}
                    </Typography>
                    <Typography variant="p">{formattedDateTime}</Typography>
                </Stack>
            </Stack>
            <Box marginY="20px">
                <Typography variant="p">{richTextRender(postBody)}</Typography>
            </Box>
            {imageUrl && (
                <img
                    src={imageUrl}
                    alt="post"
                    style={{
                        width: '100%',
                    }}
                />
            )}
        </Card>
    );
};

export default PostCard;

// validate props
PostCard.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    post: PropTypes.object.isRequired,
};
