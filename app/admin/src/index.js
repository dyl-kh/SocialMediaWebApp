/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    split,
} from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider, reducer } from './context/adminContext';

// httpLink for queries and mutations
const httpLink = new HttpLink({
    uri: 'http://localhost:3050/graphql',
});

// Create a WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://localhost:3050/graphql',
    })
);

// split based on operation type
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink
);

// Create the apollo client
const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ContextProvider reducer={reducer}>
                <BrowserRouter>
                    <SnackbarProvider maxSnack={5}>
                        <App />
                    </SnackbarProvider>
                </BrowserRouter>
            </ContextProvider>
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
