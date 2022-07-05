/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('recipe_ingredients', table => {
     table.increments('id').primary();
     table.integer('recipeId').unsigned().notNullable();
     table.foreign('recipeId')
      .references('id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
     table.integer('ingredientId').unsigned().notNullable();
     table.foreign('ingredientId')
      .references('id')
      .inTable('ingredients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
     table.float('amount').unsigned().notNullable();
     table.string('amount_type');
     table.timestamps(true, true);
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
   .dropTable('recipe_ingredients');
};
