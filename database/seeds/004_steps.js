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
      content: "Heat the oven to 200C/180C fan/gas 6. Put the sweet potato in a roasting tin and drizzle over 1½ tbsp oil, 1 tsp smoked paprika and 1 tsp ground cumin. Give everything a good mix so that all the chunks are coated in spices, season with salt and pepper, then roast for 25 mins until cooked."
    },
    {
      id: 2,
      recipeId: 1,
      stepNo: 2,
      content: "Meanwhile, heat the remaining oil in a large saucepan over a medium heat. Add the onion, carrot and celery. Cook for 8-10 mins, stirring occasionally until soft, then crush in the garlic and cook for 1 min more. Add the remaining dried spices and tomato purée. Give everything a good mix and cook for 1 min more."
    },
    {
      id: 3,
      recipeId: 1,
      stepNo: 3,
      content: "Add the red pepper, chopped tomatoes and 200ml water. Bring the chilli to a boil, then simmer for 20 mins. Tip in the beans and cook for another 10 mins before adding the sweet potato. Season to taste then serve with lime wedges, guacamole, rice and coriander. Will keep, in an airtight container in the freezer, for up to three months."
    },
    {
      id: 4,
      recipeId: 2,
      stepNo: 1,
      content: "Heat oven to 200C/180C fan/gas 6. Pierce the potato skins and place on a baking tray. Bake for 45 mins until really soft. Remove from the oven and leave to cool. Meanwhile, heat the oil in a small pan, add the onions and chillies, and cook for 8-10 mins until soft. Leave to cool."
    },
    {
      id: 5,
      recipeId: 2,
      stepNo: 2,
      content: "Peel the potatoes and add the flesh to a bowl with the chilli onions. Mash together with the spices until smooth. Using your hands, mix in the sweetcorn, coriander, half the polenta and some seasoning. Shape the mixture into 10 burgers; it will be quite soft. Carefully dip each one into the remaining polenta; dust off any excess. Place burgers on oiled baking trays and chill for at least 30 mins. You can wrap and freeze the burgers at this stage."
    },
    {
      id: 6,
      recipeId: 2,
      stepNo: 3,
      content: "Light the barbecue. When the flames have died down, place a large, well-oiled non-stick frying pan or sturdy baking tray on top of the bars. Cook the burgers in the pan or on the tray for 10 mins each side until nicely browned. Alternatively, heat oven to 220C/200C fan/gas 7 and cook on oiled baking trays for 15 mins. Serve in buns with a dollop of salsa, some onion and salad leaves."
    },
    {
      id: 7,
      recipeId: 3,
      stepNo: 1,
      content: "Switch on your grill"
    },
    {
      id: 8,
      recipeId: 3,
      stepNo: 2,
      content: "Whilst the grill is warming up, grate the cheese"
    },
    {
      id: 9,
      recipeId: 3,
      stepNo: 3,
      content: "Toast one side of the bread under the grill"
    },
    {
      id: 10,
      recipeId: 3,
      stepNo: 4,
      content: "Remove the bread and on the untoasted side sprinkle the grated cheese on top"
    },
    {
      id: 11,
      recipeId: 3,
      stepNo: 5,
      content: "Pour over the Wourstershire sauce to taste"
    },
    {
      id: 12,
      recipeId: 3,
      stepNo: 6,
      content: "Place back under the grill and cook until the cheese is a nice golden color. Serve and enjoy"
    },

    {
      id: 13,
      recipeId: 4,
      stepNo: 1,
      content: "Tip 500g beef mince into a bowl with 1 small onion and 1 egg, them mix."
    },
    {
      id: 14,
      recipeId: 4,
      stepNo: 2,
      content: "Divide the mixture into four. Lightly wet your hands. Carefully roll the mixture into balls, each about the size of a tennis ball."
    },
    {
      id: 15,
      recipeId: 4,
      stepNo: 3,
      content: "Set in the palm of your hand and gently squeeze down to flatten into patties about 3cm thick. Make sure all the burgers are the same thickness so that they will cook evenly."
    },
    {
      id: 16,
      recipeId: 4,
      stepNo: 4,
      content: "Put on a plate, cover with cling film and leave in the fridge to firm up for at least 30 mins."
    },
    {
      id: 17,
      recipeId: 4,
      stepNo: 5,
      content: "Heat the barbecue to medium hot (there will be white ash over the red hot coals - about 40 mins after lighting). Lightly brush one side of each burger with vegetable oil."
    },
    {
      id: 18,
      recipeId: 4,
      stepNo: 6,
      content: "Place the burgers, oil-side down, on the barbecue. Cook for 5 mins until the meat is lightly charred. Don't move them around or they may stick."
    },
    {
      id: 19,
      recipeId: 4,
      stepNo: 7,
      content: "Oil the other side, then turn over using tongs. Don't press down on the meat, as that will squeeze out the juices."
    },
    {
      id: 20,
      recipeId: 4,
      stepNo: 8,
      content: "Cook for 5 mins more for medium. If you like your burgers pink in the middle, cook 1 min less each side. For well done, cook 1 min more."
    },
    {
      id: 21,
      recipeId: 4,
      stepNo: 9,
      content: "Take the burgers off the barbecue. Leave to rest on a plate so that all the juices can settle inside."
    },
    {
      id: 22,
      recipeId: 4,
      stepNo: 10,
      content: "Slice four burger buns in half. Place, cut-side down, on the barbecue rack and toast for 1 min until they are lightly charred. Place a burger inside each bun, then top with your choice of accompaniment."
    },
    {
      id: 23,
      recipeId: 5,
      stepNo: 1,
      content: "Preheat oven to 180 degrees centigrade"
    },
    {
      id: 24,
      recipeId: 5,
      stepNo: 2,
      content: "Mixed herbs and breadcrumbs in a large container"
    },
    {
      id: 25,
      recipeId: 5,
      stepNo: 3,
      content: "In another large container crack the egg and whisk it"
    },
    {
      id: 26,
      recipeId: 5,
      stepNo: 4,
      content: "Dip the chicken breast into the egg ensuring all sides are covered"
    },
    {
      id: 27,
      recipeId: 5,
      stepNo: 5,
      content: "Now dip the chicken into the breadcrumbs and ensure covered on all sides"
    },
    {
      id: 28,
      recipeId: 5,
      stepNo: 6,
      content: "Dip once more into the egg and then back into the breadcrumbs to ensure a more even coating"
    },
    {
      id: 29,
      recipeId: 5,
      stepNo: 7,
      content: `Place on a tray in the oven on the middle oven shelf for 25 minutes.

      Turn once about halfway through cooking.
      
      Ensure that the chicken is cooked through thoroughly.`
    },
    {
      id: 30,
      recipeId: 5,
      stepNo: 8,
      content: "Serve with dip of your choice and enjoy"
    },
  ]);

  await knex.raw('select setval(\'steps_id_seq\', max(id)) from steps');
};
