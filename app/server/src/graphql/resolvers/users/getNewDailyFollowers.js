const { Op } = require('sequelize');
const Followings = require('../../../database/models/Followings');

const getNewDailyFollowers = async (parent, args) => {
    const { userId, startDate, endDate } = args;

    // convert the date strings to iso strings
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    const followings = await Followings.findAll({
        where: {
            followedId: userId,
            dateTime: {
                [Op.between]: [start, end],
            },
        },
    });

    const uniqueUsers = {};
    followings.forEach((following) => {
        const date = following.dateTime.toDateString();
        if (uniqueUsers[date]) {
            uniqueUsers[date].add(following.followerId);
        } else {
            uniqueUsers[date] = new Set([following.followerId]);
        }
    });
    const dayUniqueFollowers = Object.keys(uniqueUsers).map((date) => ({
        date,
        newFollowers: uniqueUsers[date].size,
    }));

    // add in dates between start and end that don't have any followers
    const startMs = new Date(start).getTime();
    const endMs = new Date(end).getTime();
    for (let i = startMs; i <= endMs; i += 86400000) {
        const date = new Date(i).toDateString();
        if (!uniqueUsers[date]) {
            dayUniqueFollowers.push({ date, newFollowers: 0 });
        }
    }
    dayUniqueFollowers.sort((a, b) => new Date(a.date) - new Date(b.date));
    return dayUniqueFollowers;
};

module.exports = getNewDailyFollowers;
