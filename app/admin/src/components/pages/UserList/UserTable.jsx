import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { gql, useMutation } from '@apollo/client';
import Paper from '@mui/material/Paper';
import { Typography, Stack, Tooltip, IconButton } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import RestoreIcon from '@mui/icons-material/Restore';
import CircleIcon from '@mui/icons-material/Circle';
import UserPopup from './UserPopup';
import { useStore, ACTIONS } from '../../../context/adminContext';
import {
    getUserDailyFollowers,
    getUsersData,
} from '../../../context/getUsersData';

const TOGGLE_BLOCKED_USER = gql`
    mutation Mutation($userId: ID!) {
        toggleBlockUser(userId: $userId) {
            userId
            fullName
            email
            dateJoined
            isBlocked
        }
    }
`;

// This component is used to display a list of users in the user page
const UserTable = () => {
    const { state, dispatch } = useStore();
    const { users } = state;

    const [toggleBlockUser] = useMutation(TOGGLE_BLOCKED_USER);

    // get the list of users who disliked this post

    const [openUserDialog, setOpenUserDialog] = useState(false);

    const handleUserRowClick = async user => {
        const {
            userId,
            fullName,
            numFollowers,
            numFollowing,
            numPosts,
            email,
            dateJoined,
        } = user;

        const userDailyFollowers = await getUserDailyFollowers(userId);

        // dispatch SET_SELECTED_USER action to context to store selected user data
        // for use in UserPopup
        dispatch({
            type: ACTIONS.SET_SELECTED_USER,
            payload: {
                userId,
                fullName,
                numFollowers,
                numFollowing,
                numPosts,
                email,
                dateJoined,
                userDailyFollowers,
            },
        });

        setOpenUserDialog(true);
    };

    // this function generates an icon based on the user's block status
    const accountStatusIconStack = blocked => {
        const color = blocked ? '#fa3e3e' : '#1ba647';
        const status = blocked ? 'Blocked' : 'Active';

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

    const handleToggleUserBlock = async (event, user) => {
        event.stopPropagation();
        await toggleBlockUser({
            variables: { userId: user.userId },
        });
        // grab users data and update context
        const newUsers = await getUsersData();
        dispatch({
            type: 'UPDATE_USERS',
            payload: newUsers,
        });
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
                            <TableCell>FULL NAME</TableCell>
                            <TableCell>EMAIL</TableCell>
                            <TableCell>ACCOUNT STATUS</TableCell>
                            <TableCell align="right">DATE JOINED</TableCell>
                            <TableCell align="right">FOLLOWERS</TableCell>
                            <TableCell align="right">FOLLOWING</TableCell>
                            <TableCell align="right">POSTS</TableCell>
                            <TableCell align="right">REACTIONS</TableCell>
                            <TableCell align="right">ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {}
                        {users.map(user => (
                            <TableRow
                                hover
                                onClick={() => handleUserRowClick(user)}
                                key={user.userId}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                    cursor: 'pointer',
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.fullName}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {accountStatusIconStack(user.isBlocked)}
                                </TableCell>
                                <TableCell align="right">
                                    {new Date(user.dateJoined).toDateString()}
                                </TableCell>
                                <TableCell align="right">
                                    {user.numFollowers}
                                </TableCell>
                                <TableCell align="right">
                                    {user.numFollowing}
                                </TableCell>
                                <TableCell align="right">
                                    {user.numPosts}
                                </TableCell>
                                <TableCell align="right">
                                    {user.numReactions}
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip
                                        title={
                                            user.isBlocked
                                                ? 'Restore User'
                                                : 'Block User'
                                        }
                                    >
                                        <IconButton
                                            aria-label="delete"
                                            size="small"
                                            onClick={event =>
                                                handleToggleUserBlock(
                                                    event,
                                                    user
                                                )
                                            }
                                            color={
                                                user.isBlocked
                                                    ? 'primary'
                                                    : 'error'
                                            }
                                        >
                                            {user.isBlocked ? (
                                                <RestoreIcon fontSize="inherit" />
                                            ) : (
                                                <BlockIcon fontSize="inherit" />
                                            )}
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UserPopup
                openUserDialog={openUserDialog}
                setOpenUserDialog={setOpenUserDialog}
            />
        </>
    );
};

export default UserTable;
