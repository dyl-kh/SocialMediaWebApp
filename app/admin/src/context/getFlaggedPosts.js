import { gql } from '@apollo/client';
import { initializeApollo } from './apolloClient';

// ==================== GraphQL Queries ====================
const GET_INAPPROPRIATE_POSTS = gql`
    query GetInappropriatePosts {
        getInappropriatePosts {
            postId
            userId
            postBody
            imageUrl
            parentPostId
            deleted
            dateTime
            editDateTime
            isRoot
            likes
            dislikes
        }
    }
`;

// This is the function that will be called in the App component
// to get all the flagged posts from the database to be stored in the Context
const getFlaggedPosts = async () => {
    const client = initializeApollo();
    const res = await client.query({
        query: GET_INAPPROPRIATE_POSTS,
    });
    const flaggedPosts = res.data.getInappropriatePosts;

    return flaggedPosts;
};

export default getFlaggedPosts;
