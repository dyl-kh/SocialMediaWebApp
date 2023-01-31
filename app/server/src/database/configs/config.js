const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

module.exports = {
    HOST: 'rmit.australiaeast.cloudapp.azure.com',
    USER: dbUsername,
    PASSWORD: dbPassword,
    DB: dbUsername,
    DIALECT: 'mysql',
};
