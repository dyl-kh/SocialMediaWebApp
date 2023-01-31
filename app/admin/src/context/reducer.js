// Define reducer action types here to avoid typos
export const ACTIONS = {
    UPDATE_SUMMARY_STATS: 'UPDATE_SUMMARY_STATS',
    UPDATE_UNIQUE_USERS: 'UPDATE_UNIQUE_USERS',
    UPDATE_MOST_VISITED_USERS: 'UPDATE_MOST_VISITED_USERS',
    UPDATE_DAILY_POST_REACTS: 'UPDATE_DAILY_POST_REACTS',
    UPDATE_TOTAL_REACTIONS: 'UPDATE_TOTAL_REACTIONS',
    UPDATE_MOST_LIKED_POSTS: 'UPDATE_MOST_LIKED_POSTS',
    UPDATE_MOST_DISLIKED_POSTS: 'UPDATE_MOST_DISLIKED_POSTS',
    UPDATE_DASHBOARD_OVERVIEW_DATA: 'UPDATE_DASHBOARD_OVERVIEW_DATA',
    UPDATE_USERS: 'UPDATE_USERS',
    SET_SELECTED_USER: 'SET_SELECTED_USER',
    UPDATE_FLAGGED_POSTS: 'UPDATE_FLAGGED_POSTS',
    UPDATE_NOTIFICATIONS: 'UPDATE_NOTIFICATIONS',
    UPDATE_HARRASSED_POSTS: 'UPDATE_HARRASSED_POSTS',
};

// This reducer helps us update the state of our application
// which is stored in the context
export const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.UPDATE_SUMMARY_STATS:
            return { ...state, summaryStats: action.payload };
        case ACTIONS.UPDATE_UNIQUE_USERS:
            return { ...state, dayUniqueUsers: action.payload };
        case ACTIONS.UPDATE_MOST_VISITED_USERS:
            return { ...state, mostVisitedUsers: action.payload };
        case ACTIONS.UPDATE_DAILY_POST_REACTS:
            return { ...state, dailyPostReacts: action.payload };
        case ACTIONS.UPDATE_TOTAL_REACTIONS:
            return { ...state, totalReactions: action.payload };
        case ACTIONS.UPDATE_MOST_LIKED_POSTS:
            return { ...state, mostLikedPosts: action.payload };
        case ACTIONS.UPDATE_MOST_DISLIKED_POSTS:
            return { ...state, mostDislikedPosts: action.payload };
        case ACTIONS.UPDATE_DASHBOARD_OVERVIEW_DATA:
            return { ...state, ...action.payload };
        case ACTIONS.UPDATE_USERS:
            return { ...state, users: action.payload };
        case ACTIONS.SET_SELECTED_USER:
            return { ...state, selectedUser: action.payload };
        case ACTIONS.UPDATE_FLAGGED_POSTS:
            return { ...state, flaggedPosts: action.payload };
        case ACTIONS.UPDATE_NOTIFICATIONS:
            return { ...state, notifications: action.payload };
        case ACTIONS.UPDATE_HARRASSED_POSTS:
            return { ...state, harrassedPosts: action.payload };
        default:
            return state;
    }
};
