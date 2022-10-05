# Deploy Node API Backend to docker
# Version of node to use
FROM node:14.20-alpine3.15

# Create app working directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Copy application source
COPY . .

# Set the port to connect to
EXPOSE 3000

# Set the default environment variables
# Application name
env APP_NAME recipeFinder
# Which environment are we running
env ENVIRONMENT test

# Logging
env LOG_LEVEL info
env LOG_LOCATION logs
env LOG_APP application.log
env LOG_ROTATION 1d
env LOG_HTTP_ERROR http_error.log
env LOG_HTTP_ACCESS http_access.log
env LOG_APP_COMMON application.log

# Database properties
env DB_NAME cookbooks
env DB_USER cookbooks
env DB_PASS FluffyBun135!-65Q
env DB_HOST localhost

## EXPRESS ##
env EXPRESS_PORT 3000

## AUTHENTICATION ##
env JWT_TOKEN_SECRET token-secret
env JWT_REFRESH_TOKEN_SECRET refresh-token-secret
env SALT_ROUNDS 10

# Start the server
CMD [ "node", "index.js" ]
