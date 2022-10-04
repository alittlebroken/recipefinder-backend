# Docker installation & configuration

## Assumptions
- You have Docker installed locally
- You have cloned this repo locally

This guide was created on Windows 11 using Windows powershell.

## Installation

### Docker Images

#### Shared network for containers
- Create the shared network with

 ``
 docker network create recipefinder-net
 ``

#### Postgresql database container
- Download the postgres image

 ``
 docker pull postgres
 ``

- Build the database container

 ``
 docker run `
 --name recipefinder-db --network recipefinder-net -e POSTGRES_USER=cookbooks -e POSTGRES_PASSWORD=cookbooks -e POSTGRES_DB=cookbooks -v /data:/var/lib/postgresql/data -p 5432:5432 postgres
 ``

 It is highly recommended that you change the value for POSTGRES_PASSWORD to something other that what this guide uses. If you do this please make a note as you will need this for when the app container is built.

 You can also change the POSTGRES_DB and POSTGRES_USER values but once again you will need to make a note of these as they will need to be changed when the app container is built later on.

- Confirm the instance is running

  ``
  docker ps
  ``

- To stop or start the DB container

  **Start**

  ``
  docker start recipefinder-db
  ``

  **Stop**

  ``
  docker stop recipfinder-db
  ``

#### PGAdmin4 container

- Download the container

 ``
 docker pull dpage/pgadmin4:latest
 ``

- Build the container

 ``
 docker run --name pgadmin-ui --network recipefinder-net -p 82:80 -e 'PGADMIN_DEFAULT_EMAIL=user@domain' -e 'PGADMIN_DEFAULT_PASSWORD=password' -d dpage/pgadmin4
 ``

  Set appropriate values for PGADMIN_DEFAULT_EMAIL and PGADMIN_DEFAULT_PASSWORD

 - Confirm the instance is running

   ``
   docker ps
   ``

 - To stop or start the DB container

   **Start**

   ``
   docker start pgadmin-ui
   ``

   **Stop**

   ``
   docker stop pgadmin-ui
   ``

#### Application container

- Build the image

 ``
 docker build . -t recipefinder/api
 ``

- Build the container

 ``
 docker run --name recipefinder-api -p 45632:3000 -e DB_HOST=recipefinder-db -e DB_PASS=cookbooks -e DB_USER=cookbooks -e DB_NAME=cookbooks -e JWT_TOKEN_SECRET=dev-tokensecret -e JWT_REFRESH_TOKEN_SECRET=dev-refreshtokensecret -e ENVIRONMENT=development --network=recipefinder-net -d recipefinder/api
 ``

 Remember to use the appropriate values from when you set up the postgres container for DB_HOST, DB_USER, DB_PASSWORD and DB_NAME.

 For DB_HOST use the name you supplied to the --name cli option for the postgres container build.

 Always change the values used for JWT_TOKEN_SECRET & JWT_REFRESH_TOKEN_SECRET to appropriate values especially when deploying to production.

 - Confirm the instance is running

   ``
   docker ps
   ``

 - To stop or start the DB container

   **Start**

   ``
   docker start recipefinder-api
   ``

   **Stop**

   ``
   docker stop recipefinder-api
   ``

Please note that until the DB config has been run then the app will encounter will experience errors

## Configuration

### Migrate and populate the DB

- Run the following commands to build the database tables

  ``
  npm run migrate
  ``

- To populate the DB with data run the following command

  ``
  npm run seed
  ``

### Add DB server to PGAdmin4

- Open http://localhost:82 in your web browser
- Login with the username and password you set when building the container
- Right click on Servers, then into Register and click on Server
- Set an appropriate name for the DB
- Click on the connection tab
- Set the hostname/address filed to be the same as the name you gave the postgres db container when you built it
- Set Maintenance database field to the same value you set for DB_NAME earlier
- Set Username to the same value as the one you choose for DB_USER
- Set Password to the same value as the one you gave for DB_PASSWORD
- If you wish toggle on the Save Password option
- Click Save

You should now see the database listed under the servers and the system will automatically connect to it if you saved the password in the steps above.
