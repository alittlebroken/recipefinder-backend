/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipe_categories').del()
  await knex('recipe_categories').insert([
    {id: 1, recipeId: 1, categoryId: 5},
    {id: 2, recipeId: 1, categoryId: 4},
    {id: 3, recipeId: 1, categoryId: 1},
    {id: 4, recipeId: 1, categoryId: 2},
    {id: 5, recipeId: 2, categoryId: 1},
    {id: 6, recipeId: 2, categoryId: 2},
    {id: 7, recipeId: 2, categoryId: 5}
  ]);

  await knex.raw('select setval(\'recipe_categories_id_seq\', max(id)) from recipe_categories');
};
