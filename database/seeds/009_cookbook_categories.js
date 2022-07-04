/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cookbook_categories').del()
  await knex('cookbook_categories').insert([
    {id: 1, cookbookId: 1, categoryId: 1},
    {id: 2, cookbookId: 1, categoryId: 2},
    {id: 3, cookbookId: 2, categoryId: 4},
    {id: 4, cookbookId: 2, categoryId: 3}
  ]);
};
