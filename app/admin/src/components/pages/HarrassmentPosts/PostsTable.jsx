import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Stack } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import { useStore } from '../../../context/adminContext';
import PostPopup from './PostPopup';
import parseDate from '../../common/parseDate';
import previewRender from '../../../utils/previewRender';

// This component is used to display a list of posts in the harrassed post page
const PostsTable = () => {
    const { state } = useStore();
    const { harrassedPosts, users } = state;

    // state to handle the popup
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});

    const handlePostRowClick = post => {
        setSelectedPost(post);
        setOpenPostDialog(true);
    };

    // this function generates an icon based on the post status
    const postStatusIconStack = deleted => {
        const color = deleted ? '#fa3e3e' : '#1ba647';
        const status = deleted ? 'Deleted' : 'Visible';

        return (
            <Stack direction="row" spacing={1} alignItems="center">
                <CircleIcon
                    style={{
                        color,
                        height: '13px',
                        width: '13px',
                    }}
                />
                <Typography>{status}</Typography>
            </Stack>
        );
    };

    // this function is used to render the post body in a preview format
    const truncateContent = content => {
        if (content.length > 50) {
            return `${content.substring(0, 50).trim()} ...`;
        }
        return content;
    };

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{
                    boxShadow: 'none',
                    border: '1px solid #ebebeb',
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: '#fafafa',
                            }}
                        >
                            <TableCell>AUTHOR</TableCell>
                            <TableCell>CONTENT</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell align="right">DATE TIME</TableCell>
                            <TableCell align="right">LIKES</TableCell>
                            <TableCell align="right">DISLIKES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {harrassedPosts.map(post => (
                            <TableRow
                                hover
                                onClick={() => handlePostRowClick(post)}
                                key={post.postId}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                <TableCell>
                                    {
                                        users.find(
                                            user => user.userId === post.userId
                                        )?.fullName
                                    }
                                </TableCell>
                                <TableCell>
                                    {truncateContent(
                                        previewRender(post.postBody)
                                    )}
                                </TableCell>
                                <TableCell>
                                    {postStatusIconStack(post.deleted)}
                                </TableCell>
                                <TableCell align="right">
                                    {parseDate(post.dateTime)}
                                </TableCell>
                                <TableCell align="right">
                                    {post.likes}
                                </TableCell>
                                <TableCell align="right">
                                    {post.dislikes}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PostPopup
                openPostDialog={openPostDialog}
                setOpenPostDialog={setOpenPostDialog}
                post={selectedPost}
            />
        </>
    );
};

export default PostsTable;
