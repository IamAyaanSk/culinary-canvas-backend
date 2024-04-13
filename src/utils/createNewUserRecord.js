require('dotenv').config();
const bcrypt = require('bcrypt');

const knex = require('../db/knex');

const createNewUserRecord = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, Number(process.env.SALT_ROUNDS || 10));

  const record = await knex('users').insert({
    user_name: user.user_name,
    email: user.email,
    password: hashedPassword,
    first_name: user.first_name,
    last_name: user.last_name,
  });

  console.log(record); // []

  if (!record) return false;

  return true;
};

module.exports = createNewUserRecord;
