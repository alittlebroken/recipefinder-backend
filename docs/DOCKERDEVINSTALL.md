# Docker installation & configuration

## Assumptions
- You have Docker & Docker Comnpose installed locally
- You have cloned this repo locally

This guide was created on Windows 11 using Windows powershell.

## Pre-Installation

- Edit the docker-compose.yaml file and for the api service change all the environment vars to the correct information
- Now edit the environment vars for the db service to the values you require
- Save and close the file

## Installation

- Run the following command

```bash
docker-compose -d up
```

-d runs the container detached

- Wait a little while and then run

```bash
docker ps
```

- In the list you should see something similar to the following (please note that some items like CONTAINER ID might be different on your system)

```bash
CONTAINER ID   IMAGE                COMMAND                  CREATED             STATUS                       PORTS                    NAMES
40e34adbef4d   node:latest          "docker-entrypoint.s…"   About an hour ago   Up About an hour             0.0.0.0:5000->5000/tcp   recipe-finder-api-1
e67802ffa710   postgres:14-alpine   "docker-entrypoint.s…"   About an hour ago   Up About an hour (healthy)   0.0.0.0:5432->5432/tcp   recipe-finder-db-1
```

- To stop the services just run the following command

```bash
docker-compose down
```

this command needs to be run from the same directory as the docker-compose.yaml file

You may have to wait a few minutes to be able to use the system as the following itesm need to run

1. Postgres Install and Healthcheck
2. Install of NodeJS packages
3. Database Migration and Seeding
4. Then Node is started in dev mode