const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const UserAccount = require('../../database/models/UserAccount');
const Login = require('../../database/models/Login');
const { createNewCodeAndEmail, isValidConfirmationCode } = require('./mfa');

// create session token
const generateToken = (id) => {
    const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
        expiresIn: 3600, // 1 hour
    });
    return token;
};

// records a login in the database
const recordLogin = async (userId) => {
    const loginId = uuid.v4();
    const dateTime = new Date();
    await Login.create({
        loginId,
        userId,
        dateTime,
    });
};

// saves a new user to the database and returns a session token
const saveUserAndGenerateToken = async (email, password, fullName) => {
    const user = await UserAccount.findOne({
        where: {
            email,
        },
    });

    if (user) {
        return { status: 400, errorMessage: 'User already exists' };
    }
    const id = uuid.v4();
    const hashedPassword = await bcrypt.hash(password, 10);

    UserAccount.create({
        userId: id,
        fullName,
        email,
        hashedPassword,
        isBlocked: false,
    });

    recordLogin(id);

    const token = generateToken(id);
    return token;
};

// verifies the user's password and returns a session token
const verifyLogin = async (email, password) => {
    const user = await UserAccount.findOne({
        where: {
            email,
        },
    });

    if (!user) {
        return {
            status: 404,
            errorMessage: 'User not found with provided email',
        };
    }

    const { isBlocked } = user;
    if (isBlocked) {
        return {
            status: 403,
            errorMessage: 'User has been blocked from the site by an admin',
        };
    }

    const validPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!validPassword) {
        return { status: 401, errorMessage: 'Invalid password' };
    }
    return true;
};

// sends a confirmation code to the user's email
const initiateMFA = async (email) => {
    const { fullName, userId } = await UserAccount.findOne({
        where: {
            email,
        },
    });

    const confirmationCode = createNewCodeAndEmail(userId, fullName, email);
    console.log('Generated new confirmation code: ', confirmationCode);
};

// verifies the confirmation code entered by the user matches the one
// sent to their email (stored in pendingConfirmationCodes)
const verifyMFA = async (email, confirmationCode) => {
    const user = await UserAccount.findOne({
        where: {
            email,
        },
    });

    if (!user) {
        return { status: 404, errorMessage: 'User not found' };
    }

    const { userId } = user;

    if (isValidConfirmationCode(userId, confirmationCode)) {
        recordLogin(userId);
        return generateToken(userId);
    }
    return { status: 401, errorMessage: 'Invalid confirmation code' };
};

module.exports = {
    saveUserAndGenerateToken,
    verifyLogin,
    initiateMFA,
    verifyMFA,
};
