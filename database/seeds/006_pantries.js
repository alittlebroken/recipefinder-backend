/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pantries').del()
  await knex('pantries').insert([
    {id: 1, userId: 1},
    {id: 2, userId: 2}
  ]);

  await knex.raw('select setval(\'pantries_id_seq\', max(id)) from pantries');
};
