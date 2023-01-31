import { gql } from '@apollo/client';
import { initializeApollo } from './apolloClient';

// ==================== GraphQL Query ====================
const GET_HARRASSED_POSTS = gql`
    query GetHarrassedPosts {
        getHarrassedPosts {
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
const getHarrassedPosts = async () => {
    const client = initializeApollo();
    const res = await client.query({
        query: GET_HARRASSED_POSTS,
    });
    const harrassedPosts = res.data.getHarrassedPosts;

    return harrassedPosts;
};

export default getHarrassedPosts;
