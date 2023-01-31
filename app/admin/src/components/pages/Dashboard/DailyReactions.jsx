import React from 'react';
import { Card, Grid, Typography, Box } from '@mui/material';
import ApexChart from 'react-apexcharts';
import { useStore } from '../../../context/adminContext';

// This component is used to display the daily reactions chart
const DailyReactions = () => {
    const { state } = useStore();
    const { dailyPostReacts } = state;

    // replace null values with zeros
    const updatedDailyPostReacts = dailyPostReacts.map(obj => {
        return {
            date: obj.date,
            reactions: {
                like: obj.reactions.like ? obj.reactions.like : 0,
                dislike: obj.reactions.dislike ? obj.reactions.dislike : 0,
            },
        };
    });

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="h6" fontWeight={500} marginY={3}>
                            Daily Reactions
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
                            id: 'daily-reactions',
                            toolbar: {
                                show: false,
                            },
                            zoom: {
                                enabled: false,
                            },
                        },
                        colors: ['#faac2f', '#32c76b'],
                        xaxis: {
                            categories: updatedDailyPostReacts.map(
                                post => post.date
                            ),
                        },
                    }}
                    series={[
                        {
                            name: 'Dislikes',
                            data: updatedDailyPostReacts.map(
                                post => post.reactions.dislike
                            ),
                        },
                        {
                            name: 'Likes',
                            data: updatedDailyPostReacts.map(
                                post => post.reactions.like
                            ),
                        },
                    ]}
                    type="line"
                    height={350}
                />
            </Card>
        </>
    );
};

export default DailyReactions;
