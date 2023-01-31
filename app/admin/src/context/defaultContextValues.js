// ============================== all default state values ==============================
const summaryStats = {
    totalUsers: 0,
    totalUsersPercentageChange: 0,
    totalPageViews: 0,
    totalPageViewsPercentageChange: 0,
    totalEngagement: 0,
    totalEngagementPercentageChange: 0,
};

const dayUniqueUsers = [
    {
        date: 'Fri Oct 14 2022',
        uniqueUsers: 2,
    },
];

const mostVisitedUsers = [
    {
        userId: '6a73b72c-572d-46d1-b333-50e45a036189',
        visitCount: 14,
        fullName: 'asdf',
    },
];

const dailyPostReacts = [
    {
        date: 'Mon Oct 17 2022',
        reactions: {
            like: 3,
            dislike: 2,
        },
    },
];

const totalReactions = {
    like: 9,
    dislike: 7,
};

const mostLikedPosts = [
    {
        postId: '8f960b87-060b-48e7-a901-5ca76d37d067',
        reactionCount: 1,
        userId: 'faf55049-ae3a-4245-88f8-55836e3007da',
        postBody:
            '[{"type":"paragraph","children":[{"text":"wqefwefwefwef"}]}]',
        deleted: false,
        dateTime: '1666263099000',
        fullName: 'Dylan Khan',
    },
];

const mostDislikedPosts = [
    {
        postId: '8f960b87-060b-48e7-a901-5ca76d37d067',
        reactionCount: 10,
        userId: 'faf55049-ae3a-4245-88f8-55836e3007da',
        postBody:
            '[{"type":"paragraph","children":[{"text":"wqefwefwefwef"}]}]',
        deleted: false,
        dateTime: '1666263099000',
        fullName: 'Thomas Yao',
    },
];

const users = [
    {
        userId: '23aec59b-8095-4d89-be39-7b2f9cc596f3',
        fullName: 'Thomas Yao',
        email: 'asdfff@gmail.comf',
        dateJoined: '2022-10-20',
        isBlocked: false,
        numFollowers: 0,
        numFollowing: 2,
        numPosts: 8,
        numReactions: 13,
    },
];

const flaggedPosts = [
    {
        postId: '76bb977c-4fd1-448b-bda9-5685ce1b6da7',
        userId: 'faf55049-ae3a-4245-88f8-55836e3007da',
        postBody: '[{"type":"paragraph","children":[{"text":"fuck post"}]}]',
        imageUrl: null,
        parentPostId: null,
        deleted: false,
        dateTime: '1666324227000',
        editDateTime: '1666324268000',
        isRoot: true,
        likes: 0,
        dislikes: 2,
    },
];

const harrassedPosts = [
    {
        postId: 'a2cd1cd6-327d-4ab8-b2fe-e76ace7fb084',
        userId: '23aec59b-8095-4d89-be39-7b2f9cc596f3',
        postBody:
            '[{"type":"paragraph","children":[{"text":"asdkljfhaksdjhf"}]},{"type":"paragraph","children":[{"text":""}]}]',
        imageUrl: null,
        parentPostId: null,
        deleted: false,
        dateTime: '1666262850000',
        editDateTime: null,
        isRoot: true,
        likes: 1,
        dislikes: 3,
    },
];

const notifications = [
    {
        id: 1,
        dateTime: '2022-10-21 17:24:00',
        type: 'flagged',
        read: false,
    },
    {
        id: 2,
        dateTime: '2022-10-21 04:50:27',
        type: 'harassment',
        read: true,
    },
];

export {
    summaryStats,
    dayUniqueUsers,
    mostVisitedUsers,
    dailyPostReacts,
    totalReactions,
    mostLikedPosts,
    mostDislikedPosts,
    users,
    flaggedPosts,
    harrassedPosts,
    notifications,
};
