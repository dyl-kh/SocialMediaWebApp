const { Sequelize } = require('sequelize');
const config = require('./config');

// eslint-disable-next-line object-curly-newline
const { HOST, USER, PASSWORD, DB, DIALECT } = config;

const db = new Sequelize(DB, USER, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    define: {
        timestamps: false,
    },
});

module.exports = db;

const UserAccount = require('../models/UserAccount');
const Followings = require('../models/Followings');
const Login = require('../models/Login');
const Post = require('../models/Post');
const ProfileVisit = require('../models/ProfileVisit');
const Reaction = require('../models/Reaction');
// const PageView = require('../models/PageView');

UserAccount.associate = (models) => {
    UserAccount.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE',
        hooks: true,
    });
    UserAccount.hasMany(models.Reaction, {
        foreignKey: 'userId',
        as: 'reactions',
        onDelete: 'CASCADE',
        hooks: true,
    });
    UserAccount.hasMany(models.Login, {
        foreignKey: 'userId',
        as: 'logins',
        onDelete: 'CASCADE',
        hooks: true,
    });
    UserAccount.hasMany(models.Followings, {
        foreignKey: 'followerId',
        as: 'followings',
        onDelete: 'CASCADE',
        hooks: true,
    });
    UserAccount.hasMany(models.Followings, {
        foreignKey: 'followedId',
        as: 'followers',
        onDelete: 'CASCADE',
        hooks: true,
    });
    UserAccount.hasMany(models.ProfileVisit, {
        foreignKey: 'visitorId',
        as: 'profileVisits',
        onDelete: 'CASCADE',
        hooks: true,
    });
    UserAccount.hasMany(models.ProfileVisit, {
        foreignKey: 'visitedId',
        as: 'profileVisitors',
        onDelete: 'CASCADE',
        hooks: true,
    });
};

Followings.associate = (models) => {
    Followings.belongsTo(models.UserAccount, {
        foreignKey: 'followerId',
        as: 'follower',
    });
    Followings.belongsTo(models.UserAccount, {
        foreignKey: 'followedId',
        as: 'followed',
    });
};

Login.associate = (models) => {
    Login.belongsTo(models.UserAccount, {
        foreignKey: 'userId',
        as: 'user',
    });
};

Post.associate = (models) => {
    Post.hasMany(models.Reaction, {
        foreignKey: 'postId',
        as: 'reactions',
        onDelete: 'CASCADE',
        hooks: true,
    });
    Post.hasMany(models.Post, {
        foreignKey: 'parentPostId',
        as: 'replies',
        onDelete: 'CASCADE',
        hooks: true,
    });
    Post.belongsTo(models.Post, {
        foreignKey: 'parentPostId',
        as: 'parentPost',
    });
    Post.belongsTo(models.UserAccount, {
        foreignKey: 'userId',
        as: 'user',
    });
};

ProfileVisit.associate = (models) => {
    ProfileVisit.belongsTo(models.UserAccount, {
        foreignKey: 'visitorId',
        as: 'visitor',
    });
    ProfileVisit.belongsTo(models.UserAccount, {
        foreignKey: 'visitedId',
        as: 'visited',
    });
};

Reaction.associate = (models) => {
    Reaction.belongsTo(models.Post, {
        foreignKey: 'postId',
        as: 'post',
    });
    Reaction.belongsTo(models.UserAccount, {
        foreignKey: 'userId',
        as: 'user',
    });
};

db.sync();
// db.sync({ alter: true });
