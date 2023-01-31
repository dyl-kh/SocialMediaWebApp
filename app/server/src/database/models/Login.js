const Sequelize = require('sequelize');
const db = require('../configs/database');

const Login = db.define('Logins', {
    loginId: {
        type: Sequelize.STRING(40),
        primaryKey: true,
    },
    userId: {
        type: Sequelize.STRING(40),
    },
    dateTime: {
        type: Sequelize.DATE,
    },
});

// Login.associate = (models) => {
//     Login.belongsTo(models.UserAccount, {
//         foreignKey: 'userId',
//         as: 'user',
//         onDelete: 'CASCADE',
//     });
// };

module.exports = Login;
