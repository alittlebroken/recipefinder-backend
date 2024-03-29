/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
     .createTable('refreshtokens', table => {
       table.increments('id').primary();
       table.integer('userid').unsigned().notNullable();
       table.foreign('userid').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
       table.string('token', 255).notNullable();
       table.timestamps(true, true);
     });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema
     .dropTable('refreshtokens');
  };
  