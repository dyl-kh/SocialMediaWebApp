const bcrypt = require('bcrypt');
// const UserAccount = require('../../database/models/UserAccount');
const {
    followTargetUser,
    // deleteUsersPosts,
    getFollowerIds,
    getFollowingIds,
    findById,
    getPostCountByUser,
    recordUserProfileVisit,
    addPageView,
} = require('./user.service');

const getUser = async (req, res) => {
    if (req.query.userId && req.query.userId !== req.user.userId) {
        const user = await findById(req.query.userId);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        return res.status(200).send(user);
    }
    if (req.user) {
        return res.status(200).send(req.user);
    }
    // if (req.user && req.user.isDeleted) {
    //     return res.status(401).send({ message: 'User has been deleted' });
    // }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

// TODO: handle foreign key constriants, if user has a post, they cannot be deleted etc.
// Also applies to followings
const deleteUser = async (req, res) => {
    if (req.user) {
        await req.user.destroy();
        // await deleteUsersPosts(req.user);

        return res
            .status(200)
            .send({ message: 'User and their root posts deleted' });
    }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

const updateUser = async (req, res) => {
    if (req.user) {
        const { fullName, email, password, isBlocked } = req.body;

        if (typeof fullName === 'string') {
            req.user.fullName = fullName;
        }

        if (typeof email === 'string') {
            req.user.email = email;
        }

        if (typeof password === 'string') {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.user.hashedPassword = hashedPassword;
        }

        if (
            typeof isBlocked !== 'undefined' &&
            (isBlocked === 'true' || isBlocked === 'false')
        ) {
            req.user.isBlocked = isBlocked;
        }

        await req.user.save();
        return res
            .status(200)
            .send({ message: 'User information successfully updated' });
    }
    // if (req.user && req.user.isDeleted) {
    //     return res.status(401).send({ message: 'User has been deleted' });
    // }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

const followUser = async (req, res) => {
    if (req.user) {
        const { targetFollowUserId } = req.body;
        if (!targetFollowUserId) {
            return res
                .status(400)
                .send({ message: 'No target follow user id provided' });
        }

        const followResponse = await followTargetUser(
            req.user,
            targetFollowUserId,
        );

        return res.status(followResponse.status).send(followResponse);
    }
    // if (req.user && req.user.isDeleted) {
    //     return res.status(401).send({ message: 'User has been deleted' });
    // }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

const getFollowers = async (req, res) => {
    if (req.user) {
        if (req.query.userId) {
            const followerIds = await getFollowerIds({
                userId: req.query.userId,
            });
            return res.status(200).send(followerIds);
        }
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).send({
                message: 'Could not find user to find their followers',
            });
        }

        const followerIds = await getFollowerIds(req.user);

        return res.status(200).send(followerIds);
    }
    // if (req.user && req.user.isDeleted) {
    //     return res.status(401).send({ message: 'User has been deleted' });
    // }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

const getFollowing = async (req, res) => {
    if (req.user) {
        if (req.query.userId) {
            const followingIds = await getFollowingIds({
                userId: req.query.userId,
            });
            return res.status(200).send(followingIds);
        }
        const { userId } = req.user;
        if (!userId) {
            return res.status(400).send({
                message: 'Could not find user to find their following',
            });
        }

        const followingIds = await getFollowingIds(req.user);

        return res.status(200).send(followingIds);
    }
    // if (req.user && req.user.isDeleted) {
    //     return res.status(401).send({ message: 'User has been deleted' });
    // }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

const getPostCount = async (req, res) => {
    if (req.query.userId) {
        const postCount = await getPostCountByUser(req.query.userId);

        return res.status(200).send({ postCount });
    }

    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

const visitUser = async (req, res) => {
    if (req.user) {
        const { targetUserId } = req.body;
        if (!targetUserId) {
            return res
                .status(400)
                .send({ message: 'No target user id provided' });
        }

        const targetUser = await findById(targetUserId);
        if (!targetUser) {
            return res.status(404).send({ message: 'User not found' });
        }

        try {
            await recordUserProfileVisit(req.user, targetUserId);
        } catch (err) {
            return res.status(500).send({ message: 'Could not record visit' });
        }

        return res.status(200).send({ message: 'User visit recorded' });
    }
    return res
        .status(401)
        .send({ message: 'No token was provided, user not logged in' });
};

// simply add a new PageView record to the database using now as dateTime
const pageView = async (req, res) => {
    const { pathName } = req.body;
    const response = await addPageView(pathName);
    return res.status(response.status).send(response);
};

module.exports = {
    getUser,
    deleteUser,
    updateUser,
    followUser,
    getFollowers,
    getFollowing,
    getPostCount,
    visitUser,
    pageView,
};
