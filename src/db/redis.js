require('dotenv').config();
const redis = require('redis');

let client;

(async () => {
  client = redis.createClient({
    socket: {
      port: process.env.REDIS_DOCKER_PORT,
      host: process.env.REDIS_HOST,
    },
  });
  client.on('error', (error) => console.error(`Error : ${error}`));
  client.on('connect', () => console.log('Redis connected'));
  await client.connect();
})();

module.exports = client;
