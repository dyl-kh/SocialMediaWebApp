const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

module.exports = {
    HOST: 'dylankhan.mysql.database.azure.com',
    USER: dbUsername,
    PASSWORD: dbPassword,
    DB: 'socialapp',
    DIALECT: 'mysql',
};
