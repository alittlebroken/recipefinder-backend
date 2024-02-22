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
    {id: 7, recipeId: 2, categoryId: 5},
    {id: 8, recipeId: 3, categoryId: 11},
    {id: 9, recipeId: 3, categoryId: 7},
    {id: 10, recipeId: 3, categoryId: 12},
    {id: 11, recipeId: 5, categoryId: 4},
    {id: 12, recipeId: 5, categoryId: 7},
    {id: 13, recipeId: 5, categoryId: 11},
    {id: 14, recipeId: 5, categoryId: 12},
    {id: 15, recipeId: 6, categoryId: 13},
    {id: 16, recipeId: 6, categoryId: 5},
    {id: 17, recipeId: 6, categoryId: 3},
    {id: 18, recipeId: 6, categoryId: 4},
    {id: 19, recipeId: 6, categoryId: 3},
    {id: 20, recipeId: 6, categoryId: 7},
    {id: 21, recipeId: 6, categoryId: 8},
    {id: 22, recipeId: 7, categoryId: 21},
    {id: 23, recipeId: 7, categoryId: 13},
    {id: 24, recipeId: 7, categoryId: 8},
    {id: 25, recipeId: 7, categoryId: 7},
    {id: 26, recipeId: 7, categoryId: 5},
    {id: 27, recipeId: 7, categoryId: 4},
    {id: 28, recipeId: 7, categoryId: 3},
    {id: 29, recipeId: 7, categoryId: 2},
    {id: 30, recipeId: 8, categoryId: 3},
    {id: 31, recipeId: 8, categoryId: 4},
    {id: 32, recipeId: 8, categoryId: 6},
    {id: 33, recipeId: 8, categoryId: 9},
    {id: 34, recipeId: 8, categoryId: 11},
    {id: 35, recipeId: 8, categoryId: 13},
    {id: 36, recipeId: 8, categoryId: 15},
    {id: 37, recipeId: 8, categoryId: 20},
  ]);

  await knex.raw('select setval(\'recipe_categories_id_seq\', max(id)) from recipe_categories');
};
