const getDailyPostReacts = require('./getDailyPostReacts');
const getTotalReactions = require('./getTotalReactions');
const getTopReactedPosts = require('./getTopReactedPosts');

module.exports = {
    Query: {
        getDailyPostReacts,
        getTotalReactions,
        getTopReactedPosts,
    },
};
