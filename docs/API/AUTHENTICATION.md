# Authentication

## Unprotected Routes

Any user if they know the proper URL can access these endpoints

#### Register

<details>
 <summary><code>POST</code> <code><b>/auth/register</b></code> <code>Registers a new user for the application</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | No        |  None         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | username  |  required | string                  | The desired username for the person being registered  |
> | email     |  required | string (unique)         | The person to be registered email address  |
> | password  |  required | string                  | The registered users new password, hashed when stored in DB  |
> | forename  |  required | string                  | The registered users firstname  |
> | surname   |  required | string                  | The registered users lastname  |

##### Payload example
> ```json
> {
>    "username": "bobby@testmailer.com",
>    "email": "bobby@testmailer.com",
>    "password": "kdfajs;fhsdjf;sdjf",
>    "forename": "Robert",
>    "surname": "Smythe"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{"status":"200", "success": "true", "message": "Signup successfull", "user": user }`                                |
> | `400`         | `application/json`                | `{"status":"400", "success": "false", "message": "Undefined parameter"}` <br> `{"status":"400", "success": "false", "message": "Wrong format for parameter"}` <br> `{"status":"400", "success": "false", "message": "Unable to register the desired user"}`  |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}`                                                                |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @register.json http://localhost:5000/auth/register
> ```

##### Example Response Package
> ```json
> {"status":200,"message":"Signup successful","success":true,"user":{"id":53,"username":"bobby@testmailer.com","email":"bobby@testmailer.com","roles":"Customer"}}
> ```
</details>

<br>

#### Login

<details>
 <summary><code>POST</code> <code><b>/auth/login</b></code> <code>Logs a user into the application</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | No        |  None         |  N/A  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | username  |  required | string                  | The username to login with  |
> | password  |  required | string                  | The associated password for the specified username |


##### Payload example
> ```json
> {
>    "username": "bobby@testmailer.com",
>    "password": "kdfajs;fhsdjf;sdjf"
> }
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "token": generated_user_access_token }`                                |
> | `400`         | `application/json`                | `{"status":"400", "success": "false", "message": "Undefined parameter"}` <br> `{"status":"400", "success": "false", "message": "Wrong format for parameter"}` <br> `{"status":"400", "success": "false", "message": "Unable to register the desired user"}`  |
> | `404`         | `application/json`         | `{"status":"404", "success": "false", "message": "User not found"}` <br> `{"status":"404", "success": "false", "message": "Missing username or password"}` |
> | `409`         | `application/json`         | `{"status":"409", "success": "false", "message": "Specified password is incorrect"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}`                                                                |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --cookie-jar "cookies.txt" --data @login.json http://localhost:5000/auth/login
> ```

##### Example Response Package
> ```json
> {"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1Mywicm9sZXMiOiJDdXN0b21lciJ9LCJpYXQiOjE2NzU5MzMxMjksImV4cCI6MTY3NjAxOTUyOX0.nrnJlcrWFjyE4vZrNDbPbtDtxMFr-vGTO6pSXryKBb8"}
> ```
</details>

<br>

## Protected Routes

#### Logout

<details>
 <summary><code>POST</code> <code><b>/auth/logout</b></code> <code>Logs the user out of the application</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None        |  Requires the refresh token assigned after you login  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None  |  N/A | N/A                  |   |
> | None  |  N/A | N/A                  |  |


##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "status": "200", "success": "true", "message": "Successfully logged out" }`                                |
> | `404`         | `application/json`         | `{"status":"404", "success": "false", "message": "Missing refresh token"}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later"}`                                                                |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1Mywicm9sZXMiOiJDdXN0b21lciJ9LCJpYXQiOjE2NzU5MzMxMjksImV4cCI6MTY3NjAxOTUyOX0.nrnJlcrWFjyE4vZrNDbPbtDtxMFr-vGTO6pSXryKBb8" -b "cookies.txt" http://localhost:5000/auth/logout
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"message":"Successfully logged out"}
> ```
</details>

<br>

#### Refresh Tokens

<details>
 <summary><code>POST</code> <code><b>/auth/refresh-token</b></code> <code>Priovides a new access token</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  None        |  Requires the refresh token assigned after you login  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None  |  N/A | N/A                  |   |
> | None  |  N/A | N/A                  |  |


##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "status": "200", "success": "true", "message": "New access token created", "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1Mywicm9sZXMiOiJDdXN0b21lciJ9LCJpYXQiOjE2NzU5MzMxMjksImV4cCI6MTY3NjAxOTUyOX0.nrnJlcrWFjyE4vZrNDbPbtDtxMFr-vGTO6pSXryKBb8" }` |
> | `400`         | `application/json`        | `{ "status": "400", "success": "false", "message": "Refresh token not in use, please login", "token": "" }`  |
> | `404`         | `application/json`         | `{"status":"404", "success": "false", "message": "Invalid refresh token, please login", "token": ""}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "token": ""}` |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1Mywicm9sZXMiOiJDdXN0b21lciJ9LCJpYXQiOjE2NzU5MzMxMjksImV4cCI6MTY3NjAxOTUyOX0.nrnJlcrWFjyE4vZrNDbPbtDtxMFr-vGTO6pSXryKBb8" -b "cookies.txt" http://localhost:5000/auth/refresh-token
> ```

##### Example Response Package
> ```json
> {"status":200,"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTMsInJvbGVzIjoiQ3VzdG9tZXIiLCJpYXQiOjE2NzU5MzM2MjksImV4cCI6MTY3NjAyMDAyOX0.LqX1L-o7ugvhbN-yBkOV8OnufEsKli_lZQ7RIdlOqok","message":"New access token created"}
> ```
</details>

<br>

<details>
 <summary><code>DELETE</code> <code><b>/auth/refresh-token</b></code> <code>Removes a refresh token from the DB</code></summary>

##### Security

> | Secured   | Role Required | description             |
> |-----------|---------------|-------------------------|
> | Yes        |  Admin        |  Requires the refresh token assigned after you login  |


##### Parameters

> | name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None      |  required | object (JSON or YAML)   | N/A  |

##### Payload

> | Name      |  type     | data type               | description                                                           |
> |-----------|-----------|-------------------------|-----------------------------------------------------------------------|
> | None  |  N/A | N/A                  |   |
> | None  |  N/A | N/A                  |  |


##### Payload example
> ```json
> 
> ```

##### Responses

> | http code     | content-type                      | response                                                            |
> |---------------|-----------------------------------|---------------------------------------------------------------------|
> | `200`         | `application/json`        | `{ "status": "200", "success": "true", "message": "Successfully logged out", "token": "" }` |
> | `400`         | `application/json`        | `{ "status": "400", "success": "false", "message": "No refresh tokens were found matching supplied data", "token": "" }`  |
> | `404`         | `application/json`         | `{"status":"404", "success": "false", "message": "No refresh token found", "token": ""}` <br> `{"status": "404", "success": "false", "message": "Refresh token not assigned", "token": ""}` |
> | `500`         | `application/json`         | `{"status":"500", "success": "false", "message": "There was a problem with the resource, please try again later", "token": ""}` |

##### Example cURL

> ```javascript
>  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo1Mywicm9sZXMiOiJDdXN0b21lciJ9LCJpYXQiOjE2NzU5NTA1MTksImV4cCI6MTY3NjAzNjkxOX0.CF0cSzxfL2DZzWK6o1B1yEbNHBzTexdfEJ2-ZNw0r24" -b "cookies.txt" http://localhost:5000/auth/refresh-token
> ```

##### Example Response Package
> ```json
> {"status":201,"success":true,"message":"Successfully logged out","token":""}
> ```
</details>

<br>