const Sequelize = require('sequelize');
const db = require('../configs/database');

const PageView = db.define('PageViews', {
    pageViewId: {
        type: Sequelize.STRING(40),
        primaryKey: true,
    },
    pathName: {
        type: Sequelize.STRING,
    },
    dateTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
    },
});

module.exports = PageView;
