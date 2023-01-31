const pendingConfirmationCodes = {};

const sendConfirmationEmail = async (fullName, confirmationCode, email) => {
    console.log(`Sending confirmation email to ${email}`);
};

const createNewCodeAndEmail = (userId, fullName, email) => {
    const confirmationCode = Math.floor(100000 + Math.random() * 900000);

    // store the confirmation code in the pendingConfirmationCodes object
    pendingConfirmationCodes[userId] = confirmationCode.toString();

    if (process.env.ENABLE_ACTUAL_2FA) {
        sendConfirmationEmail(fullName, confirmationCode, email);
    }
    return confirmationCode;
};

const isValidConfirmationCode = (userId, confirmationCode) => {
    const pendingConfirmationCode = pendingConfirmationCodes[userId];

    // invalid if theres no pending confirmation code
    // meaning user hasnt logged in with pw and email yet
    if (typeof pendingConfirmationCode === 'undefined') {
        return false;
    }

    if (process.env.ENABLE_ACTUAL_MFA === 'false') {
        return true;
    }

    if (pendingConfirmationCode === confirmationCode) {
        delete pendingConfirmationCodes[userId];
        return true;
    }
    return false;
};

module.exports = {
    createNewCodeAndEmail,
    isValidConfirmationCode,
};
