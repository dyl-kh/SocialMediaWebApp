import React, { useEffect } from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Typography,
    Stack,
    Tooltip,
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import RestoreIcon from '@mui/icons-material/Restore';
import CircleIcon from '@mui/icons-material/Circle';
import { useQuery, gql, useMutation } from '@apollo/client';
import { PropTypes } from 'prop-types';
import parseDate from '../../../common/parseDate';
import { useStore } from '../../../../context/adminContext';
import { getUsersData } from '../../../../context/getUsersData';

const GET_DISLIKERS = gql`
    query GetPostDislikers($postId: ID!) {
        getPostDislikers(postId: $postId) {
            userId
            fullName
            dateTimeDisliked
            isBlocked
        }
    }
`;

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

// This component is used to display a list of users who disliked a post
const DislikersTable = props => {
    const { postId } = props;
    const [dislikers, setDislikers] = React.useState([]);
    // dispatch used to update the state of the admin context after user is toggle blocked
    const { dispatch } = useStore();
    const [toggleBlockUser] = useMutation(TOGGLE_BLOCKED_USER);

    // get the list of users who disliked this post
    const { loading, error, data, refetch } = useQuery(GET_DISLIKERS, {
        variables: { postId },
    });

    // fetch dislikers for postId
    useEffect(() => {
        if (data) {
            setDislikers(data.getPostDislikers);
        }
    }, [data]);

    // return a loading indicator if the query is still loading
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    // this function generates an icon based on the user's block status
    const userStatusIconStack = isBlocked => {
        const color = isBlocked ? '#fa3e3e' : '#1ba647';
        const status = isBlocked ? 'Blocked' : 'Active';

        return (
            <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{
                    justifyContent: 'flex-end',
                }}
            >
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

    // this function is used to toggle the block status of a user
    // it updates the state of the admin context after the user is blocked
    // and also refetches the list of dislikers for this component to update the UI
    const handleToggleUserBlock = async (event, user) => {
        event.stopPropagation();
        // toggle block user
        await toggleBlockUser({
            variables: { userId: user.userId },
        });
        // grab users data and update context
        const users = await getUsersData();
        dispatch({
            type: 'UPDATE_USERS',
            payload: users,
        });
        // refetch dislikers to update this component state
        refetch();
    };

    return (
        <TableContainer
            component={Paper}
            sx={{
                boxShadow: 'none',
                border: '1px solid #ebebeb',
            }}
        >
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#fafafa',
                        }}
                    >
                        <TableCell>ALL DISLIKERS</TableCell>
                        <TableCell>DATETIME</TableCell>
                        <TableCell align="right">USER STATUS</TableCell>
                        <TableCell align="right">ACTIONS</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dislikers.map(disliker => (
                        <TableRow
                            key={disliker.userId}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {disliker.fullName}
                            </TableCell>
                            <TableCell>
                                {parseDate(disliker.dateTimeDisliked)}
                            </TableCell>
                            <TableCell align="right">
                                {userStatusIconStack(disliker.isBlocked)}
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip
                                    title={
                                        disliker.isBlocked
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
                                                disliker
                                            )
                                        }
                                        color={
                                            disliker.isBlocked
                                                ? 'primary'
                                                : 'error'
                                        }
                                    >
                                        {disliker.isBlocked ? (
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
    );
};

export default DislikersTable;

// validate props
DislikersTable.propTypes = {
    postId: PropTypes.string,
};

// set default props
DislikersTable.defaultProps = {
    postId: '',
};
