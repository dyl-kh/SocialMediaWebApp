/* eslint-disable no-param-reassign */
const { Op } = require('sequelize');
const Post = require('../../../database/models/Post');
const Reaction = require('../../../database/models/Reaction');

const getHarrassedPosts = async () => {
    const allPosts = await Post.findAll();
    // get all reactions in the past 24 hours
    const allReactions = await Reaction.findAll({
        where: {
            dateTime: {
                [Op.gte]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
        },
    });

    // get all posts with more than 3 dislikes in the past 24 hours
    const harrassedPosts = allPosts.filter((post) => {
        const postDislikes = allReactions.filter(
            (reaction) =>
                reaction.postId === post.postId &&
                reaction.reactionType === 'dislike',
        );
        return postDislikes.length >= 3;
    });

    // add number of likes and dislikes to each harrassedPost
    harrassedPosts.forEach((post) => {
        const postLikes = allReactions.filter(
            (reaction) =>
                reaction.postId === post.postId &&
                reaction.reactionType === 'like',
        );
        const postDislikes = allReactions.filter(
            (reaction) =>
                reaction.postId === post.postId &&
                reaction.reactionType === 'dislike',
        );

        post.likes = postLikes.length;
        post.dislikes = postDislikes.length;
    });
    return harrassedPosts;
};

module.exports = getHarrassedPosts;
