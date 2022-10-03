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
# Which environment are we running
env ENVIRONMENT test

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
