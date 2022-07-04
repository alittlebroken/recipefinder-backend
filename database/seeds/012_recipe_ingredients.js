/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('recipe_ingredients').del()
  await knex('recipe_ingredients').insert([
    {id: 1, recipeId: 1, ingredientId: 1, amount: 3, amount_type: 'tbsp'},
    {id: 2, recipeId: 1, ingredientId: 2, amount: 2, amount_type: ''},
    {id: 3, recipeId: 1, ingredientId: 3, amount: 2, amount_type: 'tsp'},
    {id: 4, recipeId: 1, ingredientId: 4, amount: 2, amount_type: 'tsp'},
    {id: 5, recipeId: 1, ingredientId: 5, amount: 1, amount_type: ''},
    {id: 6, recipeId: 1, ingredientId: 6, amount: 2, amount_type: ''},
    {id: 7, recipeId: 1, ingredientId: 7, amount: 2, amount_type: ''},
    {id: 8, recipeId: 1, ingredientId: 8, amount: 2, amount_type: ''},
    {id: 9, recipeId: 1, ingredientId: 9, amount: 2, amount_type: 'tsp'},
    {id: 10, recipeId: 1, ingredientId: 10, amount: 1, amount_type: 'tsp'},
    {id: 11, recipeId: 1, ingredientId: 11, amount: 1, amount_type: 'tbsp'},
    {id: 12, recipeId: 1, ingredientId: 12, amount: 1, amount_type: ''},
    {id: 13, recipeId: 1, ingredientId: 13, amount: 400, amount_type: 'grams'},
    {id: 14, recipeId: 1, ingredientId: 13, amount: 400, amount_type: 'grams'},
    {id: 15, recipeId: 1, ingredientId: 14, amount: 400, amount_type: 'grams'},
    {id: 16, recipeId: 1, ingredientId: 15, amount: 400, amount_type: 'grams'},
    {id: 17, recipeId: 1, ingredientId: 16, amount: 1, amount_type: ''},
    {id: 18, recipeId: 1, ingredientId: 17, amount: 1, amount_type: ''},
    {id: 19, recipeId: 1, ingredientId: 18, amount: 1, amount_type: ''},
    {id: 20, recipeId: 1, ingredientId: 19, amount: 1, amount_type: ''},
    {id: 21, recipeId: 2, ingredientId: 2, amount: 2, amount_type: 'kg'},
    {id: 22, recipeId: 2, ingredientId: 20, amount: 2, amount_type: 'tsp'},
    {id: 23, recipeId: 2, ingredientId: 21, amount: 2, amount_type: ''},
    {id: 24, recipeId: 2, ingredientId: 22, amount: 2, amount_type: ''},
    {id: 25, recipeId: 2, ingredientId: 4, amount: 1, amount_type: 'tbsp'},
    {id: 26, recipeId: 2, ingredientId: 19, amount: 1, amount_type: 'tbsp'},
    {id: 27, recipeId: 2, ingredientId: 24, amount: 340, amount_type: 'grams'},
    {id: 28, recipeId: 2, ingredientId: 25, amount: 1, amount_type: ''},
    {id: 29, recipeId: 2, ingredientId: 26, amount: 200, amount_type: 'grams'},
    {id: 30, recipeId: 2, ingredientId: 27, amount: 1, amount_type: ''},
    {id: 31, recipeId: 2, ingredientId: 28, amount: 1, amount_type: ''},
    {id: 32, recipeId: 2, ingredientId: 5, amount: 1, amount_type: ''},
    {id: 33, recipeId: 2, ingredientId: 29, amount: 1, amount_type: ''},
  ]);
};
