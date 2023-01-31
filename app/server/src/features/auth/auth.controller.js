const {
    saveUserAndGenerateToken,
    verifyLogin,
    initiateMFA,
    verifyMFA,
} = require('./auth.service');

const register = async (req, res) => {
    // check for input errors
    if (
        !req.body ||
        !req.body.email ||
        !req.body.password ||
        !req.body.fullName
    ) {
        return res.status(400).send({
            message:
                'Email, password and fullname are required in request bodys',
        });
    }

    const { email, password, fullName } = req.body;
    const token = await saveUserAndGenerateToken(email, password, fullName);

    if (token.errorMessage) {
        return res.status(token.status).send({ message: token.errorMessage });
    }
    if (token) {
        return res.status(200).send({ token });
    }
    return res.status(500).send({ message: 'Something went wrong' });
};

const login = async (req, res) => {
    // check for input errors
    if (!req.body || !req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Email and password are required in request body',
        });
    }

    const { email, password } = req.body;
    const validLogin = await verifyLogin(email, password);

    if (validLogin.errorMessage) {
        return res
            .status(validLogin.status)
            .send({ message: validLogin.errorMessage });
    }
    if (validLogin) {
        await initiateMFA(email);
        return res.status(200).send({
            message: 'Credentials verified, created MFA confirmation code',
        });
    }
    return res.status(500).send({ message: 'Something went wrong' });
};

const mfa = async (req, res) => {
    // check for input errors
    if (!req.body || !req.body.email || !req.body.confirmationCode) {
        return res.status(400).send({
            message: 'Email and confirmation code are required in request body',
        });
    }

    const { email, confirmationCode } = req.body;
    const token = await verifyMFA(email, confirmationCode);

    if (token.errorMessage) {
        return res.status(token.status).send({ message: token.errorMessage });
    }
    return res.status(200).send({ token });
};

module.exports = {
    register,
    login,
    mfa,
};
