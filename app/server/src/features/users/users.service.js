const UserAccount = require('../../database/models/UserAccount');

const getAllUsers = async () => {
    const users = await UserAccount.findAll({
        attributes: { exclude: ['hashedPassword', 'email'] },
    });
    return users;
};

module.exports = {
    getAllUsers,
};
