import React, { useEffect } from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Grid } from '@mui/material';
import Navbar from './components/common/Navbar';
import RouteSwitch from './RouteSwitch';
import Topbar from './components/common/Topbar';
import Footer from './components/common/Footer';
import { useStore, ACTIONS } from './context/adminContext';
import getAllDashboardOverviewData from './context/getAllDashboardOverviewData';
import { getUsersData } from './context/getUsersData';
import getFlaggedPosts from './context/getFlaggedPosts';
import getHarrassedPosts from './context/getHarrassedPosts';
import SnackController from './SnackController';

const customTheme = createTheme(); // for future styling if necessary

const App = () => {
    const { dispatch } = useStore();

    // clear notifications on page load
    useEffect(() => {
        const notifications = [];
        dispatch({
            type: ACTIONS.UPDATE_NOTIFICATIONS,
            payload: notifications,
        });
    }, [dispatch]);

    // fetch harrassed posts and dispatch to context
    useEffect(() => {
        const fetchHarrassedPosts = async () => {
            const harrassedPosts = await getHarrassedPosts();
            dispatch({
                type: ACTIONS.UPDATE_HARRASSED_POSTS,
                payload: harrassedPosts,
            });
        };
        fetchHarrassedPosts();
    }, [dispatch]);

    // fetch flagged posts and dispatch to context
    useEffect(() => {
        const fetchFlaggedPosts = async () => {
            const flaggedPosts = await getFlaggedPosts();
            dispatch({
                type: ACTIONS.UPDATE_FLAGGED_POSTS,
                payload: flaggedPosts,
            });
        };
        fetchFlaggedPosts();
    }, [dispatch]);

    // fetch user data and set it to state in context
    useEffect(() => {
        const fetchUsersData = async () => {
            const users = await getUsersData();
            dispatch({
                type: ACTIONS.UPDATE_USERS,
                payload: users,
            });
        };
        fetchUsersData();
    }, [dispatch]);

    // fetch dashboard overview data immediately on load
    useEffect(() => {
        const fetchData = async () => {
            const dashboardOverviewData = await getAllDashboardOverviewData();
            dispatch({
                type: ACTIONS.UPDATE_DASHBOARD_OVERVIEW_DATA,
                payload: dashboardOverviewData,
            });
        };
        fetchData();
    }, [dispatch]);

    // then fetch dashboard overview data every minute
    // and store in context using reducer dispatch
    useEffect(() => {
        const interval = setInterval(async () => {
            const dashboardOverviewData = await getAllDashboardOverviewData();
            dispatch({
                type: ACTIONS.UPDATE_DASHBOARD_OVERVIEW_DATA,
                payload: dashboardOverviewData,
            });
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <SnackController />
            <div
                className="App"
                style={{
                    backgroundColor: '#fafafb',
                }}
            >
                <Grid container spacing={0}>
                    <Grid item xs="auto">
                        <div
                            style={{
                                height: '100vh',
                                width: '236px',
                            }}
                        >
                            <Navbar />
                        </div>
                    </Grid>
                    <Grid
                        item
                        xs
                        sx={{
                            display: 'flex',
                            flexFlow: 'column',
                        }}
                    >
                        <Topbar />
                        <RouteSwitch />
                        <Footer />
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>
    );
};

export default App;
