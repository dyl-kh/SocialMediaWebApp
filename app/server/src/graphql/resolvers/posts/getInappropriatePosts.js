/* eslint-disable no-param-reassign */
const fs = require('fs');
const path = require('path');
const Post = require('../../../database/models/Post');
const Reaction = require('../../../database/models/Reaction');

const getInappropriateWords = async () => {
    const words = await fs.readFileSync(
        path.join(__dirname, 'inappropriateWords.txt'),
        'utf8',
    );
    return words.split('\n');
};

const getInappropriatePosts = async () => {
    const posts = await Post.findAll();
    const inappropriateWords = await getInappropriateWords();

    const inappropriatePosts = posts.filter((post) => {
        const postBody = post.postBody.toLowerCase();
        const isPostInappropriate = inappropriateWords.some((word) =>
            postBody.includes(word),
        );
        return isPostInappropriate;
    });

    // for each inappropriate post, print the inappropriate word
    inappropriatePosts.forEach((post) => {
        const postBody = post.postBody.toLowerCase();
        const inappropriateWord = inappropriateWords.find((word) =>
            postBody.includes(word),
        );
        console.log(`Inappropriate word detected: ${inappropriateWord}`);
    });

    const reactions = await Reaction.findAll();

    // for each inappropriate post, get the number of likes and dislikes
    inappropriatePosts.forEach((post) => {
        const postReactions = reactions.filter(
            (reaction) => reaction.postId === post.postId,
        );
        const likeCount = postReactions.filter(
            (reaction) => reaction.reactionType === 'like',
        ).length;
        const dislikeCount = postReactions.filter(
            (reaction) => reaction.reactionType === 'dislike',
        ).length;
        post.likes = likeCount;
        post.dislikes = dislikeCount;
    });

    return inappropriatePosts;
};

module.exports = getInappropriatePosts;
