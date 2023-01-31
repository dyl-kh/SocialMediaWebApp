import { Card, Grid, Typography } from '@mui/material';
import React from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PropTypes from 'prop-types';

// This component is used to display the summary stats card on the dashboard
// It takes in the following props:
// title: the title of the card
// value: the number value of the card
// percentage: the percentage change from yesterday
// descStart: the start of the description
const SummaryStatsCard = props => {
    const { title, value, percentage, descStart } = props;

    // convert value to string and add commas
    const formattedValue = value
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // round absolutePercentage to one decimal place
    const absolutePercentage = Math.abs(percentage).toFixed(1);

    const formattedDesc = `${descStart} ${absolutePercentage}% ${
        percentage > 0 ? 'more' : 'less'
    } than yesterday`;

    // boolean to determine the colour of the card
    const positive = percentage > 0;

    const darkGreen = '#1ba647';
    const lightGreen = '#e6ffee';
    const darkRed = '#e32929';
    const lightRed = '#ffe6e6';

    return (
        <Card
            sx={{
                boxShadow: 'none',
                border: '1px solid #ebebeb',
                textAlign: 'left',
                padding: '1rem',
            }}
        >
            <Typography variant="p" fontWeight={300}>
                {title}
            </Typography>
            <Grid container my={2}>
                <Grid item xs="auto" pr={2}>
                    <Typography variant="h6" fontWeight={500}>
                        {formattedValue}
                    </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Card
                        sx={{
                            boxShadow: 'none',
                            border: `1px solid ${
                                positive ? darkGreen : darkRed
                            }`,
                            // left align
                            textAlign: 'left',
                            padding: '4px',
                            backgroundColor: positive ? lightGreen : lightRed,
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            color: positive ? darkGreen : darkRed,
                        }}
                    >
                        {positive ? (
                            <ArrowUpwardIcon
                                sx={{ color: darkGreen, marginRight: '7px' }}
                            />
                        ) : (
                            <ArrowDownwardIcon
                                sx={{ color: darkRed, marginRight: '7px' }}
                            />
                        )}
                        <Typography
                            variant="p"
                            fontWeight={300}
                            fontSize="16px"
                            mr={1}
                        >
                            {absolutePercentage}%
                        </Typography>
                    </Card>
                </Grid>
            </Grid>
            <Typography variant="p" fontWeight={300} fontSize="12px">
                {formattedDesc}
            </Typography>
        </Card>
    );
};

export default SummaryStatsCard;

// validate props
SummaryStatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
    descStart: PropTypes.string.isRequired,
};
