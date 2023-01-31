import React, { useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { gql, useSubscription } from '@apollo/client';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStore, ACTIONS } from './context/adminContext';
import getHarrassedPosts from './context/getHarrassedPosts';

const POSSIBLE_HARRASMENT = gql`
    subscription PossibleHarassment {
        possibleHarassment {
            postId
            recentDislikeCount
        }
    }
`;

const SnackButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            color="inherit"
            onClick={() => {
                navigate('/potential-harrassment');
            }}
            type="button"
        >
            View Post
        </Button>
    );
};

const SnackController = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { data } = useSubscription(POSSIBLE_HARRASMENT);
    const { state, dispatch } = useStore();

    const { notifications } = state;

    const ButtomComponent = useMemo(() => <SnackButton />, []);

    useEffect(() => {
        const handleIncomingSub = async () => {
            if (data) {
                const { recentDislikeCount } = data.possibleHarassment;
                enqueueSnackbar(
                    `A post was just disliked and has ${recentDislikeCount} dislikes in the last 24 hours`,
                    {
                        variant: 'warning',
                        action: () => ButtomComponent,
                    }
                );
                // also fetch all harrassed posts and update context
                const harrassedPosts = await getHarrassedPosts();
                dispatch({
                    type: ACTIONS.UPDATE_HARRASSED_POSTS,
                    payload: harrassedPosts,
                });
                // add new notification to context
                const newNotification = {
                    id: notifications.length + 1,
                    dateTime: new Date().toISOString(),
                    type: 'harassment',
                    read: false,
                };
                dispatch({
                    type: ACTIONS.UPDATE_NOTIFICATIONS,
                    payload: [...notifications, newNotification],
                });
            }
        };
        handleIncomingSub();
    }, [data, enqueueSnackbar]);

    return null;
};

export default SnackController;
