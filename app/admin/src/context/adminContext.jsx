import * as React from 'react';
import { PropTypes } from 'prop-types';
import {
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
} from './defaultContextValues';

export * from './reducer';

const Context = React.createContext({ state: null });

// Grab initial state objects from defaultContextValues
const initState = {
    summaryStats,
    dayUniqueUsers,
    mostVisitedUsers,
    dailyPostReacts,
    totalReactions,
    mostLikedPosts,
    mostDislikedPosts,
    users,
    selectedUser: null,
    flaggedPosts,
    notifications,
    harrassedPosts,
};

// Context is used to handle app wide state and all analytics data
export const ContextProvider = ({ children, reducer }) => {
    const [state, dispatch] = React.useReducer(reducer, initState);
    const memoizedValue = React.useMemo(() => ({ state, dispatch }), [state]);
    return (
        <Context.Provider value={memoizedValue}>{children}</Context.Provider>
    );
};

export const useStore = () => React.useContext(Context);

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
    reducer: PropTypes.func.isRequired,
};
