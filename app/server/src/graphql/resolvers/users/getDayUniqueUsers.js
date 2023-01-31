const { Op } = require('sequelize');
const Login = require('../../../database/models/Login');

// get the number of unique users who logged in each day for a given date range (inclusive)
const getDayUniqueUsers = async (parent, args) => {
    const { startDate, endDate } = args;

    // convert the date strings to iso strings
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    const logins = await Login.findAll({
        where: {
            dateTime: {
                [Op.between]: [start, end],
            },
        },
    });

    const uniqueUsers = {};
    logins.forEach((login) => {
        const date = login.dateTime.toDateString();
        if (uniqueUsers[date]) {
            uniqueUsers[date].add(login.userId);
        } else {
            uniqueUsers[date] = new Set([login.userId]);
        }
    });
    const dayUniqueUsers = Object.keys(uniqueUsers).map((date) => ({
        date,
        uniqueUsers: uniqueUsers[date].size,
    }));
    console.log('dayUniqueUsers: ', dayUniqueUsers);
    return dayUniqueUsers;
};

module.exports = getDayUniqueUsers;
