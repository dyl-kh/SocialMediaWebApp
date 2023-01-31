/* eslint-disable no-param-reassign */
const sequelize = require('sequelize');
const Reaction = require('../../../database/models/Reaction');
const UserAccount = require('../../../database/models/UserAccount');
const Post = require('../../../database/models/Post');

const getTopReactedPosts = async (parent, args) => {
    const { reactionType, numberOfPosts } = args;

    // get the posts that have the most reactions of the given type
    const reactions = await Reaction.findAll({
        where: {
            reactionType,
        },
        attributes: [
            'postId',
            [sequelize.fn('COUNT', sequelize.col('postId')), 'count'],
        ],
        group: ['postId'],
        order: [[sequelize.fn('COUNT', sequelize.col('postId')), 'DESC']],
        limit: numberOfPosts,
    });


    // console.log('reactions: ', reactions);

    const allUsers = await UserAccount.findAll();
    const allPosts = await Post.findAll();

    const topReactedPosts = reactions.map((reaction) => ({
        postId: reaction.postId,
        reactionCount: reaction.dataValues.count,
    }));


    // Add userId, postBody, deleted, dateTime to responses for each response
    topReactedPosts.forEach((post) => {
        const postObj = allPosts.find((p) => p.postId === post.postId);
        post.userId = postObj.userId;
        post.postBody = postObj.postBody;
        post.deleted = postObj.deleted;
        post.dateTime = postObj.dateTime;
    });

    // Add fullName to responses for each response
    topReactedPosts.forEach((post) => {
        const user = allUsers.find((u) => u.userId === post.userId);
        console.log('userId', user.userId);
        post.fullName = user.fullName;
    });

    // console.log('topReactedPosts: ', topReactedPosts);

    return topReactedPosts;
};

module.exports = getTopReactedPosts;
