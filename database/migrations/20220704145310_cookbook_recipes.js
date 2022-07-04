/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('cookbook_recipes', table => {
     table.increments('id').primary();
     table.integer('cookbookId').unsigned().notNullable();
     table.foreign('cookbookId')
      .references('id')
      .inTable('cookbooks')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
     table.integer('recipeId').unsigned().notNullable();
     table.foreign('recipeId')
      .references('id')
      .inTable('recipes')
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
   .dropTable('cookbook_recipes');
};
