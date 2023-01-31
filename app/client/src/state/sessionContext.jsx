import React, { createContext } from 'react';
import PropTypes from 'prop-types';

// create a context object to store the logged in user and token
const SessionContext = createContext({
    user: null,
    token: null,
    // eslint-disable-next-line no-unused-vars
    login: data => {},
    logout: () => {},
});

// create a provider for the context object
const SessionProvider = props => {
    const [token, setToken] = React.useState(localStorage.getItem('token'));
    const [user, setUser] = React.useState(null);
    const login = data => {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    // wrap value in useMemo to prevent unnecessary re-renders
    const providerValue = React.useMemo(
        () => ({ user, setUser, token, login, logout }),
        [user, setUser, token, login, logout]
    );

    const { children } = props;

    return (
        <SessionContext.Provider value={providerValue}>
            {children}
        </SessionContext.Provider>
    );
};

// validate the props passed to the provider
SessionProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default SessionContext;
export { SessionProvider };
