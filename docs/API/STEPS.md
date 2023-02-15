# STEPS

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

<br>

## Protected Routes

#### Create

<details>
 <summary><code>POST</code> <code><b>/steps</b></code> <code>Add a step to a recipe</code></summary>

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
> | recipeId  |  required | number   | The unique identifier of the recipe the step belongs to  |
> | stepNo | required | number | The number of the step |
> | content | required | number | Detailed instructions for this particular step |


##### Payload example
> ```json
> {
>   "recipeId": 1,
>   "stepNo": 7,
>   "content": "Finely chop the onions"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"success":true,"message":"Step successfully created"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined recipeId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined stepNo" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined content" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY0NTEwMTEsImV4cCI6MTY3NjUzNzQxMX0.hdx1mKCqnqsMT5RNVHpyFrij0c35Fc8opSCy4T-osnU" -b "cookies.txt" -d @step.json http://localhost:5000/steps

##### Example Response Package
> ```json
> {"success":true,"message":"Step successfully created"}
> ```
</details>

<br>

#### Read

<details>
 <summary><code>GET</code> <code><b>/steps</b></code> <code>List all steps in the application</code></summary>

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
> | None      |  required | object (JSON or YAML)   | N/A  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns a list of all steps  |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No steps were found" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY0NTEwMTEsImV4cCI6MTY3NjUzNzQxMX0.hdx1mKCqnqsMT5RNVHpyFrij0c35Fc8opSCy4T-osnU" -b "cookies.txt" http://localhost:5000/steps

##### Example Response Package
> ```json
> [{"id":75,"recipeId":23,"stepNo":1,"content":"Crack the egg into the bowl and whisk with a fork until mixed together","created_at":"2023-02-15T10:15:20.405Z","updated_at":"2023-02-15T10:15:20.405Z"}]
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/steps/:id</b></code> <code>List a particular step</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the step  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |


##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | Returns an object containing the required step  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameter" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined id" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No steps were found" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY0NTEwMTEsImV4cCI6MTY3NjUzNzQxMX0.hdx1mKCqnqsMT5RNVHpyFrij0c35Fc8opSCy4T-osnU" -b "cookies.txt" http://localhost:5000/steps/75

##### Example Response Package
> ```json
> {"id":75,"recipeId":23,"stepNo":1,"content":"Crack the egg into the bowl and whisk with a fork until mixed together","created_at":"2023-02-15T10:15:20.405Z","updated_at":"2023-02-15T10:15:20.405Z"}
> ```
</details>

<br>

#### Update

<details>
 <summary><code>PUT</code> <code><b>/steps/:id</b></code> <code>Update a particular step</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the step  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | recipeId  |  required | Number   | The unique identifier of the recipe whose step is being updated  |
> | stepNo | required | Number | The order within the steps this step should be |
> | content | required | string | The details for the step |


##### Payload example
> ```json
> {
>    "recipeId": 1,
>    "stepNo": 1,
>    "content": "Bring the pan to a boil and place in the rice"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"Step successfully updated"}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameter" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined stepId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request body" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined recipeId" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined stepNo" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined content" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No steps found to update" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY0NTEwMTEsImV4cCI6MTY3NjUzNzQxMX0.hdx1mKCqnqsMT5RNVHpyFrij0c35Fc8opSCy4T-osnU" -b "cookies.txt" -d @step_update.json http://localhost:5000/steps/75

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Step successfully updated"}
> ```
</details>

<br>

#### Delete

<details>
 <summary><code>DELETE</code> <code><b>/steps/:id</b></code> <code>Remove a particular step</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | Number   | The unique identifier of the step to remove  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None  |  None | None   | None  |



##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"success":true,"message":"Specified step removed successfully","count":1}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined request parameters" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined stepId" }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "There are no steps to remove" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY0NTEwMTEsImV4cCI6MTY3NjUzNzQxMX0.hdx1mKCqnqsMT5RNVHpyFrij0c35Fc8opSCy4T-osnU" -b "cookies.txt" http://localhost:5000/steps/75

##### Example Response Package
> ```json
> {"success":true,"message":"Specified step removed successfully","count":1}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/steps</b></code> <code>Remove all steps in the application</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  Admin | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  None | None   | None  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None  |  None | None   | None  |



##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"Successfully removed X steps"}`  |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "There are no steps to remove" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY0NTEwMTEsImV4cCI6MTY3NjUzNzQxMX0.hdx1mKCqnqsMT5RNVHpyFrij0c35Fc8opSCy4T-osnU" -b "cookies.txt" http://localhost:5000/steps

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Successfully removed 2 steps"}
> ```
</details>

<br>