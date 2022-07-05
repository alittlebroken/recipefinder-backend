/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('comments').del()
  await knex('comments').insert([
    {id: 1, recipeId: 1, userId: 1, name: 'Fantatsic!', content: 'Tasted so good. Will make again in the future.'},
    {id: 2, recipeId: 1, userId: 2, name: 'Amazing!', content: 'Never tasted something so good in my life. You must all try it.'}
  ])
};
