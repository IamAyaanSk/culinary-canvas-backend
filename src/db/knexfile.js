require('dotenv').config();
const path = require('path');

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRESDB_HOST,
      user: process.env.POSTGRESDB_USER,
      password: process.env.POSTGRESDB_ROOT_PASSWORD,
      database: process.env.POSTGRESDB_DATABASE,
      port: process.env.POSTGRESDB_DOCKER_PORT,
      charset: 'utf8',
    },
    migrations: {
      directory: path.join(__dirname, '..', '/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, '..', '/seeds'),
    },
  },
};
