const config = {
    HOST: process.env.DB_HOST,
    DIALECT: process.env.DB_DIALECT,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    DB: process.env.DB_NAME,

    POOL: {
        max: parseInt(process.env.DB_POOL_MAX),
        min: parseInt(process.env.DB_POOL_MIN),
        aquire: parseInt(process.env.DB_POOL_AQUIRE),
        idle: parseInt(process.env.DB_POOL_IDLE),
    }
};

module.exports = config;