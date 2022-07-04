/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('ingredients').del()
  await knex('ingredients').insert([
    {id: 1, name: 'Olive Oil'},
    {id: 2, name: 'Sweet Potatoes'},
    {id: 3, name: 'Smoked Paprika'},
    {id: 4, name: 'Ground Cumin'},
    {id: 5, name: 'Onion'},
    {id: 6, name: 'Carrot'},
    {id: 7, name: 'Celery Stick, Chopped'},
    {id: 8, name: 'Garlic Clove, Crushed'},
    {id: 9, name: 'Chilli Powder'},
    {id: 10, name: 'Oregano'},
    {id: 11, name: 'Tomato Puree'},
    {id: 12, name: 'Red Pepper, Chunks'},
    {id: 13, name: 'Can chopped tomatoes'},
    {id: 14, name: 'Can black beans'},
    {id: 15, name: 'Can kidney beans'},
    {id: 16, name: 'Lime Wedges'},
    {id: 17, name: 'Guacamole'},
    {id: 18, name: 'Rice'},
    {id: 19, name: 'Coriander'},
    {id: 20, name: 'Oil'},
    {id: 21, name: 'Red Onion'},
    {id: 22, name: 'Red Chilli'},
    {id: 23, name: 'Ground coriander'},
    {id: 24, name: 'Can sweetcorn'},
    {id: 25, name: 'Bunch coriander, chopped'},
    {id: 26, name: 'Polenta'},
    {id: 27, name: 'Buns'},
    {id: 28, name: 'Salsa'},
    {id: 29, name: 'Salad Leaves'}
  ]);
};
