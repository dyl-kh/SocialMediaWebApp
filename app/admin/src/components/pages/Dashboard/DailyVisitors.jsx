import React from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import ApexChart from 'react-apexcharts';
import { useStore } from '../../../context/adminContext';

// This component is used to display the daily visitors chart
const DailyVisitors = () => {
    const { state } = useStore();
    const { dayUniqueUsers } = state;

    // only return date in format 'Jan 14'.
    // eg Fri Oct 14 2022 => 'Oct 14'
    const dateString = date => {
        return new Date(date).toString().slice(0, 10);
    };

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" fontWeight={500} marginY={3}>
                            Daily Visitors
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
                }}
            >
                <ApexChart
                    options={{
                        chart: {
                            id: 'daily-visitors',
                            toolbar: {
                                show: false,
                            },
                            zoom: {
                                enabled: false,
                            },
                        },
                        xaxis: {
                            categories: dayUniqueUsers.map(day =>
                                dateString(day.date)
                            ),
                        },
                    }}
                    series={[
                        {
                            name: 'Visitors',
                            data: dayUniqueUsers.map(day => day.uniqueUsers),
                        },
                    ]}
                    type="line"
                    height={350}
                />
            </Card>
        </>
    );
};

export default DailyVisitors;
