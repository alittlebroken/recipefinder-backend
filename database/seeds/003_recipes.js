/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipes').del()
  await knex('recipes').insert([
    {
      id: 1,
      userId: 1,
      name: 'Vegan Chilli',
      description: 'Our healthy vegan chilli recipe packs in plenty of vegetables and doesn’t fall short on the flavour front. Serve it with rice or in jacket potatoes for a filling supper',
      servings: 4,
      calories_per_serving: 367,
      prep_time: 15,
      cook_time: 45,
      rating: 10
    },
    {
      id: 2,
      userId: 2,
      name: 'Easy vegan burgers',
      description: 'Make vegan burgers with polenta and spice with cumin, chilli and coriander. Cook in the oven or on the barbecue and serve with a plant-based salsa',
      servings: 10,
      calories_per_serving: 252,
      prep_time: 20,
      cook_time: 70,
      rating: 90
    }
  ]);

  await knex.raw('select setval(\'recipes_id_seq\', max(id)) from recipes');
};
