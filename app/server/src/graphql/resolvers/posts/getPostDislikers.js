const UserAccount = require('../../../database/models/UserAccount');
const Post = require('../../../database/models/Post');
const Reaction = require('../../../database/models/Reaction');

// get post dislikers
const getPostDislikers = async (_, { postId }) => {
    const post = await Post.findByPk(postId);
    const reactions = await Reaction.findAll();
    const postReactions = reactions.filter(
        (reaction) => reaction.postId === post.postId,
    );
    const dislikeReactions = postReactions.filter(
        (reaction) => reaction.reactionType === 'dislike',
    );
    const dislikers = await Promise.all(
        dislikeReactions.map(async (reaction) => {
            const user = await UserAccount.findByPk(reaction.userId);
            return {
                userId: user.userId,
                fullName: user.fullName,
                isBlocked: user.isBlocked,
                dateTimeDisliked: reaction.dateTime,
            };
        }),
    );
    return dislikers;
};

module.exports = getPostDislikers;
