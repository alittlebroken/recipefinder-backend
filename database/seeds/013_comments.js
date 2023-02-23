/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {recipeId: 1, userId: 1, name: 'Fantatsic!', content: 'Tasted so good. Will make again in the future.'},
    {recipeId: 1, userId: 2, name: 'Amazing!', content: 'Never tasted something so good in my life. You must all try it.'}
  ]);

  await knex.raw('select setval(\'comments_id_seq\', max(id)) from comments');
};
