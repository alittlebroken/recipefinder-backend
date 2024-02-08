# Docker installation & configuration

## Assumptions
- You already have an account on render.com and are logged in
- You have cloned this repo locally

This guide was created on Windows 11 using Windows powershell as well as using the free tier on render.com

## Installation

### Database

#### Postgress DB

- On the main Dashboard click on the button labelled "New PostgreSQL"
- Set a unique name for this DB instance - E.G. postgres-recipes-db
- Set the Database to recipes_db
- Set the User to recipesusr
- Select the closest region to you from the Region list
- Select 14 from the postgreSQL version list
- Select the Free Tier
- Click the button labelled "Create Database"

#### env

- Open the .env file in your favourite editor/IDE
- Set the DB_PASSWORD var to the value from the Password field
- Set the DB_HOST var to the value from the External Database URL field, please note you will need to add ?ssl=true to the end of this line for the remote connection to work
- Set the DB_USER var to the value of the Username field you set earlier
- Set the DB_NAME var to the value from the field Database you set earlier

#### package.json

- Open the package.json file in your favourite editor/IDE
- Look for the line under "scripts" which reads "migrate"
- Add the following to the end of the existing command ( if not already there )

    --env production --debug

- Save and close the file

#### Migrate the DB

- From the root of your project folder run the following

```
   npm run migrate
```

- Wait while the DB is migrated and look for the texct which reads "Batch 1 run: 15 migrations". This indicates a successful migration

### API App

- On the main Dashboard click on the button labelled "New +"
- Select "Build and deploy from a Git Repository" and click "Next"
- Click connect on the entry for recipefinder-backend repo
- Set the Name to be RecipeFinder API
- From Region list select the closest region to you
- Ensure Branch is set to Main
- From the Runtime list select node
- Ensure the Start Command field is set to node start.js
- Select the Free Tier
- Add the following environment variables

| Name | Value | Comments |
| ---- | ----- | -------- |
| APP_URI | http://localhost:5000 | |
| APP_NAME | recipeFinder | |
| ENVIRONMENT | production | |
| LOG_LEVEL | info | |
| LOG_LOCATIONS | logs | |
| LOG_APP | application.log | |
| LOG_ROTATION | 1d | |
| LOG_HTTP_ERROR | http_error.log | |
| LOG_HTTP_ACCESS | http__access.log | |
| LOG_APP_COMMON | application.log | |
| DB_NAME | | | Use the value set when creating the intial postgres DB
| DB_USER | | | Use the value set when creating the intial postgres DB
| DB_PASS | | | Use the value set when creating the intial postgres DB
| DB_HOST | | | Use the value set when creating the intial postgres DB
| EXPRESS_PORT | 5000 | |
| JWT_TOKEN_SECRET | | | Create a unique and random pass for this
| JWT_REFRESH_TOKEN_SECRET | | | Create a unique and random pass for this
| SALT_ROUNDS | 10 | | 
| JWT_TOKEN_EXPIRY | 1d | | 
| JWT_REFRESH_TOKEN_EXPIRY | 31d | | 
| SEED_PASS | | | Create a unique and random pass for this

- Click the button labelled "Create Web Service"
