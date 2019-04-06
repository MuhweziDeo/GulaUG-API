require('dotenv').config();
const parseDbUrl = require("parse-database-url");
const dbConfig = parseDbUrl(process.env.DATABASE_URL);

module.exports = {
    development: {
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        host: dbConfig.host,
        dialect: dbConfig.driver
      },
      "production": {
        "use_env_variable": "DATABASE_URL"
      }
}

