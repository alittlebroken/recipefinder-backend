/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('pantry_ingredients', table => {
     table.increments('id').primary();
     table.integer('pantryId').unsigned().notNullable();
     table.foreign('pantryId')
      .references('id')
      .inTable('pantries')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
     table.integer('ingredientId').unsigned().notNullable();
     table.foreign('ingredientId')
      .references('id')
      .inTable('ingredients')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
     table.integer('amount').unsigned().notNullable();
     table.string('amount_type');
     table.timestamps(true, true);
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return kenx.schema
   .dropTable('pantry_ingredients');
};
