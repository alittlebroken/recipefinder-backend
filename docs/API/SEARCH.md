# SEARCH

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

<br>

## Protected Routes

#### Create

<details>
 <summary><code>POST</code> <code><b>/search</b></code> <code>Search for a recipe. ingredient or category within the application</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Query String
> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | page      |  optional | number   | defaults to 0 if not specified  |
> | pageSize  |  optional | number   | defaults to 10 if not specified  |


##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | terms  |  required | string   | The term to search for  |
> | typeOfSearch | required | string | Are we searching for a recipe ( default ), ingredient or category  |
> | categories | optional | strong | The category to search for |


##### Payload example
> ```json
> {
>   "terms": "eggs",
>   "typeOfSearch": "ingredients",
>   "categories": ""
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"","results":[{"id":XX,"userId":XX,"name":"XXXXX","description":XXXXX,"servings":XX,"calories_per_serving":XX,"prep_time":XX,"cook_time":XX,"rating":XX,"ingredients":[{"id":XX,"name":"XXXXX","amount":XX,"amount_type":"XXXXX"},{"id":XX,"name":"XXXXX","amount":XX,"amount_type":"XXXXX"}],"steps":[],"categories":[],"cookbooks":[]}]}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for search terms", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined search type", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for search type", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for search categories", "results": [] }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No matching recipes found by name", "results": [] }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No recipes found using the supplied ingredients", "results": [] }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No recipes found for the supplied category", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY0NTEwMTEsImV4cCI6MTY3NjUzNzQxMX0.hdx1mKCqnqsMT5RNVHpyFrij0c35Fc8opSCy4T-osnU" -b "cookies.txt" -d @user.json http://localhost:5000/users
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"","results":[{"id":24,"userId":56,"name":"Egg and cheese omellete","description":null,"servings":1,"calories_per_serving":234,"prep_time":5,"cook_time":3,"rating":1,"ingredients":[{"id":20,"name":"eggs","amount":1,"amount_type":"Large"},{"id":23,"name":"cheese","amount":50,"amount_type":"grams"}],"steps":[],"categories":[],"cookbooks":[]}]}
> ```
</details>

<br>