/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('cookbooks', table => {
     table.increments('id');
     table.integer('userId').unsigned().notNullable();
     table.foreign('userId').references('id').inTable('users');
     table.string('name', 255).notNullable();
     table.string('description');
     table.string('image');
     table.timestamps(true, true);
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
   .dropTable('cookbooks');
};
