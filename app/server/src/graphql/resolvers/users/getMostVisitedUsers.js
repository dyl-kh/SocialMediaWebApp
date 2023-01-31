const sequelize = require('sequelize');
const ProfileVisit = require('../../../database/models/ProfileVisit');
const UserAccount = require('../../../database/models/UserAccount');

const getMostVisitedUsers = async (parents, args) => {
    const { numberOfUsers } = args;

    // profileVisit is a table with every time a user visits
    // another user's profile (visitorId, visitedId, dateTime)
    // we want to get the most visited users, so we need to
    // count the number of times a user has been visited
    const mostVisitedUsers = await ProfileVisit.findAll({
        attributes: [
            'visitedId',
            [sequelize.fn('COUNT', sequelize.col('visitedId')), 'visitCount'],
        ],
        group: ['visitedId'],
        order: [[sequelize.fn('COUNT', sequelize.col('visitedId')), 'DESC']],
        limit: numberOfUsers,
    });

    const allUsers = await UserAccount.findAll();

    return mostVisitedUsers.map((user) => ({
        userId: user.visitedId,
        // get the fullName of the user from the allUsers array
        // using the userId in the DB
        // userId = "616504a5ea6a712e6f368598"
        fullName: allUsers.filter((u) => u.userId === user.visitedId)[0]
            .fullName,
        visitCount: user.dataValues.visitCount,
    }));
};

module.exports = getMostVisitedUsers;
