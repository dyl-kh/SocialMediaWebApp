import React from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import ApexChart from 'react-apexcharts';
import { useStore } from '../../../context/adminContext';

// This component is used to display the reactions pie chart
const ReactionsPieChart = () => {
    const { state } = useStore();
    const { totalReactions } = state;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" fontWeight={500} marginY={3}>
                            Total Reaction Types
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
                    height: '398px',
                    paddingTop: '2rem',
                }}
            >
                <ApexChart
                    options={{
                        chart: {
                            id: 'reactions-pie-chart',
                            toolbar: {
                                show: false,
                            },
                            zoom: {
                                enabled: false,
                            },
                        },
                        colors: ['#faac2f', '#32c76b'],
                        labels: ['Dislikes', 'Likes'],
                        legend: {
                            show: true,
                            position: 'bottom',
                            horizontalAlign: 'center',
                            fontSize: '14px',
                            fontFamily: 'Roboto',
                            fontWeight: 400,
                            markers: {
                                width: 10,
                                height: 10,
                            },
                            itemMargin: {
                                horizontal: 10,
                            },
                        },
                        dataLabels: {
                            enabled: true,
                        },
                        responsive: [
                            {
                                breakpoint: 480,
                                options: {
                                    legend: {
                                        show: false,
                                    },
                                },
                            },
                        ],
                    }}
                    series={[totalReactions.dislike, totalReactions.like]}
                    height={350}
                    type="donut"
                    width="100%"
                />
            </Card>
        </>
    );
};

export default ReactionsPieChart;
