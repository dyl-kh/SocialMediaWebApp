import { gql } from '@apollo/client';
import { initializeApollo } from './apolloClient';

// ==================== GraphQL Queries ====================
const GET_USERS = gql`
    query GetUsers {
        getUsers {
            userId
            fullName
            numReactions
            numPosts
            numFollowing
            numFollowers
            email
            dateJoined
            isBlocked
        }
    }
`;

const GET_DAILY_FOLLOWERS = gql`
    query GetNewDailyFollowers(
        $startDate: String!
        $endDate: String!
        $userId: ID!
    ) {
        getNewDailyFollowers(
            startDate: $startDate
            endDate: $endDate
            userId: $userId
        ) {
            date
            newFollowers
        }
    }
`;
// ==================== End GraphQL Queries ====================

// startDate is 8 days ago in the format of YYYY-MM-DD
const startDate = new Date(new Date().setDate(new Date().getDate() - 8))
    .toISOString()
    .split('T')[0];

// endDate is tomorrow in the format of YYYY-MM-DD
const endDate = new Date(new Date().setDate(new Date().getDate() + 1))
    .toISOString()
    .split('T')[0];

// This is the function that will be called in the App component
// to get all the users data from the database to be stored in the Context
const getUsersData = async () => {
    const client = initializeApollo();
    const res = await client.query({
        query: GET_USERS,
    });
    const users = res.data.getUsers;

    return users;
};

// This function gets the new daily followers for a user
const getUserDailyFollowers = async userId => {
    const client = initializeApollo();
    const res = await client.query({
        query: GET_DAILY_FOLLOWERS,
        variables: {
            startDate,
            endDate,
            userId,
        },
    });
    const dailyFollowers = res.data.getNewDailyFollowers;

    return dailyFollowers;
};

export { getUsersData, getUserDailyFollowers };
