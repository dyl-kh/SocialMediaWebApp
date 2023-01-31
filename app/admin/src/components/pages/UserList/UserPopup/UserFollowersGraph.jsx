import React from 'react';
import ApexChart from 'react-apexcharts';
import { Card, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

// This component is used to display the graph of a user's followers
const UserFollowersGraph = props => {
    const { userDailyFollowers: dailyFollowers } = props;

    // remove dates in the future from dailyFollowers
    const today = new Date();
    const filteredDailyFollowers = dailyFollowers.filter(follower => {
        const followerDate = new Date(follower.date);
        return followerDate <= today;
    });

    // apexcharts line graph options and data for the graph
    const chartData = {
        series: [
            {
                name: 'New Followers',
                data: filteredDailyFollowers.map(
                    follower => follower.newFollowers
                ),
            },
        ],
        options: {
            chart: {
                type: 'line',
                height: 350,
                toolbar: {
                    show: false,
                },
                zoom: {
                    enabled: false,
                },
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                categories: filteredDailyFollowers.map(follower => {
                    // format date to Day Mon DD
                    const date = new Date(follower.date);
                    const options = {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                    };
                    return date.toLocaleDateString('en-US', options);
                }),
                labels: {
                    // rotate x-axis labels
                    rotate: -90,
                    rotateAlways: true,
                    hideOverlappingLabels: true,
                },
            },
            markers: {
                size: 4,
                strokeColors: '#fff',
                strokeWidth: 2,
                hover: {
                    size: 7,
                },
            },
        },
    };

    return (
        <Card
            sx={{
                height: '100%',
                border: '1px solid #e0e0e0',
                boxShadow: 'none',
                padding: '20px',
            }}
        >
            <Typography variant="h6" fontWeight={500} align="center">
                Daily Followers
            </Typography>
            <ApexChart
                options={chartData.options}
                series={chartData.series}
                type="line"
                height={350}
            />
        </Card>
    );
};

export default UserFollowersGraph;

// validate props
UserFollowersGraph.propTypes = {
    userDailyFollowers: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string,
            newFollowers: PropTypes.number,
        })
    ).isRequired,
};
