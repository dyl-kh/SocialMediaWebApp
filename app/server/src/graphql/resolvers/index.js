const usersResolvers = require('./users');
const postsResolvers = require('./posts');
const reactionsResolvers = require('./reactions');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...postsResolvers.Query,
        ...reactionsResolvers.Query,
    },
    Mutation: {
        ...postsResolvers.Mutation,
        ...usersResolvers.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription,
    },
};
