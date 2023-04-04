/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cookbooks').del()
  await knex('cookbooks').insert([
    {
      id: 1,
      userId: 1,
      name: 'My Favorite Recipes',
    },
    {
      id: 2,
      userId: 2,
      name: 'My Favorite Recipes',
    },
  ]);

  await knex.raw('select setval(\'cookbooks_id_seq\', max(id)) from cookbooks');
};
