const knex = require('../db/knex');

const getUserFromDB = async (field, value) => {
  const user = await knex('users')
    .where({
      [field]: value,
    })
    .first();

  if (!user) {
    return false;
  }

  return true;
};

module.exports = getUserFromDB;
