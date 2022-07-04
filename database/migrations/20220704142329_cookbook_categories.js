/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('cookbook_categories', table => {
     table.increments('id').primary();
     table.integer('cookbookId').unsigned().notNullable();
     table.foreign('cookbookId')
      .references('id')
      .inTable('cookbooks')
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
   .dropTable('cookbook_categories');
};
