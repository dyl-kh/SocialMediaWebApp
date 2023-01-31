const Sequelize = require('sequelize');
const db = require('../configs/database');

const UserAccount = db.define('UserAccounts', {
    userId: {
        type: Sequelize.STRING(40),
        primaryKey: true,
    },
    fullName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    hashedPassword: {
        type: Sequelize.STRING,
    },
    dateJoined: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    isBlocked: {
        type: Sequelize.BOOLEAN,
    },
    // isDeleted: {
    //     type: Sequelize.BOOLEAN,
    //     defaultValue: false,
    // },
});

// UserAccount.associate = (models) => {
//     UserAccount.hasMany(models.Post, {
//         foreignKey: 'userId',
//         as: 'posts',
//     });
//     UserAccount.hasMany(models.Reaction, {
//         foreignKey: 'userId',
//         as: 'reactions',
//     });
//     UserAccount.hasMany(models.Login, {
//         foreignKey: 'userId',
//         as: 'logins',
//     });
//     UserAccount.hasMany(models.Followings, {
//         foreignKey: 'followerId',
//         as: 'followings',
//     });
//     UserAccount.hasMany(models.Followings, {
//         foreignKey: 'followedId',
//         as: 'followers',
//     });
//     UserAccount.hasMany(models.ProfileVisit, {
//         foreignKey: 'visitorId',
//         as: 'profileVisits',
//     });
//     UserAccount.hasMany(models.ProfileVisit, {
//         foreignKey: 'visitedId',
//         as: 'profileVisitors',
//     });
// };

module.exports = UserAccount;
