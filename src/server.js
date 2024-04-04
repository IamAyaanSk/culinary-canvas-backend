const express = require('express');
const server = express();

require('dotenv').config();
const port = process.env.NODE_DOCKER_PORT;
const knex = require('./db/knex');

const redisClient = require('./db/redis');

server.get('/', (req, res) => {
  res.send('Hello World!');
});

server.get('/data-test', async (req, res) => {
  const result = await knex.select('*').from('users');
  res.send(result);
});

server.get('/redis-test', async (req, res) => {
  await redisClient.set('key', 'value');
  const value = await redisClient.get('key');
  res.send(value);
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
