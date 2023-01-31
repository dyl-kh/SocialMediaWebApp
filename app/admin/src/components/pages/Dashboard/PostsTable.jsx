import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid, Typography, Box, Stack, Switch } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import PropTypes from 'prop-types';
import { useStore } from '../../../context/adminContext';
import richTextRender from '../../../utils/richTextRender';
import previewRender from '../../../utils/previewRender';

// This component is used to display a list of posts in a table
const PostsTable = props => {
    const { title, reactionType } = props;

    const { state } = useStore();

    const { mostLikedPosts, mostDislikedPosts } = state;
    const [rowExpanded, setRowExpanded] = useState(false);

    const posts = reactionType === 'like' ? mostLikedPosts : mostDislikedPosts;
    const postsForSort = [...posts];

    // sort posts by reaction count and add a rank property
    const sortedPosts = postsForSort
        .sort((a, b) => b.reactionCount - a.reactionCount)
        .map((post, index) => ({ ...post, rank: index + 1 }));

    /* const sortedPosts = [
        {
            "rank": 1,
            "postId": "8f960b87-060b-48e7-a901-5ca76d37d067",
            "reactionCount": 1,
            "userId": "faf55049-ae3a-4245-88f8-55836e3007da",
            "postBody": "[{\"type\":\"paragraph\",\"children\":[{\"text\":\"wqefwefwefwef\"}]}]",
            "deleted": false,
            "dateTime": "1666263099000",
            "fullName": "Dylan Khan"
        }
    ]
      */

    const dateTimeString = dateTime => {
        const date = new Date(parseInt(dateTime, 10));
        return date.toLocaleString();
    };

    // this function is used to render the post body in a preview format
    const truncateContent = content => {
        if (content.length > 20) {
            return `${content.substring(0, 20).trim()} ...`;
        }
        return content;
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

    return (
        <>
            <Grid container marginY={3}>
                <Grid item xs={10}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" fontWeight={500}>
                            {title}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Typography>Preview</Typography>
                        <Switch
                            onChange={() => setRowExpanded(!rowExpanded)}
                            checked={rowExpanded}
                        />
                        <Typography>Full</Typography>
                    </Box>
                </Grid>
            </Grid>

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
                            <TableCell>RANK</TableCell>
                            <TableCell>AUTHOR</TableCell>
                            <TableCell>CONTENT</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell align="right">DATE TIME</TableCell>
                            <TableCell align="right">
                                {reactionType.toUpperCase()}S
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedPosts.map(post => (
                            <TableRow
                                hover
                                key={post.rank}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                    cursor: 'pointer',
                                }}
                                onClick={() => setRowExpanded(!rowExpanded)}
                            >
                                <TableCell component="th" scope="row">
                                    {post.rank}
                                </TableCell>
                                <TableCell>{post.fullName}</TableCell>
                                <TableCell>
                                    <Typography
                                        style={
                                            rowExpanded
                                                ? { marginBottom: '25px' }
                                                : {}
                                        }
                                        component="div"
                                    >
                                        {rowExpanded
                                            ? richTextRender(post.postBody)
                                            : truncateContent(
                                                  previewRender(post.postBody)
                                              )}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    {postStatusIconStack(post.deleted)}
                                </TableCell>
                                <TableCell align="right">
                                    {dateTimeString(post.dateTime)}
                                </TableCell>
                                <TableCell align="right">
                                    {post.reactionCount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default PostsTable;

// validate prop types
PostsTable.propTypes = {
    title: PropTypes.string.isRequired,
    reactionType: PropTypes.string.isRequired,
};
