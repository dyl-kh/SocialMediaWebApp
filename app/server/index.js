/* eslint-disable no-console */
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { makeExecutableSchema } = require('@graphql-tools/schema');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const typeDefs = require('./src/graphql/typeDefs');
const resolvers = require('./src/graphql/resolvers');
const db = require('./src/database/configs/database');
const authRouter = require('./src/features/auth');
const usersRouter = require('./src/features/users');
const userRouter = require('./src/features/user');
const postRouter = require('./src/features/post');

const port = process.env.PORT || 5000;

db.authenticate()
    .then(() => {
        // db.sync();
        console.log('MySQL database connected...');
    })
    .catch((err) => console.log(err));

const startServers = async () => {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    const httpServer = http.createServer(app);
    const schema = makeExecutableSchema({ typeDefs, resolvers });

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    await server.start();
    server.applyMiddleware({ app });

    app.use('/api/auth', authRouter);
    app.use('/api/users', usersRouter);
    app.use('/api/user', userRouter);
    app.use('/api/post', postRouter);

    // error handler middleware
    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res.status(500).send({ message: err.message });
        console.log('Error: ', err.message);
    });

    httpServer.listen(port, () => {
        console.log(
            `🚀 Query endpoint ready at http://localhost:${port}${server.graphqlPath}`,
        );
        console.log(
            `🚀 Subscription endpoint ready at ws://localhost:${port}${server.graphqlPath}`,
        );
    });
};

startServers();

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
