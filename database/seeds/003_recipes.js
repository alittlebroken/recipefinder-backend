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
    },
    {
      id: 3,
      userId: 1,
      name: 'Cheese on buttered toast',
      description: `A classic british meal perfect for anytime`,
      servings: 1,
      calories_per_serving: 234,
      prep_time: 5,
      cook_time: 6,
      rating: 1
    },
    {
      id: 4,
      userId: 1,
      name: 'Meaty burgers',
      description: null,
      servings: 4,
      calories_per_serving: 126,
      prep_time: 5,
      cook_time: 20,
      rating: 15
    },
    {
      id: 5,
      userId: 2,
      name: 'Gluten free breaded chicken',
      description: `Delicious with various sauces`,
      servings: 1,
      calories_per_serving: 375,
      prep_time: 15,
      cook_time: 25,
      rating: 19
    },
    {
      id: 6,
      userid: 1,
      name: 'Spaghetti Bolognese',
      description: 'An Italian classic great for all the family.',
      servings: 4,
      calories_per_serving: 624,
      prep_time: 15,
      cook_time: 20,
      rating: 0
    },
    {
      id: 7,
      userid: 1,
      name: 'Vegetable Soup',
      description: 'A healthy soup packed full of goodness that is low fat and calories.',
      servings: 2,
      calories_per_serving: 218,
      prep_time: 10,
      cook_time: 15,
      rating: 0,
    },
    {
      id: 8,
      userid: 1,
      name: 'Gluten and Dairy free pancakes',
      description: 'A delicious treat that is gluten and dairy free and still tastes just as great.',
      servings: 6,
      calories_per_serving: 119,
      prep_time: 5,
      cook_time: 20,
      rating: 0,
    }
  ]);

  await knex.raw('select setval(\'recipes_id_seq\', max(id)) from recipes');
};
