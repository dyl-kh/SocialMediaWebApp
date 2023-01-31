import React from 'react';
import { Dialog, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import UserDetailsCard from './UserDetailsCard';
import UserFollowersGraph from './UserFollowersGraph';
import { useStore } from '../../../../context/adminContext';

// This component is used to display a popup with the details of a user
const UserPopup = props => {
    const { openUserDialog, setOpenUserDialog } = props;

    const { state } = useStore();
    const { selectedUser } = state;

    if (!selectedUser) {
        return null; // dont render anything if no user is selected
    }

    // grab the user's followers from the global state for the graph
    const { userDailyFollowers } = selectedUser;

    return (
        <Dialog
            open={openUserDialog}
            onClose={() => setOpenUserDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="lg"
        >
            <Grid
                container
                spacing={3}
                sx={{
                    width: '100%',
                    paddingY: '20px',
                    paddingLeft: '20px',
                }}
            >
                <Grid item xs={4}>
                    <UserDetailsCard selectedUser={selectedUser} />
                </Grid>
                <Grid item xs={8}>
                    <UserFollowersGraph
                        userDailyFollowers={userDailyFollowers}
                    />
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default UserPopup;

// validate props
UserPopup.propTypes = {
    openUserDialog: PropTypes.bool.isRequired,
    setOpenUserDialog: PropTypes.func.isRequired,
};
