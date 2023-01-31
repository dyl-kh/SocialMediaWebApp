const { getAllUsers } = require('./users.service');

const getUsers = async (req, res) => {
    const users = await getAllUsers();
    res.json(users);
};

const deleteUsers = async (req, res) => {
    if (!req.body || !req.body.password) {
        return res.status(400).send({ message: 'No password provided' });
    }

    const { password } = req.body;

    if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).send({ message: 'Invalid password' });
    }

    const users = await getAllUsers();
    users.forEach(async (user) => {
        await user.destroy();
    });
    return res.status(200).send({ message: 'All users deleted' });
};

module.exports = {
    getUsers,
    deleteUsers,
};
