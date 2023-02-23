/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pantry_ingredients').del()
  await knex('pantry_ingredients').insert([
    {id: 1, pantryId: 1, ingredientId: 2, amount: 100, amount_type: 'grams'},
    {id: 2, pantryId: 1, ingredientId: 14, amount: 1, amount_type: ''},
    {id: 3, pantryId: 1, ingredientId: 16, amount: 4, amount_type: ''},
    {id: 4, pantryId: 1, ingredientId: 6, amount: 1, amount_type: 'kgrams'},
    {id: 5, pantryId: 1, ingredientId: 5, amount: 250, amount_type: 'grams'},
    {id: 6, pantryId: 2, ingredientId: 1, amount: 100, amount_type: 'millilitres'},
    {id: 7, pantryId: 2, ingredientId: 27, amount: 100, amount_type: 'grams'},
    {id: 8, pantryId: 2, ingredientId: 21, amount: 5, amount_type: ''},
    {id: 9, pantryId: 2, ingredientId: 18, amount: 300, amount_type: 'grams'},
    {id: 10, pantryId: 2, ingredientId: 11, amount: 50, amount_type: 'grams'}
  ]);

  await knex.raw('select setval(\'pantry_ingredients_id_seq\', max(id)) from pantry_ingredients');
};
