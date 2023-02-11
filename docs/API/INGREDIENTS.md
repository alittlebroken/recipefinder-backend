# Categories

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

<br>

## Protected Routes

#### Create

<details>
 <summary><code>POST</code> <code><b>/ingredients</b></code> <code>Add a new ingredient</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | Name      |  required | String   | The ingredients name  |


##### Payload example
> ```json
> {
>   "name": "Cheese"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns the id of the newly created ingredient  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined body parameter" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined name" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong name format" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Empty name" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" -d @ingredients.json http://localhost:5000/ingredients

##### Example Response Package
> ```json
> [{"id":14}]
> ```
</details>

<br>

#### Read

<details>
 <summary><code>GET</code> <code><b>/ingredients</b></code> <code>Return a list of all ingredients</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  Admin | object (JSON or YAML)   | N/A  |


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
> | `200`         | `application/json`  | Returns all the ingredients stored in the DB  |
> | `404`         | `application/json`  | [] |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" http://localhost:5000/ingredients

##### Example Response Package
> ```json
> [{"id":1,"name":"bread","created_at":"2023-02-03T16:02:13.395Z","updated_at":"2023-02-03T16:02:13.395Z"},{"id":4,"name":"baked beans","created_at":"2023-02-04T21:39:52.883Z","updated_at":"2023-02-04T21:39:52.883Z"},{"id":5,"name":"cheese","created_at":"2023-02-04T21:40:13.300Z","updated_at":"2023-02-04T21:40:13.300Z"},{"id":6,"name":"salt","created_at":"2023-02-05T07:56:03.208Z","updated_at":"2023-02-05T07:56:03.208Z"},{"id":7,"name":"Pepper","created_at":"2023-02-05T07:56:08.544Z","updated_at":"2023-02-05T07:56:08.544Z"},{"id":8,"name":"milk","created_at":"2023-02-05T07:56:20.581Z","updated_at":"2023-02-05T07:56:20.581Z"},{"id":9,"name":"flour","created_at":"2023-02-05T07:56:26.289Z","updated_at":"2023-02-05T07:56:26.289Z"},{"id":10,"name":"eggs","created_at":"2023-02-05T07:56:32.413Z","updated_at":"2023-02-05T07:56:32.413Z"},{"id":11,"name":"porridge oats","created_at":"2023-02-05T07:56:45.540Z","updated_at":"2023-02-05T07:56:45.540Z"},{"id":12,"name":"Spring Onions","created_at":"2023-02-07T15:00:47.708Z","updated_at":"2023-02-07T15:00:47.708Z"},{"id":13,"name":"Jalepenos","created_at":"2023-02-07T15:01:02.624Z","updated_at":"2023-02-07T15:01:02.624Z"},{"id":14,"name":"Onions","created_at":"2023-02-11T13:33:51.407Z","updated_at":"2023-02-11T13:33:51.407Z"},{"id":15,"name":"Bread","created_at":"2023-02-11T13:37:04.511Z","updated_at":"2023-02-11T13:37:04.511Z"},{"id":16,"name":"Milk","created_at":"2023-02-11T13:37:10.876Z","updated_at":"2023-02-11T13:37:10.876Z"},{"id":17,"name":"Water","created_at":"2023-02-11T13:37:16.702Z","updated_at":"2023-02-11T13:37:16.702Z"},{"id":18,"name":"Eggs","created_at":"2023-02-11T13:37:22.361Z","updated_at":"2023-02-11T13:37:22.361Z"},{"id":19,"name":"Flour","created_at":"2023-02-11T13:37:28.386Z","updated_at":"2023-02-11T13:37:28.386Z"}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/ingredients/:id</b></code> <code>Returns the specified ingredient</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | object (JSON or YAML)   | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the ingredient being selected  |

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
> | `200`         | `application/json`  | Returns the selected ingredient  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters"}` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id"}` |
> | `404`         | `application/json`  | [] |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" http://localhost:5000/ingredients/8

##### Example Response Package
> ```json
> [{"id":8,"name":"milk","created_at":"2023-02-05T07:56:20.581Z","updated_at":"2023-02-05T07:56:20.581Z"}]
> ```
</details>

<br>

#### Updated

<details>
 <summary><code>PUT</code> <code><b>/ingredients/:id</b></code> <code>Updates an ingredient with new details</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | object (JSON or YAML)   | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the ingredient being selected  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | Name      |  required | String   | The updated name of the ingredient  |


##### Payload example
> ```json
> {
>   "name": "milk"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"success":true,"message":"Ingredient successfully updated"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters"}` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id"}` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body"}` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined name"}` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" -d @ingredients.json http://localhost:5000/ingredients/8

##### Example Response Package
> ```json
> {"success":true,"message":"Ingredient successfully updated"}
> ```
</details>

<br>

#### Delete

<details>
 <summary><code>DELETE</code> <code><b>/ingredients</b></code> <code>Removes all ingredients</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  Admin | object (JSON or YAML)   | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | object (JSON or YAML)   | N/A  |

##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `"status":200,"success":true,"message":"All ingredients removed successfully","count": [<List of records deleted>]}`  |
> | `404`         | `application/json`  | `{ "count": 0}` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" http://localhost:5000/ingredients

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All ingredients removed successfully","count":[{"id":1,"name":"bread","created_at":"2023-02-03T16:02:13.395Z","updated_at":"2023-02-03T16:02:13.395Z"},{"id":4,"name":"baked beans","created_at":"2023-02-04T21:39:52.883Z","updated_at":"2023-02-04T21:39:52.883Z"},{"id":5,"name":"cheese","created_at":"2023-02-04T21:40:13.300Z","updated_at":"2023-02-04T21:40:13.300Z"},{"id":6,"name":"salt","created_at":"2023-02-05T07:56:03.208Z","updated_at":"2023-02-05T07:56:03.208Z"},{"id":7,"name":"Pepper","created_at":"2023-02-05T07:56:08.544Z","updated_at":"2023-02-05T07:56:08.544Z"},{"id":9,"name":"flour","created_at":"2023-02-05T07:56:26.289Z","updated_at":"2023-02-05T07:56:26.289Z"},{"id":10,"name":"eggs","created_at":"2023-02-05T07:56:32.413Z","updated_at":"2023-02-05T07:56:32.413Z"},{"id":11,"name":"porridge oats","created_at":"2023-02-05T07:56:45.540Z","updated_at":"2023-02-05T07:56:45.540Z"},{"id":13,"name":"Jalepenos","created_at":"2023-02-07T15:01:02.624Z","updated_at":"2023-02-07T15:01:02.624Z"},{"id":14,"name":"Onions","created_at":"2023-02-11T13:33:51.407Z","updated_at":"2023-02-11T13:33:51.407Z"},{"id":15,"name":"Bread","created_at":"2023-02-11T13:37:04.511Z","updated_at":"2023-02-11T13:37:04.511Z"},{"id":16,"name":"Milk","created_at":"2023-02-11T13:37:10.876Z","updated_at":"2023-02-11T13:37:10.876Z"},{"id":17,"name":"Water","created_at":"2023-02-11T13:37:16.702Z","updated_at":"2023-02-11T13:37:16.702Z"},{"id":18,"name":"Eggs","created_at":"2023-02-11T13:37:22.361Z","updated_at":"2023-02-11T13:37:22.361Z"},{"id":19,"name":"Flour","created_at":"2023-02-11T13:37:28.386Z","updated_at":"2023-02-11T13:37:28.386Z"},{"id":8,"name":"milk","created_at":"2023-02-05T07:56:20.581Z","updated_at":"2023-02-05T07:56:20.581Z"}]}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/ingredients/:id</b></code> <code>Remove a particular ingredient</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | object (JSON or YAML)   | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  Required | Number   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | object (JSON or YAML)   | N/A  |

##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"Ingredient successfully removed"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters"}` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id"}` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzYxMjIyNjQsImV4cCI6MTY3NjIwODY2NH0.0JfJb4TxpRPjltut9PSAZP-eX1qFYHBiWMsiVj8s2Tw" -b "cookies.txt" http://localhost:5000/ingredients/12

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Ingredient successfully removed"}
> ```
</details>

<br>