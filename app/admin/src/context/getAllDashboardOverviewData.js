import { gql } from '@apollo/client';
import { initializeApollo } from './apolloClient';

// ==================== GraphQL Queries ====================
const GET_SUMMARY_STATS = gql`
    query GetSummaryStats {
        getSummaryStats {
            totalUsers
            totalUsersPercentageChange
            totalPageViews
            totalPageViewsPercentageChange
            totalEngagement
            totalEngagementPercentageChange
        }
    }
`;

const GET_DAY_UNIQUE_USERS = gql`
    query GetDayUniqueUsers($startDate: String!, $endDate: String!) {
        getDayUniqueUsers(startDate: $startDate, endDate: $endDate) {
            date
            uniqueUsers
        }
    }
`;

const GET_MOST_VISITED_USERS = gql`
    query GetMostVisitedUsers($numberOfUsers: Int!) {
        getMostVisitedUsers(numberOfUsers: $numberOfUsers) {
            userId
            fullName
            visitCount
        }
    }
`;

const GET_DAILY_POST_REACTS = gql`
    query GetDailyPostReacts($startDate: String!, $endDate: String!) {
        getDailyPostReacts(startDate: $startDate, endDate: $endDate) {
            date
            reactions {
                like
                dislike
            }
        }
    }
`;

const GET_TOTAL_REACTS = gql`
    query GetTotalReactions {
        getTotalReactions {
            like
            dislike
        }
    }
`;

const GET_TOP_REACTED_POSTS = gql`
    query GetTopReactedPosts($reactionType: String!, $numberOfPosts: Int!) {
        getTopReactedPosts(
            reactionType: $reactionType
            numberOfPosts: $numberOfPosts
        ) {
            postId
            reactionCount
            userId
            postBody
            deleted
            dateTime
            fullName
        }
    }
`;
// ==================== GraphQL Queries ====================

// startDate is 8 days ago in the format of YYYY-MM-DD
const startDate = new Date(new Date().setDate(new Date().getDate() - 8))
    .toISOString()
    .split('T')[0];

// endDate is tomorrow in the format of YYYY-MM-DD
const endDate = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split('T')[0];

// This is the function that will be called in the App component
// to get all the data from the database to be stored in the Context
const getAllDashboardOverviewData = async () => {
    let res;
    const client = initializeApollo();
    res = await client.query({
        query: GET_SUMMARY_STATS,
    });
    const summaryStats = res.data.getSummaryStats;

    res = await client.query({
        query: GET_DAY_UNIQUE_USERS,
        variables: {
            startDate,
            endDate,
        },
    });
    const dayUniqueUsers = res.data.getDayUniqueUsers;

    res = await client.query({
        query: GET_MOST_VISITED_USERS,
        variables: {
            numberOfUsers: 10,
        },
    });
    const mostVisitedUsers = res.data.getMostVisitedUsers;

    res = await client.query({
        query: GET_DAILY_POST_REACTS,
        variables: {
            startDate,
            endDate,
        },
    });
    const dailyPostReacts = res.data.getDailyPostReacts;

    res = await client.query({
        query: GET_TOTAL_REACTS,
    });
    const totalReactions = res.data.getTotalReactions;

    res = await client.query({
        query: GET_TOP_REACTED_POSTS,
        variables: {
            reactionType: 'like',
            numberOfPosts: 10,
        },
    });
    const mostLikedPosts = res.data.getTopReactedPosts;

    res = await client.query({
        query: GET_TOP_REACTED_POSTS,
        variables: {
            reactionType: 'dislike',
            numberOfPosts: 10,
        },
    });
    const mostDislikedPosts = res.data.getTopReactedPosts;

    const contextState = {
        summaryStats,
        dayUniqueUsers,
        mostVisitedUsers,
        dailyPostReacts,
        totalReactions,
        mostLikedPosts,
        mostDislikedPosts,
    };

    // console.log('All data fetched', contextState);
    return contextState;
};

export default getAllDashboardOverviewData;
