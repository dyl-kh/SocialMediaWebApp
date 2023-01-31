const { PubSub } = require('graphql-subscriptions');
const { Op } = require('sequelize');
const eventEmitter = require('../utils/eventEmitter');
const Reaction = require('../database/models/Reaction');

const pubsub = new PubSub();

eventEmitter.on('POST_DISLIKE', async (newReaction) => {
    const { postId } = newReaction;

    // check if there have been more than 3 dislikes in the past 24 hours
    const recentDislikes = await Reaction.findAll({
        where: {
            postId,
            reactionType: 'dislike',
            dateTime: {
                [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
        },
    });

    const dislikeCount = {
        postId,
        recentDislikeCount: recentDislikes.length,
    };

    // if there have been more than 3 dislikes in the past 24 hours, notify admin
    if (recentDislikes.length >= 3) {
        console.log(
            'Post has been disliked too many times in the past 24 hours',
        );
        pubsub.publish('POSSIBLE_HARRASSMENT', {
            possibleHarassment: dislikeCount,
        });
    }
});

module.exports = pubsub;
