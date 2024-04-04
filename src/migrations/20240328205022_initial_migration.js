/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .createTableIfNotExists('users', function (users) {
      users.bigIncrements('id').primary();
      users.string('user_name').notNullable().unique();
      users.string('email').notNullable().unique();
      users.string('name');
      users.enum('gender', ['Male', 'Female', 'Others']);
      users.text('bio');
      users.string('country');
      users.string('profile_picture_link', 512);
      users.jsonb('social_media_links');
      users.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTableIfNotExists('recipes', function (recipes) {
      recipes.bigIncrements('id').primary();
      recipes.bigInteger('user_id').notNullable();
      recipes.string('name').notNullable();
      recipes.string('slug', 512).notNullable().unique();
      recipes.string('cover_image_link', 512).notNullable().unique();
      recipes.string('video_link', 512);
      recipes.jsonb('instructions').notNullable();
      recipes.integer('serves').notNullable();
      recipes.integer('cook_time_in_minutes').notNullable();
      recipes.boolean('is_veg').notNullable();
      recipes.boolean('is_draft').notNullable().defaultTo(true);
      recipes.dateTime('created_at').notNullable().defaultTo(knex.fn.now());

      recipes.foreign('user_id').references('users.id').onDelete('CASCADE');
    })
    .createTableIfNotExists('user_favorite_recipes', function (userFavoriteRecipes) {
      userFavoriteRecipes.bigInteger('user_id').notNullable();
      userFavoriteRecipes.bigInteger('recipe_id').notNullable();
      userFavoriteRecipes.primary(['user_id', 'recipe_id']);
      userFavoriteRecipes.foreign('user_id').references('users.id').onDelete('CASCADE');
      userFavoriteRecipes.foreign('recipe_id').references('recipes.id').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('user_favorite_recipes').dropTableIfExists('recipes').dropTableIfExists('users');
};
