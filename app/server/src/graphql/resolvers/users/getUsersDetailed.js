const Followings = require('../../../database/models/Followings');
const UserAccount = require('../../../database/models/UserAccount');
const Post = require('../../../database/models/Post');
const Reaction = require('../../../database/models/Reaction');

const getUsersDetailed = async () => {
    const users = await UserAccount.findAll();

    // get number of followers, following, posts, and reactions
    const usersDetailed = await Promise.all(
        users.map(async (user) => {
            const userDetailed = {
                userId: user.userId,
                fullName: user.fullName,
                email: user.email,
                dateJoined: user.dateJoined,
                isBlocked: user.isBlocked,
                numFollowers: await Followings.count({
                    where: {
                        followedId: user.userId,
                    },
                }),
                numFollowing: await Followings.count({
                    where: {
                        followerId: user.userId,
                    },
                }),
                numPosts: await Post.count({
                    where: {
                        userId: user.userId,
                    },
                }),
                numReactions: await Reaction.count({
                    where: {
                        userId: user.userId,
                    },
                }),
            };
            return userDetailed;
        }),
    );
    return usersDetailed;
};

module.exports = getUsersDetailed;
