const Sequelize = require('sequelize');
const db = require('../configs/database');

const Reaction = db.define('Reactions', {
    reactionId: {
        type: Sequelize.STRING(40),
        primaryKey: true,
    },
    postId: {
        type: Sequelize.STRING(40),
    },
    userId: {
        type: Sequelize.STRING(40),
    },
    reactionType: {
        type: Sequelize.STRING,
    },
    dateTime: {
        type: Sequelize.DATE,
    },
});

// Reaction.associate = (models) => {
//     Reaction.belongsTo(models.Post, {
//         foreignKey: 'postId',
//         as: 'post',
//         onDelete: 'CASCADE',
//     });
//     Reaction.belongsTo(models.UserAccount, {
//         foreignKey: 'userId',
//         as: 'user',
//         onDelete: 'CASCADE',
//     });
// };

module.exports = Reaction;
