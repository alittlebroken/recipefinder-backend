/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cookbooks').del()
  await knex('cookbooks').insert([
    {
      userId: 1,
      name: 'My Favorite Recipes',
    },
    {
      userId: 2,
      name: 'My Favorite Recipes',
    },
  ]);
};
