/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable('users', function (users) {
    users.dropColumn('name');
    users.string('first_name');
    users.string('last_name');
    users.string('password').notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable('users', function (users) {
    users.dropColumns(['first_name', 'password', 'last_name']);
    users.string('name');
  });
};
