# recipeFinder API

An api for the recipeFinder application. 

Provides secure API routes for users to manage recipes, ingredients and cookbooks as well as providing facilities to search on recipes by ingredient or by categories. 

## Getting Started

The steps below will allow you to get a local development copy of the recipeFinder up and running.

### Prerequisites

The below is the software used to develop this application and it's highly recommended you have this installed globally to your local machine and working before you start.

* node v14.19.0
* npm v6.14.16
* postgresql 14.1

### Installation

The below steps will get a local copy of the application up and running for you

#### Database

```
$ psql -U <postgres admin user>
 
  >: enter in the password when prompted

$ CREATE DATABASE <dbname>;
$ CREATE USER <username> WITH ENCRYPTED PASSWORD '<password>';
$ GRANT ALL PRIVILEGES ON DATABASE <dbname> TO <username>;
```

Remember to take note of the database name, username and password and insert them into the appropriate database environment variables for the application to use

#### Application

```
$ git clone https://github.com/alittlebroken/recipefinder-backend.git
$ cd recipeFinder-backend
$ npm install
```

##### Configuration

You will need to set the following environment vars for your OS of choice or create a .env file with them in the porjects root directory

The examples below are for use in a .env file and have default values set. 

For security reasons always change any default passwords listed below

```
## GENERAL ##
# Name of our application
APP_NAME=recipeFinder
# Which environment are we currently running in?
ENVIRONMENT=test

## LOGGING ##
LOG_LEVEL=info
LOG_LOCATION=logs
LOG_APP=application.log
LOG_ROTATION=1d
LOG_HTTP_ERROR=http_error.log
LOG_HTTP_ACCESS=http_access.log
LOG_APP_COMMON=application.log

## DATABASE ##
DB_NAME=cookbooks
DB_USER=cookbooks
DB_PASS=cookbooks
DB_HOST=172.17.0.2

## EXPRESS ##
EXPRESS_PORT=5000

## AUTHENTICATION ##
JWT_TOKEN_SECRET=token-secret-that-should-work-ou
JWT_REFRESH_TOKEN_SECRET=refresh-token-secret
SALT_ROUNDS=10
JWT_TOKEN_EXPIRY=5m
JWT_REFRESH_TOKEN_EXPIRY=31d

## SEEDING ##
SEED_PASS=s3cr3t
```

The log files are all stored in the logs folder at the root of the project folder

The following commands will setup the databse for the appication and load some seed data. The commands must be run from the applications root folder

```
$ npm run migrate
$ npm run seed
```

## Usage

A few examples of useful commands and/or tasks.

```
# Start application
$ npm start

# Start application in watch mode
$ npm run startDev

# Run the tests
$ npm test
```

## Deployment

You will find below links to readme files on how to get the application up and running on various other platforms or environments

* [Docker containers](./docs/DOCKERINSTALL.md)
* [Docker Dev Environment](./docs/DOCDKERDEVINSTALL.md)

## Documentation

* [API Routes](./docs/ROUTES.md)