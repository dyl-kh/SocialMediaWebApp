import React from 'react';
import { Dialog, Grid, DialogActions, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import DislikersTable from './DislikersTable';
import PostCard from '../../../common/PostCard';
import getHarrassedPosts from '../../../../context/getHarrassedPosts';
import { useStore, ACTIONS } from '../../../../context/adminContext';
// This component is used to display a popup with the details of a harrassed post
const PostPopup = props => {
    const { openPostDialog, setOpenPostDialog, post } = props;
    const { dispatch } = useStore();
    const { deleted } = post;

    const TOGGLE_DELETE_POST = gql`
        mutation ToggleDeletePost($postId: ID!) {
            toggleDeletePost(postId: $postId) {
                postId
                userId
                postBody
                imageUrl
                parentPostId
                deleted
                dateTime
                editDateTime
                isRoot
            }
        }
    `;
    const [toggleDeletePost] = useMutation(TOGGLE_DELETE_POST);

    const handleDeletePost = async () => {
        await toggleDeletePost({ variables: { postId: post.postId } });
        setOpenPostDialog(false);

        const harrasedPosts = await getHarrassedPosts();

        dispatch({
            type: ACTIONS.UPDATE_HARRASSED_POSTS,
            payload: harrasedPosts,
        });
    };
    return (
        <Dialog
            open={openPostDialog}
            onClose={() => setOpenPostDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="sm"
        >
            <Grid
                container
                spacing={3}
                sx={{
                    width: '100%',
                    paddingTop: '20px',
                    paddingLeft: '20px',
                }}
            >
                <Grid item xs={12}>
                    <PostCard post={post} />
                </Grid>
                <Grid item xs={12}>
                    <DislikersTable postId={post.postId} />
                </Grid>
            </Grid>
            <DialogActions>
                <Button onClick={() => setOpenPostDialog(false)}>Cancel</Button>
                <Button onClick={() => handleDeletePost()}>
                    {deleted ? 'Restore' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostPopup;

// validate props
PostPopup.propTypes = {
    openPostDialog: PropTypes.bool.isRequired,
    setOpenPostDialog: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    post: PropTypes.object.isRequired,
};
