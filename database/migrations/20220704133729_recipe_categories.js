/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('recipe_categories', table => {
     table.increments('id').primary();
     table.integer('recipeId').unsigned().notNullable();
     table.foreign('recipeId')
      .references('id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
     table.integer('categoryId').unsigned().notNullable();
     table.foreign('categoryId')
      .references('id')
      .inTable('categories')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
     table.timestamps(true, true);
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
   .dropTable('recipe_categories');
};
