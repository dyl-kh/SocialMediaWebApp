const uuid = require('uuid');
const { Op } = require('sequelize');
const UserAccount = require('../../database/models/UserAccount');
const Followings = require('../../database/models/Followings');
const Post = require('../../database/models/Post');
const ProfileVisit = require('../../database/models/ProfileVisit');
const PageView = require('../../database/models/PageView');

const followTargetUser = async (authorisedUser, targetFollowUserId) => {
    const targetFollowUser = await UserAccount.findOne({
        where: {
            userId: targetFollowUserId,
        },
    });

    if (!targetFollowUser) {
        return { status: 404, errorMessage: 'Target follow user not found' };
    }

    if (targetFollowUser.userId === authorisedUser.userId) {
        return { status: 400, errorMessage: 'Cannot follow yourself' };
    }

    const following = await Followings.findOne({
        where: {
            followerId: authorisedUser.userId,
            followedId: targetFollowUser.userId,
        },
    });

    if (following) {
        await following.destroy();
        return { status: 200, message: 'User unfollowed successfully' };
    }

    await Followings.create({
        followingId: uuid.v4(),
        followerId: authorisedUser.userId,
        followedId: targetFollowUser.userId,
    });

    return { status: 200, message: 'User followed successfully' };
};

const deleteUsersPosts = async (user) => {
    const posts = await Post.findAll({
        where: {
            userId: user.userId,
            isRoot: true,
        },
    });

    if (posts) {
        posts.forEach(async (post) => {
            await post.destroy();
        });
    }
};

const getFollowerIds = async (user) => {
    const relevantFollowings = await Followings.findAll({
        where: {
            followedId: user.userId,
        },
    });

    const followerIds = relevantFollowings.map(
        (following) => following.followerId,
    );

    return followerIds;
};

const getFollowingIds = async (user) => {
    const relevantFollowings = await Followings.findAll({
        where: {
            followerId: user.userId,
        },
    });

    const followingIds = relevantFollowings.map(
        (following) => following.followedId,
    );

    return followingIds;
};

const findById = async (userId) => {
    const user = await UserAccount.findOne({
        where: {
            userId,
        },
    });
    if (!user) {
        return null;
    }
    return {
        fullName: user.fullName,
    };
};

const getPostCountByUser = async (id) => {
    const posts = await Post.findAll({
        where: {
            userId: id,
            isRoot: true,
            deleted: false,
        },
    });

    return posts.length;
};

const recordUserProfileVisit = async (authorisedUser, targetUserId) => {
    if (targetUserId === authorisedUser.userId) {
        return { status: 200, message: 'Visited own profile, nothing record' };
    }

    const currentDateTime = new Date();

    // check if there is a record for the past second for this user
    // to remove duplicates
    try {
        const existingVisit = await ProfileVisit.findOne({
            where: {
                visitorId: authorisedUser.userId,
                visitedId: targetUserId,
                dateTime: {
                    [Op.gt]: new Date(currentDateTime.getTime() - 1000),
                },
            },
        });
        if (existingVisit) {
            // console.log('existingVisit: ', existingVisit);
            return {
                status: 200,
                message: 'Visited profile in the past minute',
            };
        }
    } catch (error) {
        console.log('Error: ', error);
    }

    try {
        await ProfileVisit.create({
            profileVisitId: uuid.v4(),
            visitorId: authorisedUser.userId,
            visitedId: targetUserId,
            dateTime: currentDateTime,
        });
        // console.error('============= Profile visit recorded: ', profileVisit);
    } catch (error) {
        console.log('Error when recording profile visit: ', error);
    }

    return { status: 200, message: 'Profile visit recorded successfully' };
};

const addPageView = async (pathName) => {
    const currentDateTime = new Date();
    try {
        await PageView.create({
            pageViewId: uuid.v4(),
            pathName,
            dateTime: currentDateTime,
        });
    } catch (error) {
        console.log('Error when recording page view: ', error);
        return { status: 500, errorMessage: 'Error when recording page view' };
    }

    return { status: 200, message: 'Page view recorded successfully' };
};

module.exports = {
    followTargetUser,
    deleteUsersPosts,
    getFollowerIds,
    getFollowingIds,
    findById,
    getPostCountByUser,
    recordUserProfileVisit,
    addPageView,
};
