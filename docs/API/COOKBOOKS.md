# Cookbooks

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

<br>

## Protected Routes

#### Create

<details>
 <summary><code>POST</code> <code><b>/cookbooks</b></code> <code>Create a new cookbook</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | userId      |  required | Number   | Who the cookbook belongs to  |
> | name      |  required | String   | The name you would like the cookbook to have  |
> | description      |  required | String   | Add more detail for the cookbook  |

##### Payload example
> ```json
> {
>    "userId": 15,
>    "name": "Dairy Free Meals",
>    "description": "A collection of dairy free meals to suit anybody's tastes"
>  }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"success":true,"message":"Cookbook successfully added"}` |
> | `400`         | `application/json`        | `{"status":"400", "success": "false", "message": "Undefined userId"}` <br> `{"status":"400", "success": "false", "message": "Wrong format for userId"}` <br> `{"status":"400", "success": "false", "message": "Undefined name"}` <br> `{"status":"400", "success": "false", "message": "Wrong fromat for name"}` <br> `{"status":"400", "success": "false", "message": "Undefined description"}` <br> `{"status":"400", "success": "false", "message": "Wrong format for description"}` <br>|
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURLs

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" --data @cookbooks.json http://localhost:5000/cookbooks
> ```

##### Example Response Package
> ```json
> {"success":true,"message":"Cookbook successfully added"}
> ```
</details>

<br>

<details>
 <summary><code>POST</code> <code><b>/cookbooks/:id/recipes</b></code> <code>Adds a recipe to a cookbook</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The identifier of the cookbook the recipe is being added to  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | recipeId    | required | Number | The identifier of the recipe being added |

##### Payload example
> ```json
> {
>    "cookbookId": 15,
>    "recipeId": 4
>  }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"success":true,"message":"Recipe added to cookbook successfully"}` |
> | `400`         | `application/json`        | `{"status":"400", "success": "false", "message": "Undefined id"}` <br> `{"status":"400", "success": "false", "message": "Undefined recipeId"}` <br> `{"status":"400", "success": "false", "message": "Wrong format for recipeId"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURLs

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" --data @cookbook_recipes.json http://localhost:5000/cookbooks/5/recipe
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Recipe added to cookbook successfully"}
> ```
</details>

<br>

<details>
 <summary><code>POST</code> <code><b>/cookbooks/:id/category</b></code> <code>Adds a category to a cookbook</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description  |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The identifier of the cookbook the recipe is being added to  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | categoryId    | required | Number | The identifier of the category being added |

##### Payload example
> ```json
> {
>    "cookbookId": 15,
>    "categoryId": 4
>  }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"success":true,"message":"Category successfully added to cookbook"}` |
> | `400`         | `application/json`        | `{"status":"400", "success": "false", "message": "Undefined id"}` <br> `{"status":"400", "success": "false", "message": "Undefined categoryId"}` <br> `{"status":"400", "success": "false", "message": "Wrong format for categoryId"}` |
> | `404`         | `application/json`         | `{"status":"404", "success": "false", "message": "No data found matching supplied values"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURLs

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" --data @cookbook_categories.json http://localhost:5000/cookbooks/5/category
> ```

##### Example Response Package
> ```json
> {"success":true,"message":"Category successfully added to cookbook"}
> ```
</details>

<br>

#### Read

<details>
 <summary><code>GET</code> <code><b>/cookbooks</b></code> <code>Returns a list of all cookbooks</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  Admin         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | Sends back the found records |
> | `404`         | `application/json`        | `{"status":"404", "success": "false", "message": "There were no cookbooks to find"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" http://localhost:5000/cookbooks
> ```

##### Example Response Package
> ```json
> [{"id":5,"userId":34,"name":"Dairy Free Recipes","description":"A small collection of dairy free recipes I have made","image":null,"created_at":"2023-02-10T09:20:18.343Z","updated_at":"2023-02-10T09:20:18.343Z"}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/cookbooks/:id</b></code> <code>Returns a particular cookbook</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  Admin         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The identifier of the cookbook we wish to retrieve  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | Sends back the found records |
> | `400`         | `application/json`        | `{"status":"400", "success": "false", "message": "Undefined id"}` |
> | `404`         | `application/json`        | `{"status":"404", "success": "false", "message": "No matching cookbook found"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" http://localhost:5000/cookbooks/5
> ```

##### Example Response Package
> ```json
> [{"id":5,"userId":34,"name":"Dairy Free Recipes","description":"A small collection of dairy free recipes I have made","image":null,"created_at":"2023-02-10T09:20:18.343Z","updated_at":"2023-02-10T09:20:18.343Z"}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/cookbooks/:id/recipes</b></code> <code>Returns all recipes a cookbook has</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  Admin         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The identifier of the cookbook we wish to retrieve  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | Sends back the found records |
> | `400`         | `application/json`        | `{"status":"400", "success": "false", "message": "Undefined id"}` |
> | `404`         | `application/json`        | `{"status":"404", "success": "false", "message": "The cookbook currently has no recipes"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" http://localhost:5000/cookbooks/5/recipes
> ```

##### Example Response Package
> ```json
> [{"id":18,"name":"Spicy cheese on toast","rating":1,"categories":[{"name":"Lunches","categoryId":14,"recipeId":18}]}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/cookbooks/:id/category</b></code> <code>Returns all categories a cookbook belongs to</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  Admin         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The identifier of the cookbook we wish to retrieve  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | Sends back the found records |
> | `400`         | `application/json`        | `{"status":"400", "success": "false", "message": "Undefined id"}` |
> | `404`         | `application/json`        | `{"status":"404", "success": "false", "message": "The cookbook currently has no categories"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" http://localhost:5000/cookbooks/5/category
> ```

##### Example Response Package
> ```json
> [{"id":2,"categoryName":"Vegan","categoryId":22}]
> ```
</details>

<br>

#### Update

<details>
 <summary><code>PUT</code> <code><b>/cookbooks/:id</b></code> <code>Update details of a cookbook</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None        |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The identifier of the cookbook to update  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | userId    |  required | Number   | Identifier of wh the cookbook belongs to  |
> | name      | required  | String   | Sets the new name of the cookbook |
> | description | required | String | Sets a more detailed note of what the cookbook contains |


##### Payload example
> ```json
> {
>  "userId": 1,
>  "name": "Sweet treats",
>  "description": "A collection of healthy treats for all the family"   
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"200", "success": "true", "message": "Cookbook successfully updated" }` |
> | `400`         | `application/json`        | `{"status":"404", "success": "false", "message": "Undefined id"}` <br> `{"status":"404", "success": "false", "message": "Undefined userId"}` <br>  `{"status":"404", "success": "false", "message": "Wrong userId format"}` <br>  `{"status":"404", "success": "false", "message": "Undefined name"}` <br> `{"status":"404", "success": "false", "message": "Wrong name format"}` <br> `{"status":"404", "success": "false", "message": "Undefined description"}` <br> <br> `{"status":"404", "success": "false", "message": "Wrong description format"}` <br>|
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" --data @cookbooks_upd.json http://localhost:5000/cookbooks/5

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Cookbook successfully updated"}
> ```
</details>

<br>

#### Delete

<details>
 <summary><code>DELETE</code> <code><b>/cookbooks</b></code> <code>Remove all cookbooks</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  Admin        |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |


##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"200", "success": "true", "message": "All cookbooks removed successfully" }` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" http://localhost:5000/cookbooks

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All cookbooks removed successfully"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/cookbooks/:id</b></code> <code>Remove a particular cookbook</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None        |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The identifier of the cookbook to be removed  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |


##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":"200", "success": "true", "message": "All cookbooks removed successfully" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" http://localhost:5000/cookbooks/7

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Cookbook successfully removed"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/cookbooks/:id/recipes</b></code> <code>Remove all recipes associated with a cookbook</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None        |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The identifier of the cookbook  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |


##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":"200", "success": "true", "message": "All cookbooks removed successfully" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"400", "success": "false", "message": "No matching records found" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" http://localhost:5000/cookbooks/7/recipes

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Cookbook recipes removed successfully"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/cookbooks/:id/categories</b></code> <code>Remove all categories associated with a cookbook</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None        |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The identifier of the cookbook  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |


##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":"200", "success": "true", "message": "All categories for specified cookbook removed successfully" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"400", "success": "false", "message": "No categories found to be removed" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYwMTg4MTYsImV4cCI6MTY3NjEwNTIxNn0.q1BlYFykEC5Ipy1219jaS_dD8jEUZS2gMeUkXPgLEHo" -b "cookies.txt" http://localhost:5000/cookbooks/7/categories

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All categories for specified cookbook removed successfully"}
> ```
</details>

<br>