/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {id: 1, name: 'Vegan'},
    {id: 2, name: 'Vegetarian'},
    {id: 3, name: 'Dairy Free'},
    {id: 4, name: 'Gluten Free'},
    {id: 5, name: 'Freezable'},
    {id: 6, name: 'Breakfast'},
    {id: 7, name: 'Lunch'},
    {id: 8, name: 'Dinner'},
    {id: 9, name: 'Dessert'},
    {id: 10, name: 'Drink'},
    {id: 11, name: 'Snack'}
  ]);

  await knex.raw('select setval(\'categories_id_seq\', max(id)) from categories');
};
