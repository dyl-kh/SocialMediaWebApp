const uuid = require('uuid');
const Post = require('../../database/models/Post');
const Reaction = require('../../database/models/Reaction');
const eventEmitter = require('../../utils/eventEmitter');

const getAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
};

const getNonDeletedPosts = async () => {
    // sorted by date
    const posts = await Post.findAll({
        // where: {
        // deleted: false,
        // },
        order: [['dateTime', 'DESC']],
    });
    // for posts that have deleted = true, set postBody to
    // '***This post has been deleted by an admin***'
    posts.forEach((post) => {
        if (post.deleted) {
            // eslint-disable-next-line no-param-reassign
            post.postBody = JSON.stringify([
                {
                    type: 'paragraph',
                    children: [
                        {
                            text: '*** This post has been deleted by an admin ***',
                            bold: true,
                        },
                    ],
                },
            ]);
            // eslint-disable-next-line no-param-reassign
            post.imageUrl = null;
        }
    });
    return posts;
};

const addPostToDatabase = async (post) => {
    const postId = uuid.v4();
    const dateTime = new Date();
    const deleted = false;
    const newPost = {
        postId,
        dateTime,
        deleted,
        isRoot: !post.parentPostId,
        ...post,
    };
    const createdPost = await Post.create(newPost);
    return createdPost;
};

// check if a post exists
const checkPostExist = async (postId) => {
    const post = await Post.findOne({
        where: { postId },
    });
    return post;
};

// update post
const updatePost = async (postId, post) => {
    const editedPost = {
        ...post,
        editDateTime: new Date(),
    };
    await Post.update(editedPost, {
        where: { postId },
    });
    return editedPost;
};

const destroyPost = async (post) => {
    const { postId } = post;
    await Post.destroy({
        where: { postId },
    });
    return post;
};

const addReactionToDatabase = async (reaction) => {
    const reactionId = uuid.v4();
    const dateTime = new Date();
    const newReaction = {
        reactionId,
        dateTime,
        ...reaction,
    };
    await Reaction.create(newReaction);

    if (reaction.reactionType === 'dislike') {
        // emit event to notify admin of potential harrassment
        eventEmitter.emit('POST_DISLIKE', newReaction);
    }

    return newReaction;
};

const getReactionsFromDatabase = async () => {
    const reactions = await Reaction.findAll();
    return reactions;
};

const checkReactionExist = async (reactionId) => {
    const reaction = await Reaction.findOne({
        where: { reactionId },
    });
    return reaction;
};

const deleteReactionFromDatabase = async (reaction) => {
    await Reaction.destroy({
        where: { reactionId: reaction.reactionId },
    });
    return reaction;
};

const editReactionFromDatabase = async (reaction) => {
    const { reactionId } = reaction;
    await Reaction.update(reaction, {
        where: { reactionId },
    });
    if (reaction.reactionType === 'dislike') {
        // emit event to notify admin of potential harrassment
        eventEmitter.emit('POST_DISLIKE', {
            ...reaction,
            dateTime: new Date(),
        });
    }
    return reaction;
};

// find reaction by user for a certain post
const findReactionByPostandUserId = async (postId, userId) => {
    const reaction = await Reaction.findOne({
        where: { postId, userId },
    });
    return reaction;
};

module.exports = {
    getAllPosts,
    addPostToDatabase,
    checkPostExist,
    updatePost,
    destroyPost,
    addReactionToDatabase,
    getNonDeletedPosts,
    getReactionsFromDatabase,
    checkReactionExist,
    deleteReactionFromDatabase,
    editReactionFromDatabase,
    findReactionByPostandUserId,
};
