# RECIPES

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

<br>

## Protected Routes

#### Create

<details>
 <summary><code>POST</code> <code><b>/recipes</b></code> <code>Add a new recipe</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | userId      |  required | number   | The unique identifier of the user owning the recipe  |
> | name | required | string | The recipes name |
> | servings | required | number | How many people could this recipe feed |
> | calories_per_serving | required | number | The number of calories each serving of this recipe provides |
> | prep_time | required | number | How long in minutes to prep the ingredients for the recipe |
> | cook_time | required | number | How long in minutes to cook this dish |
> | steps | required | array | List if steps to follow to make the recipe |
> | ingredients | required | array | List of ingredients required to make the recipe |
> | cookbookId | required | number | The cookbook the new recipe will initially be stored in |
> | categories | required | array | List of categories that the recipe belongs too |

##### Payload example
> ```json
> {
>     "recipe": {
>       "userId": 35,
>       "name": "Baked Beans on toast with cheese",
>       "description": "",
>       "servings": 1,
>       "calories_per_serving": 150,
>       "prep_time": 6,
>       "cook_time": 7
>     },
>     "steps": [
>         { "stepNo": 1, "content": "Toast some bread" },
>         { "stepNo": 2, "content": "Place baked beans into a pan" },
>         { "stepNo": 3, "content": "Grate some cheese in with the beans and mix together" },
>         { "stepNo": 4, "content": "Cook the beans and cheese for 4 minutes"},
>         { "stepNo": 5, "content": "Pour the beans and cheese over the bread" },
>         { "stepNo": 6, "content": "Server and enjoy" }
>       ],
>     "ingredients": [
>         { "ingredientId": 1, "amount": 2, "amount_type": "slices" },
>         { "ingredientId": 4, "amount": 1, "amount_type": "can" },
>         { "ingredientId": 5, "amount": 50, "amount_type": "grams" }
>       ],
>     "cookbookId": 2,
>     "categories": [
>         { "categoryId": 1 },
>         { "categoryId": 2 },
>         { "categoryId": 4 }
>       ]
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"success":true,"message":"Recipe successfully added"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined recipe" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for recipe" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for userId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined name" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for name" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined servings" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for servings" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined calories_per_serving" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for calories_per_serving" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined prep_time" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for prep_time" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined cook_time" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for cook_time" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined steps" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for steps" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined ingredients" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for ingredients" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined cookbookId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for cookbookId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined categories" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for categories" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" -d @recipe.json http://localhost:5000/recipes

##### Example Response Package
> ```json
> {"success":true,"message":"Recipe successfully added"}
> ```
</details>

<br>

<details>
 <summary><code>POST</code> <code><b>/recipes/:id/ingredients</b></code> <code>Add ingredients to an existing recipe</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe to add one or more ingredients to  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | ingredientId | required | number | The ingredient being added to the recipe |
> | amount | required | number | How much of the ingredient is needed for the recipe |
> | amount_type | required | string | What is the amounts type I.E. slice, grams etc |

##### Payload example
> ```json
> {
>   "ingredientId": 1,
>   "amount": 1,
>   "amount_type": "slice"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"Ingredient successfully added to recipe"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined ingredientId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for ingredientId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined amount" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for amount" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined amount_type" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for amount_type" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" -d @recipe_ingredient.json http://localhost:5000/recipes/22/ingredients

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Ingredient successfully added to recipe"}
> ```
</details>

<br>

<details>
 <summary><code>POST</code> <code><b>/recipes/:id/steps</b></code> <code>Add steps to an existing recipe</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe to add one or more ingredients to  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | stepNo | required | number | The numer identifying the order of the step |
> | stepContent | required | string | Detailed text of what to do for this step |

##### Payload example
> ```json
> {
>   "stepNo": 1,
>   "stepContent": "Place toast in toaster"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"success":true,"message":"Step has been successfully added to the recipe"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined stepNo" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for stepNo" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined stepContent" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for stepContent" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" -d @recipe_steps.json http://localhost:5000/recipes/22/steps

##### Example Response Package
> ```json
> {"success":true,"message":"Step has been successfully added to the recipe"}
> ```
</details>

<br>

<details>
 <summary><code>POST</code> <code><b>/recipes/:id/categories</b></code> <code>Add categorie to an existing recipe</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe to add one or more ingredients to  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | categoryId | required | number | The unique identifier of the category to associate with the recipe |


##### Payload example
> ```json
> {
>   "categoryId": 1
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"success":true,"message":"Category successfully added to Recipe"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined categoryId" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" -d @recipe_categories.json http://localhost:5000/recipes/22/categories

##### Example Response Package
> ```json
> {"success":true,"message":"Category successfully added to Recipe"}
> ```
</details>

<br>

#### Read

<details>
 <summary><code>GET</code> <code><b>/recipes</b></code> <code>Return a list of all recipes and associated data</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | N/A  |

##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns a list of one or more recipes  |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "There are currently no recipes" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" http://localhost:5000/recipes

##### Example Response Package
> ```json
> [{"recipeId":18,"name":"Spicy cheese on toast","description":"A twist of one of the UKs favourite dishes","servings":1,"calories_per_serving":234,"prep_time":5,"cook_time":8,"rating":1,"ingredients":[],"cookbooks":[],"steps":[],"categories":[{"id":14,"name":"Lunches"}]},{"recipeId":22,"name":"Baked Beans on toast with cheese","description":"","servings":1,"calories_per_serving":150,"prep_time":6,"cook_time":7,"rating":null,"ingredients":[{"id":22,"name":"bread","amount":2,"amount_type":"slices"},{"id":21,"name":"beans","amount":1,"amount_type":"can"},{"id":23,"name":"cheese","amount":50,"amount_type":"grams"},{"id":20,"name":"eggs","amount":6,"amount_type":"large"}],"cookbooks":[{"id":8,"name":"Dairy Free Recipes"}],"steps":[{"id":68,"stepNo":1,"content":"Toast some bread"},{"id":69,"stepNo":2,"content":"Place baked beans into a pan"},{"id":70,"stepNo":3,"content":"Grate some cheese in with the beans and mix together"},{"id":71,"stepNo":4,"content":"Cook the beans and cheese for 4 minutes"},{"id":72,"stepNo":5,"content":"Pour the beans and cheese over the bread"},{"id":73,"stepNo":6,"content":"Server and enjoy"},{"id":74,"stepNo":7,"content":"Optional: Sprinkle soem grated cheese over the top"}],"categories":[{"id":12,"name":"Breakfasts"},{"id":14,"name":"Lunches"},{"id":15,"name":"Snacks"},{"id":21,"name":"Vegetarian"}]}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/recipes/:id</b></code> <code>Return a list of a particular recipe and its associated data</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | N/A  |

##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns a list of one or more recipes  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameter" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No recipe found matching supplied id" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" http://localhost:5000/recipes/18

##### Example Response Package
> ```json
> [{"id":18,"userId":34,"name":"Spicy cheese on toast","description":"A twist of one of the UKs favourite dishes","servings":1,"calories_per_serving":234,"prep_time":5,"cook_time":8,"rating":1,"ingredients":[],"steps":[],"categories":[{"id":14,"name":"Lunches"}],"cookbooks":[]}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/recipes/:id/ingredients</b></code> <code>Return a list of a particular recipes ingredients</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | N/A  |

##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns a list of one or more recipes  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameter" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "Recipe currently has no ingredients" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" http://localhost:5000/recipes/22/ingredients

##### Example Response Package
> ```json
> [{"id":22,"name":"bread","amount":2,"amount_type":"slices"},{"id":21,"name":"beans","amount":1,"amount_type":"can"},{"id":23,"name":"cheese","amount":50,"amount_type":"grams"},{"id":20,"name":"eggs","amount":6,"amount_type":"large"}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/recipes/:id/steps</b></code> <code>Return a list of a particular recipes steps</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | N/A  |

##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns a list of one or more recipes  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameter" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "This recipe currently has no steps" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" http://localhost:5000/recipes/22/steps

##### Example Response Package
> ```json
> [{"id":68,"recipeId":22,"stepNo":1,"content":"Toast some bread","created_at":"2023-02-13T12:56:27.900Z","updated_at":"2023-02-13T12:56:27.900Z"},{"id":69,"recipeId":22,"stepNo":2,"content":"Place baked beans into a pan","created_at":"2023-02-13T12:56:27.900Z","updated_at":"2023-02-13T12:56:27.900Z"},{"id":70,"recipeId":22,"stepNo":3,"content":"Grate some cheese in with the beans and mix together","created_at":"2023-02-13T12:56:27.900Z","updated_at":"2023-02-13T12:56:27.900Z"},{"id":71,"recipeId":22,"stepNo":4,"content":"Cook the beans and cheese for 4 minutes","created_at":"2023-02-13T12:56:27.900Z","updated_at":"2023-02-13T12:56:27.900Z"},{"id":72,"recipeId":22,"stepNo":5,"content":"Pour the beans and cheese over the bread","created_at":"2023-02-13T12:56:27.900Z","updated_at":"2023-02-13T12:56:27.900Z"},{"id":73,"recipeId":22,"stepNo":6,"content":"Server and enjoy","created_at":"2023-02-13T12:56:27.900Z","updated_at":"2023-02-13T12:56:27.900Z"},{"id":74,"recipeId":22,"stepNo":7,"content":"Optional: Sprinkle soem grated cheese over the top","created_at":"2023-02-13T19:43:44.083Z","updated_at":"2023-02-13T19:43:44.083Z"}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/recipes/:id/categories</b></code> <code>Return a list of a particular recipes categories</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | N/A  |

##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns a list of one or more recipes  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameter" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "This recipe currently has no categories" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyOTAzNTYsImV4cCI6MTY3NjM3Njc1Nn0.rDHrC6B5Inj48SfotL5TUuaMdLsbB8Y2mNrF6ZmnBgE" -b "cookies.txt" http://localhost:5000/recipes/22/categories

##### Example Response Package
> ```json
> [{"id":21,"recipeId":22,"categoryId":12,"categoryName":"Breakfasts"},{"id":22,"recipeId":22,"categoryId":14,"categoryName":"Lunches"},{"id":23,"recipeId":22,"categoryId":15,"categoryName":"Snacks"},{"id":24,"recipeId":22,"categoryId":21,"categoryName":"Vegetarian"}]
> ```
</details>

<br>

#### Update

<details>
 <summary><code>PUT</code> <code><b>/recipes/:id</b></code> <code>Update a recipe</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  required | string   | Updated name of the recipe  |
> | userId | required | number | Updated id of the user owning the recipe |
> | servings | required | number | Updated how many servings the recipe gives |
> | calories_per_servings | required | number | Updated how many calories the recipe has per serving |
> | prep_time | required | number | Updated time it takes in minutes to prepare the recipe |
> | cook_time | required | numer | Updated time it takes in minutes to cook the recipe |
> | rating | required | number | Updated rating for the recipe |

##### Payload example
> ```json
> {
>     "name": "Spicy CHEESE on toast",
>     "userId": 35,
>     "servings": 2,
>     "calories_per_serving": 321,
>     "prep_time": 5,
>     "cook_time": 6,
>     "rating": 12
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status": 200, "success": true, "message": "Recipe successfully updated"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined name" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for name" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for userId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined servings" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for servings" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined calories_per_serving" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for calories_per_serving" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined prep_time" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for prep_time" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined cook_time" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for cook_time" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined rating" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for rating" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No recipe found to update" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYzNTkxNDcsImV4cCI6MTY3NjQ0NTU0N30.Lzp_76Mlno1JLUGtlxlGHhyVr1gKAYwl8iXJ4T3auas" -b "cookies.txt" -d @recipe_update.json http://localhost:5000/recipes/22

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Recipe successfully updated"}
> ```
</details>

<br>

#### Delete

<details>
 <summary><code>DELETE</code> <code><b>/recipes/:id/categories</b></code> <code>Remove all categories from a recipe</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | None  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"Categories have been removed from the recipe successfully"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "The recipe has no categories to remove" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYzNTkxNDcsImV4cCI6MTY3NjQ0NTU0N30.Lzp_76Mlno1JLUGtlxlGHhyVr1gKAYwl8iXJ4T3auas" -b "cookies.txt" http://localhost:5000/recipes/22/categories

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Categories have been removed from the recipe successfully"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/recipes/:id/steps</b></code> <code>Remove all steps from a recipe</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | None  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"Steps successfully removed from recipe"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "The recipe has no steps to remove" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYzNTkxNDcsImV4cCI6MTY3NjQ0NTU0N30.Lzp_76Mlno1JLUGtlxlGHhyVr1gKAYwl8iXJ4T3auas" -b "cookies.txt" http://localhost:5000/recipes/22/steps

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Steps successfully removed from recipe"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/recipes/:id/ingredients</b></code> <code>Remove all ingredients from a recipe</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | None  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"All ingredients have been removed from the recipe"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "The recipe has no ingredients to remove" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYzNTkxNDcsImV4cCI6MTY3NjQ0NTU0N30.Lzp_76Mlno1JLUGtlxlGHhyVr1gKAYwl8iXJ4T3auas" -b "cookies.txt" http://localhost:5000/recipes/22/ingredients

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All ingredients have been removed from the recipe"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/recipes/:id</b></code> <code>Remove a recipe from the application</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | None  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"Recipe successfully removed"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No recipe found to be removed" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYzNTkxNDcsImV4cCI6MTY3NjQ0NTU0N30.Lzp_76Mlno1JLUGtlxlGHhyVr1gKAYwl8iXJ4T3auas" -b "cookies.txt" http://localhost:5000/recipes/22

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Recipe successfully removed"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/recipes</b></code> <code>Remove all recipes from the application</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the recipe we are interested in  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | None  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"All recipes removed successfully"}`  |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No recipes found to be removed" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYzNTkxNDcsImV4cCI6MTY3NjQ0NTU0N30.Lzp_76Mlno1JLUGtlxlGHhyVr1gKAYwl8iXJ4T3auas" -b "cookies.txt" http://localhost:5000/recipes

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All recipes removed successfully"}
> ```
</details>

<br>