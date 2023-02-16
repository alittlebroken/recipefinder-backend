# PANTRIES

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

<br>

## Protected Routes

#### Create

<details>
 <summary><code>POST</code> <code><b>/pantries</b></code> <code>Add a new pantry</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  Admin | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | userId      |  required | number   | The unique identifier of the user the pantry belongs to  |


##### Payload example
> ```json
> {
>    "userId": 1
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status": 200, "success": true, "message": "Pantry successfully created"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "The specified user already has a pantry" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" -d @pantry.json http://localhost:5000/pantries

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Pantry successfully created"}
> ```
</details>

<br>

<details>
 <summary><code>POST</code> <code><b>/pantries/:pantryId</b></code> <code>Add a new ingredient to the pantry</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | pantryId      |  required | Number   | The unique pantry identifier the ingredient wil be added to  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | ingredientId |  required | number   | The unique identifier of the ingredient being added  |
> | amount | required | number | A number representing the amount of this ingredient being added to the pantry |
> | amount_type | required | string | The measurement type for the amount I.E. grams or pints |


##### Payload example
> ```json
> {
>    "ingredientId": 1,
>    "amount": 10,
>    "amount_type": "large"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status": 200, "success": true, "message": "Ingredient successfully added to pantry"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined pantryId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong request body format" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined ingredientId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined amount" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined amount_type" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" -d @pantry.json http://localhost:5000/pantries/15

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Ingredient successfully added to pantry"}
> ```
</details>

<br>

#### Read

<details>
 <summary><code>GET</code> <code><b>/pantries</b></code> <code>Returns a list of all pantries</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  Admin | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | N/A   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | N/A   | N/A  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns a list of all pantries in the system  |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "There are no pantries to list" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" http://localhost:5000/pantries

##### Example Response Package
> ```json
> [{"id":15,"userId":53,"username":"bobby@testmailer.com","numIngredients":"1"},{"id":17,"userId":54,"username":"test","numIngredients":"0"}]
> ```
</details>

<br>


<details>
 <summary><code>GET</code> <code><b>/pantries/:id</b></code> <code>Returns a particular pantry and any ingredients it may have</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the pantry to fetch  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | N/A   | N/A  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns a list of all pantries in the system  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined pantryId" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No pantry matched the supplied id" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" http://localhost:5000/pantries/15

##### Example Response Package
> ```json
> [{"pantryId":15,"username":"bobby@testmailer.com","numIngredients":1,"ingredients":[{"id":5,"ingredientId":20,"name":"eggs","amount":6,"amount_type":"large"}]}]
> ```
</details>

<br>

#### Update

<details>
 <summary><code>PUT</code> <code><b>/pantries/:id</b></code> <code>Updates an ingredient in the selected pantry</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the pantry to add an ingredient to  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier for the relationship between panty and ingredient being updated  |
> | pantryId | required | Number | The pantry the ingredient belongs to |
> | ingredientId | required | Number | The ingredient associated with this record |
> | amount | required | Number | The amount we have of this igredient |
> | amount_type | required | Number | The type for the amount I.E. grams or pints |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"Record successfully updated"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined pantryId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined ingredientId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined amount" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined amount_type" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "There was no pantry to update" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" -d @pantry_upd.json http://localhost:5000/pantries/15

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Record successfully updated"}
> ```
</details>

<br>

#### Delete

<details>
 <summary><code>DELETE</code> <code><b>/pantries</b></code> <code>Remove all pantries</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  Admin | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | None   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | None   | N/A  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"All pantries successfully removed"}`  |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No pantries found to remove" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyNzExNTAsImV4cCI6MTY3NjM1NzU1MH0.Q4_y2HIryIaigzurY0sg4I5J8bctUky1NPhESSvO8xs" -b "cookies.txt" http://localhost:5000/pantries

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All pantries successfully removed"}
> ```
</details>

<br>


<details>
 <summary><code>DELETE</code> <code><b>/pantries/:id</b></code> <code>Remove all ingredients from a pantry</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the pantry to remove ingredients from  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | None   | N/A  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"All ingredients removed from the pantry"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined pantryId" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "There are no ingredients to remove from the pantry" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYyNzExNTAsImV4cCI6MTY3NjM1NzU1MH0.Q4_y2HIryIaigzurY0sg4I5J8bctUky1NPhESSvO8xs" -b "cookies.txt" http://localhost:5000/pantries/5

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All ingredients removed from the pantry"}
> ```
</details>

<br>