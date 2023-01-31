const Sequelize = require('sequelize');
const db = require('../configs/database');

const ProfileVisit = db.define('ProfileVisit', {
    profileVisitId: {
        type: Sequelize.STRING(40),
        primaryKey: true,
    },
    visitorId: {
        type: Sequelize.STRING(40),
    },
    visitedId: {
        type: Sequelize.STRING(40),
    },
    dateTime: {
        type: Sequelize.DATE,
    },
});

// ProfileVisit.associate = (models) => {
//     ProfileVisit.belongsTo(models.UserAccount, {
//         foreignKey: 'visitorId',
//         as: 'visitor',
//         onDelete: 'CASCADE',
//     });
//     ProfileVisit.belongsTo(models.UserAccount, {
//         foreignKey: 'visitedId',
//         as: 'visited',
//         onDelete: 'CASCADE',
//     });
// };

module.exports = ProfileVisit;
