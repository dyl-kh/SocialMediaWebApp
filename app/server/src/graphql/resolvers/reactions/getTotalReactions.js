const sequelize = require('sequelize');
const Reaction = require('../../../database/models/Reaction');

const getTotalReactions = async () => {
    // get the count of each type of reaction
    const reactions = await Reaction.findAll({
        attributes: [
            'reactionType',
            [sequelize.fn('COUNT', sequelize.col('reactionType')), 'count'],
        ],
        group: ['reactionType'],
    });

    const totalPostReacts = {};
    reactions.forEach((reaction) => {
        totalPostReacts[reaction.reactionType] = reaction.dataValues.count;
    });

    return totalPostReacts;
};

module.exports = getTotalReactions;
