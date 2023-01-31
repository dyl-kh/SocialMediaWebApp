const UserAccount = require('../../../database/models/UserAccount');
const getDayUniqueUsers = require('./getDayUniqueUsers');
const getMostVisitedUsers = require('./getMostVisitedUsers');
const getNewDailyFollowers = require('./getNewDailyFollowers');
const getSummaryStats = require('./getSummaryStats');
const getUsersDetailed = require('./getUsersDetailed');

module.exports = {
    Query: {
        getUsers: getUsersDetailed,
        getDayUniqueUsers,
        getMostVisitedUsers,
        getNewDailyFollowers,
        getSummaryStats,
    },
    Mutation: {
        toggleBlockUser: async (_, { userId }) => {
            const user = await UserAccount.findByPk(userId);
            user.isBlocked = !user.isBlocked;
            await user.save();
            return user;
        },
    },
};
