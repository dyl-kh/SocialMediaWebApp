/* eslint-disable no-underscore-dangle */
import { ApolloClient, InMemoryCache } from '@apollo/client';

// This function is called by functions outside of the react components
// to load in the data from the database using gql queries
let apolloClient;

// no cache to get the latest data for the admin dashboard
const defaultOptions = {
    watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
    },
    query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
    },
};

function createApolloClient() {
    return new ApolloClient({
        uri: 'http://localhost:3050/graphql',
        cache: new InMemoryCache(),
        defaultOptions,
    });
}

export function initializeApollo() {
    const apolloClient_ = apolloClient ?? createApolloClient();
    if (!apolloClient) apolloClient = apolloClient_;

    return apolloClient_;
}

export function useApollo() {
    const store = initializeApollo();
    return store;
}
