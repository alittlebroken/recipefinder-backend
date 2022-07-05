/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('pantries', table => {
     table.increments('id').primary();
     table.integer('userId').unsigned().notNullable();
     table.foreign('userId')
      .references('id')
      .inTable('users')
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
   .dropTable('pantries');
};
