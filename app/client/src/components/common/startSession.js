// check if session object exists in local storage, populate it if it does not
export const getSessionObj = () => {
    if (window.localStorage.getItem('session') === null) {
        const sessionObj = {
            loggedIn: false,
            userId: null,
            fullname: null,
        };
        window.localStorage.setItem('session', JSON.stringify(sessionObj));
        return sessionObj;
    }

    const sessionObj = JSON.parse(window.localStorage.getItem('session'));
    return sessionObj;
};

// also check for post and replies arrays and generate if they don't exist
export const checkPostAndReplies = () => {
    if (window.localStorage.getItem('posts') === null) {
        const posts = [];
        window.localStorage.setItem('posts', JSON.stringify(posts));
    }
    if (window.localStorage.getItem('replies') === null) {
        const replies = [];
        window.localStorage.setItem('replies', JSON.stringify(replies));
    }
};

// helper function to save session object to local storage
export const saveSessionObj = sessionObj => {
    window.localStorage.setItem('session', JSON.stringify(sessionObj));
};
