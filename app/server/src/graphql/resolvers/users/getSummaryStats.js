const UserAccount = require('../../../database/models/UserAccount');
const PageView = require('../../../database/models/PageView');
const Reaction = require('../../../database/models/Reaction');
const Post = require('../../../database/models/Post');

const getSummaryStats = async () => {
    const allUsers = await UserAccount.findAll();
    const allPageViews = await PageView.findAll();
    const allReactions = await Reaction.findAll();
    const allPosts = await Post.findAll();

    const totalUsers = allUsers.length;
    const totalPageViews = allPageViews.length;
    const totalEngagement = allReactions.length + allPosts.length;

    // get total users with dateJoined as today
    const totalUsersToday = allUsers.filter((user) => {
        const today = new Date();
        const dateJoined = new Date(user.dateJoined);
        return (
            today.getDate() === dateJoined.getDate() &&
            today.getMonth() === dateJoined.getMonth() &&
            today.getFullYear() === dateJoined.getFullYear()
        );
    }).length;

    // get total users with dateJoined as yesterday
    const totalUsersYesterday = allUsers.filter((user) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateJoined = new Date(user.dateJoined);
        return (
            yesterday.getDate() === dateJoined.getDate() &&
            yesterday.getMonth() === dateJoined.getMonth() &&
            yesterday.getFullYear() === dateJoined.getFullYear()
        );
    }).length;

    // get percentage change in total users from yesterday to today
    let totalUsersPercentageChange;
    if (totalUsersYesterday === 0) {
        totalUsersPercentageChange = 0;
    } else {
        totalUsersPercentageChange =
            ((totalUsersToday - totalUsersYesterday) / totalUsersYesterday) *
            100;
    }

    // get total page views with dateTime as today
    const totalPageViewsToday = allPageViews.filter((pageView) => {
        const today = new Date();
        const dateTime = new Date(pageView.dateTime);
        return (
            today.getDate() === dateTime.getDate() &&
            today.getMonth() === dateTime.getMonth() &&
            today.getFullYear() === dateTime.getFullYear()
        );
    }).length;

    // get total page views with dateTime as yesterday
    const totalPageViewsYesterday = allPageViews.filter((pageView) => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const dateTime = new Date(pageView.dateTime);
        return (
            yesterday.getDate() === dateTime.getDate() &&
            yesterday.getMonth() === dateTime.getMonth() &&
            yesterday.getFullYear() === dateTime.getFullYear()
        );
    }).length;

    // get percentage change in total page views from yesterday to today
    let totalPageViewsPercentageChange;
    if (totalPageViewsYesterday === 0) {
        totalPageViewsPercentageChange = 0;
    } else {
        totalPageViewsPercentageChange =
            ((totalPageViewsToday - totalPageViewsYesterday) /
                totalPageViewsYesterday) *
            100;
    }

    // get total engagement with dateTime as today
    const totalEngagementToday =
        allReactions.filter((reaction) => {
            const today = new Date();
            const dateTime = new Date(reaction.dateTime);
            return (
                today.getDate() === dateTime.getDate() &&
                today.getMonth() === dateTime.getMonth() &&
                today.getFullYear() === dateTime.getFullYear()
            );
        }).length +
        allPosts.filter((post) => {
            const today = new Date();
            const dateTime = new Date(post.dateTime);
            return (
                today.getDate() === dateTime.getDate() &&
                today.getMonth() === dateTime.getMonth() &&
                today.getFullYear() === dateTime.getFullYear()
            );
        }).length;

    // get total engagement with dateTime as yesterday
    const totalEngagementYesterday =
        allReactions.filter((reaction) => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const dateTime = new Date(reaction.dateTime);
            return (
                yesterday.getDate() === dateTime.getDate() &&
                yesterday.getMonth() === dateTime.getMonth() &&
                yesterday.getFullYear() === dateTime.getFullYear()
            );
        }).length +
        allPosts.filter((post) => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const dateTime = new Date(post.dateTime);
            return (
                yesterday.getDate() === dateTime.getDate() &&
                yesterday.getMonth() === dateTime.getMonth() &&
                yesterday.getFullYear() === dateTime.getFullYear()
            );
        }).length;

    // get percentage change in total engagement from yesterday to today
    let totalEngagementPercentageChange;
    if (totalEngagementYesterday === 0) {
        totalEngagementPercentageChange = 0;
    } else {
        totalEngagementPercentageChange =
            ((totalEngagementToday - totalEngagementYesterday) /
                totalEngagementYesterday) *
            100;
    }

    const response = {
        totalUsers,
        totalPageViews,
        totalEngagement,
        totalUsersPercentageChange,
        totalPageViewsPercentageChange,
        totalEngagementPercentageChange,
    };

    console.log(response);

    return response;
};

module.exports = getSummaryStats;
