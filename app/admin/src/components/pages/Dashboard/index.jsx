import React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import SummaryStatsCard from './SummaryStatsCard';
import DailyVisitors from './DailyVisitors';
import MostVisitedProfiles from './MostVisitedProfiles';
import DailyReactions from './DailyReactions';
import ReactionsPieChart from './ReactionsPieChart';
import PostsTable from './PostsTable';
import { useStore } from '../../../context/adminContext';

// This is the entry point for the dashboard page
// It contains all the components that make up the dashboard and handles the grid layout
const Dashboard = () => {
    const { state } = useStore();
    const { summaryStats } = state;
    const {
        totalUsers,
        totalPageViews,
        totalEngagement,
        totalUsersPercentageChange,
        totalPageViewsPercentageChange,
        totalEngagementPercentageChange,
    } = summaryStats;

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" fontWeight={500} marginY={3}>
                            Summary Statistics
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Box className="dashboard">
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <SummaryStatsCard
                            title="Total Users"
                            value={totalUsers}
                            percentage={totalUsersPercentageChange}
                            descStart="New users today were"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SummaryStatsCard
                            title="Total Page Views"
                            value={totalPageViews}
                            percentage={totalPageViewsPercentageChange}
                            descStart="Page views today were"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <SummaryStatsCard
                            title="Total Engagement (reactions and comments)"
                            value={totalEngagement}
                            percentage={totalEngagementPercentageChange}
                            descStart="Engagement today was"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <DailyVisitors />
                    </Grid>
                    <Grid item xs={4}>
                        <MostVisitedProfiles />
                    </Grid>
                    <Grid item xs={8}>
                        <DailyReactions />
                    </Grid>
                    <Grid item xs={4}>
                        <ReactionsPieChart />
                    </Grid>
                    <Grid item xs={12}>
                        <PostsTable
                            title="Most Liked Posts"
                            reactionType="like"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PostsTable
                            title="Most Disliked Posts"
                            reactionType="dislike"
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Dashboard;
