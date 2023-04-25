/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
     .createTable('files', table => {
       table.increments('id').primary();
       table.integer('userid')
        .unsigned()
        .notNullable();
       table.foreign('userid')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
       table.string('src', 255).notNullable();
       table.string('title', 255).notNullable();
       table.string('alt', 255).nullable();
       table.string('mimetype', 255).notNullable();
       table.string('resource', 255).notNullable();
       table.integer('resourceid').notNullable();
       table.timestamps(true, true);
     });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
     .dropTable('files');
};
