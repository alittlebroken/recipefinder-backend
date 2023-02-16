# Categories

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

<br>

## Protected Routes

#### List

<details>
 <summary><code>GET</code> <code><b>/categories</b></code> <code>Returns a list of all categories stored</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes       |  None         |  N/A  |


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
> | `200`         | `application/json`        | Object containing array of results                                |
> | `404`         | `application/json`                | `{"status":"404", "success": "false", "message": "There are no categories to return"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}`                                                                |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1Mywicm9sZXMiOiJDdXN0b21lciJ9LCJpYXQiOjE2NzU5NTMyMTcsImV4cCI6MTY3NjAzOTYxN30.e9eWJ31oJAFguo6h-9YMj6fLbDM3xHkM2L_55lsfgCw" -b "cookies.txt" http://localhost:5000/categories
> ```

##### Example Response Package
> ```json
> [{"id":1,"name":"Breakfast","created_at":"2023-02-03T15:26:59.419Z","updated_at":"2023-02-03T15:26:59.419Z"},{"id":2,"name":"Lunch","created_at":"2023-02-03T15:27:04.806Z","updated_at":"2023-02-03T15:27:04.806Z"},{"id":3,"name":"Dinner","created_at":"2023-02-03T15:27:09.835Z","updated_at":"2023-02-03T15:27:09.835Z"},{"id":4,"name":"Snack","created_at":"2023-02-03T15:27:15.062Z","updated_at":"2023-02-03T15:27:15.062Z"},{"id":5,"name":"Drink","created_at":"2023-02-03T15:27:21.465Z","updated_at":"2023-02-03T15:27:21.465Z"},{"id":6,"name":"Vegan","created_at":"2023-02-03T15:27:26.041Z","updated_at":"2023-02-03T15:27:26.041Z"},{"id":7,"name":"Vegetarian","created_at":"2023-02-03T15:27:31.658Z","updated_at":"2023-02-03T15:27:31.658Z"},{"id":9,"name":"Sweets","created_at":"2023-02-03T15:27:45.636Z","updated_at":"2023-02-03T15:27:45.636Z"},{"id":8,"name":"Dairy Free","created_at":"2023-02-03T15:27:39.853Z","updated_at":"2023-02-03T15:27:39.853Z"}]
> ```
</details>

<br>

#### Create

<details>
 <summary><code>POST</code> <code><b>/categories</b></code> <code>Add a new category</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes       |  None         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  required | string   | The name of the category you wish to create  |


##### Payload example
> ```json
> { "name": "Wheat Free" }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "status": "200", "success": "true", "message": "Category successfully added"}` |
> | `400`         | `application/json`                | `{"status":"400", "success": "false", "message": "Undefined category name"}` <br> `{"status":"400", "success": "false", "message": "Wrong format for category name"}`|
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}`                                                                |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1Mywicm9sZXMiOiJDdXN0b21lciJ9LCJpYXQiOjE2NzU5NTMyMTcsImV4cCI6MTY3NjAzOTYxN30.e9eWJ31oJAFguo6h-9YMj6fLbDM3xHkM2L_55lsfgCw" -b "cookies.txt" -d @categories.json http://localhost:5000/categories
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Category successfully added"}
> ```
</details>

<br>

#### Update

<details>
 <summary><code>PUT</code> <code><b>/categories/:id</b></code> <code>Update a category</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes       |  None         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | Number   | Identifier of the category you wish to update  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | name      |  required | string   | The updated name to set the category to  |


##### Payload example
> ```json
> { "name": "Wheat free" }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "status": "200", "success": "true", "message": "Category successfully updated"}` |
> | `400`         | `application/json`                | `{"status":"400", "success": "false", "message": "Undefined category id"}` <br> `{"status":"400", "success": "false", "message": "Undefined category name"}` <br> `{"status":"400", "success": "false", "message": "Wrong format for category name"}`|
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}`                                                                |

##### Example cURL

> ```javascript
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1Mywicm9sZXMiOiJDdXN0b21lciJ9LCJpYXQiOjE2NzU5NTMyMTcsImV4cCI6MTY3NjAzOTYxN30.e9eWJ31oJAFguo6h-9YMj6fLbDM3xHkM2L_55lsfgCw" -b "cookies.txt" -d @categories.json http://localhost:5000/categories/10
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Category successfully updated"}
> ```
</details>

<br>

#### Delete

<details>
 <summary><code>DELETE</code> <code><b>/categories</b></code> <code>Remove all categories</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes       |  Admin         |  N/A  |


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
> | `200`         | `application/json`        | `{ "status": "200", "success": "true", "message": "All categories removed successfully"}` |
> | `404`         | `application/json`                | `{"status":"400", "success": "false", "message": "There are no categories to remove"}`|
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}`                                                                |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzU5NjMwNzUsImV4cCI6MTY3NjA0OTQ3NX0.BL6BRUPtCub_QVhsI-a5fnJbC23CfemNR3aLUxIPJHg" -b "cookies.txt" http://localhost:5000/categories
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All categories removed successfully"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/categories/:id</b></code> <code>Remove an individual category</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes       |  None         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id        |  required | Number   | Identifier of the category you wish to remove  |

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
> | `200`         | `application/json`        | `{ "status": "200", "success": "true", "message": "Category successfully removed"}` |
> | `400`         | `application/json`                | `{"status":"400", "success": "false", "message": "Undefined category id"}`|
> | `404`         | `application/json`                | `{"status":"404", "success": "false", "message": "No matching category found to be removed"}`|
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}`                                                                |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzU5NjMwNzUsImV4cCI6MTY3NjA0OTQ3NX0.BL6BRUPtCub_QVhsI-a5fnJbC23CfemNR3aLUxIPJHg" -b "cookies.txt" http://localhost:5000/categories/11
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Category successfully removed"}
> ```
</details>

<br>