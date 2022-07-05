/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('steps', table => {
     table.increments('id').primary();
     table.integer('recipeId').unsigned().notNullable();
     table.foreign('recipeId')
      .references('id')
      .inTable('recipes')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
     table.integer('stepNo').unsigned().notNullable();
     table.text('content').notNullable();
     table.timestamps(true, true);
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
   .dropTable('steps');
};
