const Post = require('../../../database/models/Post');
const getInappropriatePosts = require('./getInappropriatePosts');
const getHarrassedPosts = require('./getHarrassedPosts');
const getPostDislikers = require('./getPostDislikers');

const pubsub = require('../../pubsub');

module.exports = {
    Query: {
        getPosts: async () => {
            const posts = await Post.findAll();
            return posts;
        },
        getInappropriatePosts,
        getHarrassedPosts,
        getPostDislikers,
    },
    Mutation: {
        toggleDeletePost: async (_, { postId }) => {
            const post = await Post.findByPk(postId);
            post.deleted = !post.deleted;
            await post.save();
            return post;
        },
    },
    Subscription: {
        possibleHarassment: {
            subscribe: () => pubsub.asyncIterator(['POSSIBLE_HARRASSMENT']),
        },
    },
};
