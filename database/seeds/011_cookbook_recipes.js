/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cookbook_recipes').del()
  await knex('cookbook_recipes').insert([
    {id: 1, cookbookId: 1, recipeId: 3},
    {id: 2, cookbookId: 1, recipeId: 4},
    {id: 3, cookbookId: 2, recipeId: 1},
    {id: 4, cookbookId: 2, recipeId: 2},
    {id: 5, cookbookId: 2, recipeId: 5},
  ]);

  await knex.raw('select setval(\'cookbook_recipes_id_seq\', max(id)) from cookbook_recipes');
};
