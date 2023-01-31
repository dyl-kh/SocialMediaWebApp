const { Op } = require('sequelize');
const Reaction = require('../../../database/models/Reaction');

const getDailyPostReacts = async (parent, args) => {
    const { startDate, endDate } = args;

    // convert the date strings to iso strings
    const start = new Date(startDate).toISOString();
    const end = new Date(endDate).toISOString();

    const reactions = await Reaction.findAll({
        where: {
            dateTime: {
                [Op.between]: [start, end],
            },
        },
    });

    const dailyPostReactCount = {};
    reactions.forEach((reaction) => {
        const date = reaction.dateTime.toDateString();
        if (dailyPostReactCount[date]) {
            if (dailyPostReactCount[date][reaction.reactionType]) {
                dailyPostReactCount[date][reaction.reactionType] += 1;
            } else {
                dailyPostReactCount[date][reaction.reactionType] = 1;
            }
        } else {
            dailyPostReactCount[date] = {};
            dailyPostReactCount[date][reaction.reactionType] = 1;
        }
    });

    // convert the dailyPostReactCount object into an array of objects
    const dailyPostReactCountArray = Object.keys(dailyPostReactCount).map(
        (date) => ({
            date,
            reactions: dailyPostReactCount[date],
        }),
    );

    // sort the inner objects of dailyPostReactCountArray by date
    dailyPostReactCountArray.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
    });

    // console.log('dailyPostReactCountArray: ', dailyPostReactCountArray);

    return dailyPostReactCountArray;
};

module.exports = getDailyPostReacts;
