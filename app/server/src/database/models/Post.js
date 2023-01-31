const Sequelize = require('sequelize');
const db = require('../configs/database');

const Post = db.define('Posts', {
    postId: {
        type: Sequelize.STRING(40),
        primaryKey: true,
    },
    userId: {
        type: Sequelize.STRING(40),
    },
    postBody: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    parentPostId: {
        type: Sequelize.STRING(40),
    },
    deleted: {
        type: Sequelize.BOOLEAN,
    },
    dateTime: {
        type: Sequelize.DATE,
    },
    editDateTime: {
        type: Sequelize.DATE,
    },
    isRoot: {
        type: Sequelize.BOOLEAN,
    },
});
// Post.associate = (models) => {
//     Post.hasMany(models.Reaction, {
//         foreignKey: 'postId',
//         as: 'reactions',
//     });
//     Post.hasMany(models.Post, {
//         foreignKey: 'parentPostId',
//         as: 'replies',
//         onDelete: 'CASCADE',
//     });
//     Post.belongsTo(models.Post, {
//         foreignKey: 'parentPostId',
//         as: 'parentPost',
//         onDelete: 'CASCADE',
//     });
//     Post.belongsTo(models.UserAccount, {
//         foreignKey: 'userId',
//         as: 'user',
//         onDelete: 'CASCADE',
//     });
// };

module.exports = Post;
