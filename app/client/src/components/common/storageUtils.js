// helper functions to set user data from local storage based on user id and key
export function setUserVal(id, targetValue, newValue) {
    const userArray = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < userArray.length; i += 1) {
        const user = userArray[i];
        if (user.id === id) {
            user[targetValue] = newValue;
            localStorage.setItem('users', JSON.stringify(userArray));
        }
    }
}

// helper function to get the user id based on the user id and key
export function getUserVal(id, targetValue) {
    const userArray = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < userArray.length; i += 1) {
        const user = userArray[i];
        if (user.id === id) {
            return user[targetValue];
        }
    }

    return null;
}
