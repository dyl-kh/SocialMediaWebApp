/* eslint-disable camelcase */
const {
    // getAllPosts,
    addPostToDatabase,
    checkPostExist,
    updatePost,
    destroyPost,
    addReactionToDatabase,
    getNonDeletedPosts,
    getReactionsFromDatabase,
    deleteReactionFromDatabase,
    editReactionFromDatabase,
    findReactionByPostandUserId,
} = require('./post.service');

// get all posts
async function getAll(req, res) {
    if (req.user) {
        // get posts from db
        const posts = await getNonDeletedPosts();

        return res.status(200).send(posts);
    }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
}

// add post
async function addPost(req, res) {
    if (req.user) {
        if (!req.body || !req.body.postBody) {
            return res
                .status(400)
                .send({ message: 'Post body is required in request body' });
        }

        const { postBody, imageUrl, parentPostId } = req.body;

        const parsedTextValue = JSON.parse(postBody);
        const totalCharacters = parsedTextValue.reduce((prevVal, val) => {
            let prevChars = prevVal;
            prevChars += val.children.reduce((prevVal2, val2) => {
                let prevChars2 = prevVal2;
                prevChars2 += val2.text.length;
                return prevChars2;
            }, 0);
            return prevChars;
        }, 0);

        if (totalCharacters > 600) {
            return res.status(400).send({
                message: 'Post body cannot be longer than 600 characters',
            });
        }

        const post = {
            userId: req.user.userId,
            postBody,
            imageUrl,
            parentPostId,
        };
        const createdPost = await addPostToDatabase(post);
        return res.status(201).send(createdPost);
    }

    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
}

// edit post
async function edit(req, res) {
    if (req.user) {
        if (!req.body) {
            return res
                .status(400)
                .send({ message: 'Request body is required' });
        }
        const { postId, postBody, imageUrl } = req.body;
        if (!postId) {
            return res
                .status(400)
                .send({ message: 'Post id is required in request body' });
        }
        if (!postBody && !imageUrl) {
            return res.status(400).send({
                message: 'Post body or image url is required in request body',
            });
        }
        if (postBody) {
            if (postBody.length > 250) {
                return res.status(400).send({
                    message: 'Post body cannot be more than 250 characters',
                });
            }
        }
        // check if post exists
        const post = await checkPostExist(postId);
        if (!post) {
            return res.status(404).send({
                message: 'Post not found',
            });
        }

        // check if user is the author of the post
        if (post.userId !== req.user.userId) {
            return res.status(403).send({
                message: 'User is not the author of the post',
            });
        }
        let updatedPost;
        if (!postBody && imageUrl) {
            updatedPost = await updatePost(postId, { imageUrl });
        } else if (!imageUrl && postBody) {
            updatedPost = await updatePost(postId, { postBody });
        } else {
            updatedPost = await updatePost(postId, {
                postBody,
                imageUrl,
            });
        }

        // update post

        return res.status(200).send(updatedPost);
    }

    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
}

// delete reaction
async function deletePost(req, res) {
    if (req.user) {
        if (!req.body.postId || !req.body) {
            return res.status(400).send({
                message: 'Post id is required in request body',
            });
        }
        const post = await checkPostExist(req.body.postId);

        if (!post) {
            return res.status(404).send({
                message: 'Post not found',
            });
        }
        if (req.user.userId !== post.userId) {
            return res.status(403).send({
                message: 'User is not the author of the post',
            });
        }

        // delete post
        return res.status(200).send(await destroyPost(post));
    }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
}

// add reaction
async function addReaction(req, res) {
    if (req.user) {
        if (!req.body || !req.body.postId || !req.body.reactionType) {
            return res.status(400).send({
                message:
                    'Post ID and reaction type are required in request body',
            });
        }
        const post = await checkPostExist(req.body.postId);
        if (!post) {
            return res.status(404).send({
                message: 'Post not found',
            });
        }
        const reactionTypes = ['like', 'dislike'];
        if (!reactionTypes.includes(req.body.reactionType)) {
            return res.status(400).send({
                message: 'Invalid reaction type',
            });
        }
        const reaction = {
            userId: req.user.userId,
            postId: req.body.postId,
            reactionType: req.body.reactionType,
        };
        return res.status(200).send(await addReactionToDatabase(reaction));
    }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
}

// get reactions
const getReactions = async (req, res) => {
    if (req.user) {
        const reactions = await getReactionsFromDatabase();
        return res.status(200).send(reactions);
    }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

// delete reaction
const deleteReaction = async (req, res) => {
    if (req.user) {
        if (!req.body.postId) {
            return res
                .status(400)
                .send({ message: 'Reaction id is required in request body' });
        }
        const reaction = await findReactionByPostandUserId(
            req.body.postId,
            req.user.userId,
        );

        if (!reaction) {
            return res.status(404).send({ message: 'Reaction not found' });
        }
        if (reaction.userId !== req.user.userId) {
            return res
                .status(403)
                .send({ message: 'User is not the author of the reaction' });
        }
        return res.status(200).send(await deleteReactionFromDatabase(reaction));
    }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

// edit reaction
const editReaction = async (req, res) => {
    if (req.user) {
        if (!req.body.postId || !req.body.reactionType) {
            return res.status(400).send({
                message: 'Post id and reaction type are required',
            });
        }
        const reaction = await findReactionByPostandUserId(
            req.body.postId,
            req.user.userId,
        );

        if (!reaction) {
            return res.status(404).send({ message: 'Reaction not found' });
        }
        if (reaction.userId !== req.user.userId) {
            return res
                .status(403)
                .send({ message: 'User is not the author of the reaction' });
        }
        const reactionTypes = ['like', 'dislike'];
        if (!reactionTypes.includes(req.body.reactionType)) {
            return res.status(400).send({
                message: 'Invalid reaction type',
            });
        }
        const newReaction = {
            userId: req.user.userId,
            postId: req.body.postId,
            reactionType: req.body.reactionType,
            reactionId: reaction.reactionId,
            dateTime: reaction.dateTime,
        };

        return res
            .status(200)
            .send(await editReactionFromDatabase(newReaction));
    }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

module.exports = {
    getAll,
    addPost,
    edit,
    deletePost,
    addReaction,
    getReactions,
    deleteReaction,
    editReaction,
};
