/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
   .createTable('recipes', table => {
     table.increments('id').primary();
     table.integer('userId').unsigned().nullable();
     table.foreign('userId')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('set null');
     table.string('name', 255).notNullable();
     table.string('description');
     table.integer('servings').unsigned().notNullable();
     table.integer('calories_per_serving').unsigned().notNullable();
     table.integer('prep_time').unsigned().notNullable();
     table.integer('cook_time').unsigned().notNullable();
     table.integer('rating');
     table.timestamps(true, true);
   });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
   .dropTable('recipes');
};
