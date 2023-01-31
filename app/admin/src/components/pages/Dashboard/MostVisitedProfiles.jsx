import React from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import ApexChart from 'react-apexcharts';
import { useStore } from '../../../context/adminContext';

// This component is used to display most visited profiles tree map
const MostVisitedProfiles = () => {
    const { state } = useStore();
    const { mostVisitedUsers } = state;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" fontWeight={500} marginY={3}>
                            Most Visited Profiles
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Card
                sx={{
                    boxShadow: 'none',
                    border: '1px solid #ebebeb',
                    textAlign: 'left',
                    padding: '1rem',
                    paddingLeft: '2rem',
                }}
            >
                <ApexChart
                    options={{
                        chart: {
                            id: 'most-visited-profiles',
                            toolbar: {
                                show: false,
                            },
                        },
                        tooltip: {
                            enabled: true,
                        },
                    }}
                    series={[
                        {
                            data: mostVisitedUsers.map(user => ({
                                x: user.fullName,
                                y: user.visitCount,
                            })),
                        },
                    ]}
                    type="treemap"
                    height={350}
                    width="100%"
                />
            </Card>
        </>
    );
};

export default MostVisitedProfiles;
