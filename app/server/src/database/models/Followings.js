const Sequelize = require('sequelize');
const db = require('../configs/database');

const Followings = db.define('Followings', {
    followingId: {
        type: Sequelize.STRING(40),
        primaryKey: true,
    },
    followerId: {
        type: Sequelize.STRING(40),
    },
    followedId: {
        type: Sequelize.STRING(40),
    },
    dateTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

// Followings.associate = (models) => {
//     Followings.belongsTo(models.UserAccount, {
//         foreignKey: 'followerId',
//         as: 'follower',
//         onDelete: 'CASCADE',
//     });
//     Followings.belongsTo(models.UserAccount, {
//         foreignKey: 'followedId',
//         as: 'followed',
//         onDelete: 'CASCADE',
//     });
// };

module.exports = Followings;
