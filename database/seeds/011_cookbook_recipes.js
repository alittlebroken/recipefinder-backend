/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cookbook_recipes').del()
  await knex('cookbook_recipes').insert([
    {id: 1, cookbookId: 1, recipeId: 1},
    {id: 2, cookbookId: 2, recipeId: 2},
  ]);

  await knex.raw('select setval(\'cookbook_recipes_id_seq\', max(id)) from cookbook_recipes');
};
