/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('steps').del()
  await knex('steps').insert([
    {
      id: 1,
      recipeId: 1,
      stepNo: 1,
      content: 'Heat the oven to 200C/180C fan/gas 6. Put the sweet potato in a roasting tin and drizzle over 1½ tbsp oil, 1 tsp smoked paprika and 1 tsp ground cumin. Give everything a good mix so that all the chunks are coated in spices, season with salt and pepper, then roast for 25 mins until cooked.'
    },
    {
      id: 2,
      recipeId: 1,
      stepNo: 2,
      content: 'Meanwhile, heat the remaining oil in a large saucepan over a medium heat. Add the onion, carrot and celery. Cook for 8-10 mins, stirring occasionally until soft, then crush in the garlic and cook for 1 min more. Add the remaining dried spices and tomato purée. Give everything a good mix and cook for 1 min more.'
    },
    {
      id: 3,
      recipeId: 1,
      stepNo: 3,
      content: 'Add the red pepper, chopped tomatoes and 200ml water. Bring the chilli to a boil, then simmer for 20 mins. Tip in the beans and cook for another 10 mins before adding the sweet potato. Season to taste then serve with lime wedges, guacamole, rice and coriander. Will keep, in an airtight container in the freezer, for up to three months.'
    },
    {
      id: 4,
      recipeId: 2,
      stepNo: 1,
      content: 'Heat oven to 200C/180C fan/gas 6. Pierce the potato skins and place on a baking tray. Bake for 45 mins until really soft. Remove from the oven and leave to cool. Meanwhile, heat the oil in a small pan, add the onions and chillies, and cook for 8-10 mins until soft. Leave to cool.'
    },
    {
      id: 5,
      recipeId: 2,
      stepNo: 2,
      content: 'Peel the potatoes and add the flesh to a bowl with the chilli onions. Mash together with the spices until smooth. Using your hands, mix in the sweetcorn, coriander, half the polenta and some seasoning. Shape the mixture into 10 burgers; it will be quite soft. Carefully dip each one into the remaining polenta; dust off any excess. Place burgers on oiled baking trays and chill for at least 30 mins. You can wrap and freeze the burgers at this stage.'
    },
    {
      id: 6,
      recipeId: 2,
      stepNo: 3,
      content: 'Light the barbecue. When the flames have died down, place a large, well-oiled non-stick frying pan or sturdy baking tray on top of the bars. Cook the burgers in the pan or on the tray for 10 mins each side until nicely browned. Alternatively, heat oven to 220C/200C fan/gas 7 and cook on oiled baking trays for 15 mins. Serve in buns with a dollop of salsa, some onion and salad leaves.'
    }
  ]);
};
