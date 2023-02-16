# USERS

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

<br>

## Protected Routes

#### Create

<details>
 <summary><code>POST</code> <code><b>/users</b></code> <code>Creates a new user</code></summary>

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
> | username  |  required | string   | The desired username  |
> | email | required | string | The email address of the user - this is actually used to authenticate a user along with the password |
> | password | required | strong | Unencrypted password for the new user |


##### Payload example
> ```json
> {
>   "username": "agarfield@spider.net",
>   "email": "agarfield@spider.net",
>   "password": "W1thGr34tP0w3r"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"","results":[{"id":XX,"username":"XXXXXX","email":"XXXXX","roles":"XXXXX"}]}`  |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined username" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for username" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined email" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for email" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined password" }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for password" }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY0NTEwMTEsImV4cCI6MTY3NjUzNzQxMX0.hdx1mKCqnqsMT5RNVHpyFrij0c35Fc8opSCy4T-osnU" -b "cookies.txt" -d @user.json http://localhost:5000/users
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"","results":[{"id":55,"username":"agarfield","email":"agarfield@spider.net","roles":"Customer"}]}
> ```
</details>

<br>

#### Read

<details>
 <summary><code>GET</code> <code><b>/users</b></code> <code>List all the users</code></summary>

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"","results":[{"id":XX,"username":"XXXXXX","email":"XXXXX","roles":"XXXXX", "forename": "XXXXX", "surname": "XXXXX"}]}`|
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "There currently no users in the system", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"","results":[{"id":34,"username":"admin@localhost","email":"admin@localhost","roles":"Admin","forename":null,"surname":null},{"id":35,"username":"customer@localhost","email":"customer@localhost","roles":"Customer","forename":null,"surname":null},{"id":43,"username":"paul@lockyer.com","email":"paul@lockyer.com","roles":"Customer","forename":null,"surname":null},{"id":53,"username":"bobby@testmailer.com","email":"bobby@testmailer.com","roles":"Customer","forename":null,"surname":null},{"id":54,"username":"test","email":"test","roles":"Customer","forename":null,"surname":null},{"id":55,"username":"agarfield","email":"agarfield@spider.net","roles":"Customer","forename":null,"surname":null}]}
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/users/:id</b></code> <code>List a particular user</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user you wish to retrieve  |

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"","results":[{"id": XX,"username":"XXXXX@XXXXX","email":"XXXXX@XXXXX","roles":"XXXXX","forename":XXXXX,"surname":XXXXX}]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No user found matching that id", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users/35
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"","results":[{"id":35,"username":"customer@localhost","email":"customer@localhost","roles":"Customer","forename":null,"surname":null}]}
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/users/:id/recipes</b></code> <code>List a particular users recipes</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user  |

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"","results":[{"id":XX,"userId":XX,"name":"XXXXX","description":null,"servings":X,"calories_per_serving":XXX,"prep_time":X,"cook_time":XX,"rating":X,"created_at":"XXXXXX","updated_at":"XXXXXX"}]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "The user currently has no recipes", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users/34/recipes
> ```

##### Example Response Package
> ```json
>{"status":200,"success":true,"message":"","results":[{"id":23,"userId":34,"name":"Cheese Omellette","description":null,"servings":1,"calories_per_serving":200,"prep_time":5,"cook_time":10,"rating":1,"created_at":"2023-02-15T10:13:40.515Z","updated_at":"2023-02-15T10:13:40.515Z"}]}
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/users/:id/cookbooks</b></code> <code>List a particular users cookbooks</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user you wish to retrieve  |

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"","results":[{"id":X,"userId":XX,"name":"XXXXX","description":"XXXXX","image":null,"created_at":"XXXXX","updated_at":"XXXXX"}]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "The user currently has no cookbooks", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users/34/cookbooks
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"","results":[{"id":8,"userId":34,"name":"Dairy Free Recipes","description":"A small collection of dairy free recipes I have made","image":null,"created_at":"2023-02-10T14:29:17.540Z","updated_at":"2023-02-10T14:29:17.540Z"}]}
> ```
</details>

<br>

<details>
 <summary><code>GET</code> <code><b>/users/:id/pantry</b></code> <code>List a particular users pantry</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user you wish to retrieve  |

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"","results":[{"id":X,"pantryId":XX,"ingredientId":XX,"ingredientName":"XXXXX","amount":XX,"amount_type":"XXXXX"}]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "The user currently has no pantry ingredients", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
>  curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users/53/pantry
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"","results":[{"id":5,"pantryId":15,"ingredientId":20,"ingredientName":"eggs","amount":12,"amount_type":"medium"}]}
> ```
</details>

<br>

#### Update

<details>
 <summary><code>PUT</code> <code><b>/users/:id</b></code> <code>Update a user</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user you wish to retrieve  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | username  |  required | string   | The users name  |
> | email     |  required | string   | The email belonging to the user - used when logging in  |
> | roles     |  required | string   | The role of the user - curretly have Customer and Admin  |
> | forename  |  required | string   | The first name of the user  |
> | surname   |  required | string   | The last name of the user  |

##### Payload example
> ```json
> {
>     "username": "wednesday@addams.com",
>     "email": "wednesday@addams.com",
>     "roles": "Admin",
>     "forename": "Wednesday",
>     "surname": "Addams"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"","results":[{"id":XX,"username":"XXXXX","email":"XXXXX","roles":"XXXXX","forename":"XXXXX","surname":"XXXXX"}]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined username", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for username", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined email", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for email", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined roles", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for roles", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined forename", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for forename", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined surname", "results": [] }` |
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Wrong format for surname", "results": [] }` |
> | `404`         | `application/json`  | `{"status":"404", "success": "false", "message": "No user found matching the specified id", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
>  curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" -d @user_update.json http://localhost:5000/users/54
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"","results":[{"id":54,"username":"wednesday@addams.com","email":"wednesday@addams.com","roles":"Admin","forename":"Wednesday","surname":"Addams"}]}
> ```
</details>

<br>

#### Delete

<details>
 <summary><code>DELETE</code> <code><b>/users/:id/pantry</b></code> <code>Remove all ingredients from a users pantry</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user |

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"The users pantries have been removed successfully","results":[]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users/54/pantry
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"The users pantries have been removed successfully","results":[]}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/users/:id/cookbooks</b></code> <code>Remove all cookbooks from a user</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user |

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"All cookbooks successfully removed for the specifed user","results":[]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users/54/cookbooks
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All cookbooks successfully removed for the specifed user","results":[]}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/users/:id/recipes</b></code> <code>Remove all recipes from a user</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user |

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"All recipes successfully removed for specified user","results":[]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
> curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users/54/recipes
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All recipes successfully removed for specified user","results":[]}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/users/:id</b></code> <code>Remove the specified user</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | None      |  None | N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | id      |  required | number   | The unique identifier of the user |

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
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"The record was deleted successfully","results":[]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "Undefined userId", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
> curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users/54
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"The record was deleted successfully","results":[]}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/users</b></code> <code>Remove all users</code></summary>

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
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload example
> ```json
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`  | `{"status":200,"success":true,"message":"All customer accounts successfully removed","results":[]}`|
> | `400`         | `application/json`  | `{"status":"400", "success": "false", "message": "No customer accounts have been removed", "results": [] }` |
> | `500`         | `application/json`  | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "results": []}` |

##### Example cURL

> ```javascript
> curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozNCwicm9sZXMiOiJBZG1pbiJ9LCJpYXQiOjE2NzY1MzY0NzYsImV4cCI6MTY3NjYyMjg3Nn0.KUkwsk-Ny9-udibEYnD2fRJuf84TSE5Qv8QIMoJGTl8" -b "cookies.txt" http://localhost:5000/users
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"All customer accounts successfully removed","results":[]}
> ```
</details>

<br>